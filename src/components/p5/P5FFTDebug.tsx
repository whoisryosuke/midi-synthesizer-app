import React, { useEffect, useRef } from "react";
import p5 from "p5";
import { useAppStore } from "../../store/app";

type Props = {};

const P5FFTDebug = (props: Props) => {
  const p5ref = useRef<p5 | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);

  const Sketch = (p) => {
    let y = 100;
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(30);
    };
    p.draw = () => {
      // console.log('drawing!!')
      p.background(0); // Set the background to black

      const { fft } = useAppStore.getState();
      if (!fft?.current) return;

      const levels = fft.current.getValue();

      for (let i = 0; i < levels.length; i++) {
        p.push();
        p.strokeWeight(10);

        let binMapped = p.map(levels[i], -60, 12, p.height, 50);
        p.stroke(0, 50, binMapped);
        p.line(i * 12, p.height, i * 12, binMapped - 200);
        p.pop();
      }
    };
  };

  useEffect(() => {
    if (divRef.current && p5ref.current == null)
      p5ref.current = new p5(Sketch, divRef.current);
  }, []);

  return <div ref={divRef}></div>;
};

export default P5FFTDebug;
