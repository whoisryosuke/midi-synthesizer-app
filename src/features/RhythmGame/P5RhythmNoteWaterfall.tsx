import React, { CSSProperties, useEffect, useRef } from "react";
import p5 from "p5";
import { useAppStore } from "../../store/app";
import { BASE_COLORS } from "../../themes/colors/base";
import { P5Container } from "../../components/p5/P5Container";
import { GameState, RhythmNote } from "./types";
import { useRhythmGameStore } from "../../store/rhythm-game";
import * as Tone from "tone";

type Props = {
  width: CSSProperties["width"];
  height: CSSProperties["height"];
  notes: RhythmNote[];
};

const P5RhythmNoteWaterfall = ({ width, height, ...props }: Props) => {
  const p5ref = useRef<p5 | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);

  const Sketch = (p) => {
    let y = 100;
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(width ?? window.innerWidth, height ?? window.innerHeight);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(30);
    };
    p.draw = () => {
      // console.log('drawing!!')
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      const { playing, paused, startTime, elapsedTime, midiFile } =
        useRhythmGameStore.getState();

      let currentTime = elapsedTime;
      if (playing && !paused) {
        const now = Tone.now();
        currentTime = now - startTime + elapsedTime;
      }

      // Line mesh thing
      p.strokeWeight(2);
      p.stroke(BASE_COLORS[`cyan-4`]);
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
