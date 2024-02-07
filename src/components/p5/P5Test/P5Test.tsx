import React, { useEffect, useRef } from "react";
import p5 from "p5";

type Props = {};

const P5Test = (props: Props) => {
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
      y = y - 1;
      if (y < 0) {
        y = p.height;
      }
      p.line(0, y, p.width, y);
    };
  };

  useEffect(() => {
    if (divRef.current && p5ref.current == null)
      p5ref.current = new p5(Sketch, divRef.current);
  }, []);

  return <div ref={divRef}></div>;
};

export default P5Test;
