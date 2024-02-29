import React, { CSSProperties, useEffect, useRef } from "react";
import p5 from "p5";
import { useAppStore } from "../../store/app";
import { BASE_COLORS } from "../../themes/colors/base";
import { P5Container } from "../../components/p5/P5Container";
import { GameState, RhythmNote } from "./types";
import { useRhythmGameStore } from "../../store/rhythm-game";
import * as Tone from "tone";
import { WATERFALL_TIME_GAP } from "./constants";
import { BaseNote } from "../../store/input";

const PIANO_KEY_POSITION_MAP: Record<BaseNote, number> = {
  C: 0,
  D: 1,
  E: 2,
  F: 3,
  G: 4,
  A: 5,
  B: 6,
  "C#": 0.5,
  "D#": 1.5,
  "F#": 3.5,
  "G#": 4.5,
  "A#": 5.5,
};

type Lines = number[];

type Props = {
  width: CSSProperties["width"];
  height: CSSProperties["height"];
  notes: RhythmNote[];
};

const P5RhythmNoteWaterfall = ({ width, height, ...props }: Props) => {
  const p5ref = useRef<p5 | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);

  const Sketch = (p) => {
    let lines: Lines = [];

    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(width ?? window.innerWidth, height ?? window.innerHeight);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(30);
    };
    p.draw = () => {
      // console.log('drawing!!')
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      const {
        playing,
        paused,
        startTime,
        elapsedTime,
        currentTrack,
        midiFile,
      } = useRhythmGameStore.getState();

      if (midiFile && midiFile.tracks.length === 0) return;

      // Get current time
      let currentTime = elapsedTime;
      // If game is playing and not paused - increment time
      if (playing && !paused) {
        const now = Tone.now();
        currentTime = now - startTime + elapsedTime;
      }

      console.log("current time", currentTime);

      // Calculate sizing
      const NUMBER_OF_OCTAVES = 8;
      const NUMBER_OF_NOTE_GROUPS = 7;
      const noteLaneWidth = p.width / NUMBER_OF_OCTAVES / NUMBER_OF_NOTE_GROUPS;
      const noteHeightBase = p.height / WATERFALL_TIME_GAP; // Pixels per second (splits height into second segments)

      p.strokeWeight(2);
      p.stroke(BASE_COLORS[`gray-7`]);

      // Delete old lines
      lines = lines.filter((line) => line < currentTime);

      // Create new lines as needed
      const numLines = Math.floor(currentTime);
      for (
        let index = numLines;
        index < numLines + WATERFALL_TIME_GAP + 2;
        index++
      ) {
        if (!lines.find((line) => line == index)) {
          lines.push(index);
        }
      }

      // Draw lines
      lines.forEach((line) => {
        const y = (line - currentTime) * noteHeightBase;
        p.line(p.width - 20, y, p.width, y);
        p.text(line, p.width - 20, y);
      });

      // Grab the notes and display them
      const allNotes = midiFile.tracks[currentTrack].notes;
      const maxTime = currentTime + WATERFALL_TIME_GAP;
      // Filter notes by only visible
      const visibleNotes = allNotes.filter((note) => {
        // Check if note is within region
        const start = note.time;
        // const end = note.time + note.duration;

        const isWithin = start >= currentTime;
        const isBeforeEnd = start <= maxTime;

        return isWithin && isBeforeEnd;
      });

      // console.log("visibleNotes", visibleNotes);

      // Line mesh thing
      p.strokeWeight(2);
      p.stroke(BASE_COLORS[`cyan-4`]);

      visibleNotes.forEach((note) => {
        // Get note letter (C, D, etc)
        const noteType = note.note.slice(0, -1) as BaseNote;
        // Get position
        // Top
        const topLeftX = (p.width / 7) * PIANO_KEY_POSITION_MAP[noteType];
        // Calculate the vertical position based off notes time, current time, and the height/scale of window
        const noteTime = note.time - currentTime; // if it's 4 seconds played, and note is at 5 seconds, it looks like 1 second inside gap
        const topLeftY = noteTime * noteHeightBase;

        const topRightX = topLeftX + noteLaneWidth;

        // Bottom
        const bottomY = topLeftY - note.duration * noteHeightBase;

        // Note block
        p.beginShape();
        p.vertex(topLeftX, topLeftY);
        p.vertex(topRightX, topLeftY);
        p.vertex(topRightX, bottomY);
        p.vertex(topLeftX, bottomY);
        p.endShape();

        // Label
        p.text(note.note, topLeftX, topLeftY);
      });

      p.line(0, currentTime * 10, p.width, currentTime * 10);
    };
  };

  useEffect(() => {
    if (divRef.current && p5ref.current == null)
      p5ref.current = new p5(Sketch, divRef.current);
  }, []);

  return (
    <P5Container title="FFT" width={width} height={height} {...props}>
      <div ref={divRef}></div>
    </P5Container>
  );
};

export default P5RhythmNoteWaterfall;
