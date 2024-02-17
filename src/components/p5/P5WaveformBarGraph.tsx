import React, { CSSProperties, useEffect, useRef } from "react";
import p5 from "p5";
import { useAppStore } from "../../store/app";
import { BASE_COLORS } from "../../themes/colors/base";
import { P5Container } from "./P5Container";
import createGridLines from "./shared/createGridLines";

type Props = {
  width: CSSProperties["width"];
  height: CSSProperties["height"];
};

const P5WaveformBarGraph = ({ width, height, ...props }: Props) => {
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

      const { waveform, colorMode } = useAppStore.getState();
      if (!waveform?.current) return;

      const levels = waveform.current.getValue();

      // BG Lines
      createGridLines(p, 15);

      // Setup the gradient using the Canvas ref
      const gradient = p.drawingContext.createLinearGradient(
        p.width / 2,
        0,
        p.width / 2,
        p.height
      );
      gradient.addColorStop(0, p.color(BASE_COLORS[`${colorMode}-4`]));
      gradient.addColorStop(1, p.color(BASE_COLORS["gray-9"]));

      // Apply gradient to the canvas fill
      p.drawingContext.fillStyle = gradient;

      // Line mesh thing
      p.strokeWeight(2);
      p.stroke(BASE_COLORS[`${colorMode}-4`]);
      const GAP = 0;
      const BAR_WIDTH = 5;
      const BAR_SPACE = BAR_WIDTH + GAP;
      const width = Math.min(levels.length, p.width + 10);
      for (let i = 0; i < width; i++) {
        // The top bar
        // We basically draw a rect (the bar)
        // starting from the bottom left corner
        p.beginShape();
        const normalized = p.map(levels[i] * 100, -1, 1, 0, 1);
        const halfwayDownScreen = p.height / 2;
        const startX = i * BAR_SPACE;
        p.vertex(startX, halfwayDownScreen);
        p.vertex(startX, halfwayDownScreen - normalized);
        p.vertex(startX + BAR_SPACE, halfwayDownScreen - normalized);
        p.vertex(startX + BAR_SPACE, halfwayDownScreen);
        p.endShape();

        // The bottom bar
        // Basically same thing but we just invert the waveform value (instead of subtract - we add)
        p.beginShape();
        p.vertex(startX, halfwayDownScreen);
        p.vertex(startX, halfwayDownScreen + normalized); // inverted here
        p.vertex(startX + BAR_SPACE, halfwayDownScreen + normalized); // inverted here
        p.vertex(startX + BAR_SPACE, halfwayDownScreen);
        p.endShape();
      }
    };
  };

  useEffect(() => {
    if (divRef.current && p5ref.current == null)
      p5ref.current = new p5(Sketch, divRef.current);
  }, []);

  return (
    <P5Container title="Waveform" width={width} height={height} {...props}>
      <div ref={divRef}></div>
    </P5Container>
  );
};

export default P5WaveformBarGraph;
