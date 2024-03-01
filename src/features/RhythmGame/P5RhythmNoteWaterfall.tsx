import React, { CSSProperties, useEffect, useRef } from "react";
import p5 from "p5";
import { useAppStore } from "../../store/app";
import { BASE_COLORS } from "../../themes/colors/base";
import { P5Container } from "../../components/p5/P5Container";
import { GameState, RhythmNote } from "./types";
import { useRhythmGameStore } from "../../store/rhythm-game";
import * as Tone from "tone";
import {
  GAMEPLAY_ERROR_MARGIN,
  GAMEPLAY_SCORE_BASE,
  INVISIBLE_GAP,
  WATERFALL_KEY_HEIGHT,
  WATERFALL_TIME_GAP,
  WATERFALL_TOP_PADDING,
} from "./constants";
import { BaseNote, Note, useInputStore } from "../../store/input";
import {
  generateAllKeysByOctaveInOrder,
  generateKeysByOctave,
} from "../../utils/music-keyboard";

// Maps the notes to their corresponding in an octave
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

type PressedNoteState = "pressed" | "failed" | "success";
type PressedNote = {
  state: PressedNoteState;
  time: number; // We keep time to check against other notes with same key+octave
};

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
    let pressedNotes: Record<Note, PressedNote | null> = {
      C1: null,
      C2: null,
      C3: null,
      C4: null,
      C5: null,
      C6: null,
      C7: null,
      D1: null,
      D2: null,
      D3: null,
      D4: null,
      D5: null,
      D6: null,
      D7: null,
      E1: null,
      E2: null,
      E3: null,
      E4: null,
      E5: null,
      E6: null,
      E7: null,
      F1: null,
      F2: null,
      F3: null,
      F4: null,
      F5: null,
      F6: null,
      F7: null,
      G1: null,
      G2: null,
      G3: null,
      G4: null,
      G5: null,
      G6: null,
      G7: null,
      A1: null,
      A2: null,
      A3: null,
      A4: null,
      A5: null,
      A6: null,
      A7: null,
      B1: null,
      B2: null,
      B3: null,
      B4: null,
      B5: null,
      B6: null,
      B7: null,
      "C#1": null,
      "C#2": null,
      "C#3": null,
      "C#4": null,
      "C#5": null,
      "C#6": null,
      "C#7": null,
      "D#1": null,
      "D#2": null,
      "D#3": null,
      "D#4": null,
      "D#5": null,
      "D#6": null,
      "D#7": null,
      "F#1": null,
      "F#2": null,
      "F#3": null,
      "F#4": null,
      "F#5": null,
      "F#6": null,
      "F#7": null,
      "G#1": null,
      "G#2": null,
      "G#3": null,
      "G#4": null,
      "G#5": null,
      "G#6": null,
      "G#7": null,
      "A#1": null,
      "A#2": null,
      "A#3": null,
      "A#4": null,
      "A#5": null,
      "A#6": null,
      "A#7": null,
    };

    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(width ?? window.innerWidth, height ?? window.innerHeight);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(30);
      p.textSize(8);
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
        score,
        setScore,
      } = useRhythmGameStore.getState();

      const { input } = useInputStore.getState();

      if (midiFile && midiFile.tracks.length === 0) return;

      // Game logic
      // Get current time
      let currentTime = elapsedTime;
      // If game is playing and not paused - increment time
      if (playing && !paused) {
        const now = Tone.now();
        currentTime = now - startTime + elapsedTime;
      }
      console.log("current time", currentTime);

      // Get visible notes
      const allNotes = midiFile.tracks[currentTrack].notes;
      const maxTime = currentTime + WATERFALL_TIME_GAP + INVISIBLE_GAP;
      // Filter notes by only visible
      const visibleNotes = allNotes.filter((note) => {
        // Check if note is within region
        const start = note.time;
        const end = note.time + note.duration;

        const isWithin = end >= currentTime - INVISIBLE_GAP; // We add a buffer past canvas
        const isBeforeEnd = start <= maxTime + 3;

        return isWithin && isBeforeEnd;
      });
      // console.log("visibleNotes", visibleNotes);

      // Clear any notes not visible
      Object.keys(pressedNotes).forEach((note) => {
        if (!visibleNotes.find((visibleNote) => visibleNote.note === note)) {
          pressedNotes[note as Note] = null;
        }
      });

      // Check for input
      visibleNotes.forEach((visibleNote) => {
        const currentNote = visibleNote.note as Note;
        // Pressed and not saved? Save it!
        if (input[visibleNote.note] && !pressedNotes[currentNote]) {
          // We want to check if the input falls within the "window" we provide using a margin of error
          // So if the input is a little before, or a little after the intended time it's good
          const isBefore =
            currentTime >= visibleNote.time - GAMEPLAY_ERROR_MARGIN;
          const isAfter =
            currentTime <= visibleNote.time + GAMEPLAY_ERROR_MARGIN;
          if (isBefore && isAfter) {
            pressedNotes[currentNote] = {
              state: "pressed",
              time: visibleNote.time,
            };
          }
        }

        // Did the note pass chance for hitting it?
        if (visibleNote.time + GAMEPLAY_ERROR_MARGIN < currentTime) {
          // and user hasn't pressed? Mark as failed.
          if (!pressedNotes[currentNote]) {
            pressedNotes[currentNote] = {
              state: "failed",
              time: visibleNote.time,
            };
          }
        }
        // Did the note pass completely?
        if (
          visibleNote.time + visibleNote.duration + GAMEPLAY_ERROR_MARGIN <
          currentTime
        ) {
          // was it pressed? nice, give em brownie points
          if (pressedNotes[currentNote]?.state === "pressed") {
            // @ts-ignore you had one job TS
            pressedNotes[currentNote].state = "success";
            setScore(
              score + GAMEPLAY_SCORE_BASE * Math.round(visibleNote.duration)
            );
          }
        }
      });
      // console.log("pressedNotes", pressedNotes, pressedNotes.C2);

      // Game drawing
      // Calculate sizing
      const NUMBER_OF_OCTAVES = 8;
      const NUMBER_OF_NOTE_GROUPS = 7;
      // const noteLaneWidth = p.width / NUMBER_OF_OCTAVES / NUMBER_OF_NOTE_GROUPS;
      const noteHeightBase =
        (p.height - WATERFALL_TOP_PADDING) / WATERFALL_TIME_GAP; // Pixels per second (splits height into second segments)
      const octaveWidth = p.width / NUMBER_OF_NOTE_GROUPS;
      const noteWidth = octaveWidth / NUMBER_OF_NOTE_GROUPS;

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
      p.fill(BASE_COLORS[`gray-6`]);
      lines.forEach((line) => {
        const y = (line - currentTime) * noteHeightBase + WATERFALL_TOP_PADDING;
        p.strokeWeight(2);
        p.line(p.width - 20, p.height - y, p.width, p.height - y);
        p.strokeWeight(0);
        p.text(line, p.width - 20, p.height - y);
      });

      // Draw notes
      p.strokeWeight(2);
      p.stroke(BASE_COLORS[`cyan-4`]);

      visibleNotes.forEach((note) => {
        // Get note letter (C, D, etc)
        const noteType = note.note.slice(0, -1) as BaseNote;
        const octaveIndex = Number(note.note.replace(/\D/g, "")) - 1;
        // Get position
        // Top
        // const topLeftX = (p.width / 7) * PIANO_KEY_POSITION_MAP[noteType];
        const topLeftX =
          octaveWidth * octaveIndex +
          noteWidth * PIANO_KEY_POSITION_MAP[noteType];

        // Calculate the vertical position based off notes time, current time, and the height/scale of window
        const noteTime = note.time - currentTime; // if it's 4 seconds played, and note is at 5 seconds, it looks like 1 second inside gap
        const height = note.duration * noteHeightBase;
        const topLeftY =
          p.height - WATERFALL_TOP_PADDING - noteTime * noteHeightBase - height;

        // Note block
        let fillColor = BASE_COLORS[`gray-8`];
        if (
          pressedNotes[note.note] &&
          note.time === pressedNotes[note.note].time
        ) {
          switch (pressedNotes[note.note].state) {
            case "failed":
              fillColor = BASE_COLORS[`red-8`];
              break;
            case "pressed":
              fillColor = BASE_COLORS[`cyan-6`];
              break;
            case "success":
              fillColor = BASE_COLORS[`green-6`];
              break;
          }
        }
        p.fill(fillColor);
        p.rect(topLeftX, topLeftY, noteWidth, height);

        // Label
        p.text(
          `${note.note} ${Math.round(note.time * 100) / 100}`,
          topLeftX,
          topLeftY + height
        );
      });

      p.strokeWeight(2);
      p.stroke(BASE_COLORS[`gray-4`]);

      // Generate keys
      const pianoKeys = generateKeysByOctave(true);
      // console.log("piano keys", pianoKeys);
      pianoKeys.map((octave, octaveIndex) => {
        octave.map((note, noteIndex) => {
          const isBlackNote = note.includes("#");
          p.fill(isBlackNote ? BASE_COLORS[`gray-8`] : BASE_COLORS[`gray-1`]);
          // Handle "pressed" interaction with input
          if (input[note]) p.fill(BASE_COLORS[`cyan-4`]);
          const noteType = note.slice(0, -1) as BaseNote;
          const x =
            octaveWidth * octaveIndex +
            noteWidth * PIANO_KEY_POSITION_MAP[noteType];
          const y = p.height - WATERFALL_KEY_HEIGHT;
          p.rect(x, y, noteWidth, WATERFALL_KEY_HEIGHT);
          p.fill(BASE_COLORS[`gray-8`]);
          p.text(note, x, y);
        });
      });

      p.line(0, p.height - currentTime, p.width, p.height - currentTime);
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
