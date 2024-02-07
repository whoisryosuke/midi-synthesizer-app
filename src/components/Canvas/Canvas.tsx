import React, { PropsWithChildren } from "react";
import { Canvas as R3FCanvas, CanvasProps } from "@react-three/fiber";
import { OrbitControls, Preload, Stats } from "@react-three/drei";

type Props = CanvasProps & {};

const Canvas = ({ children, ...props }: PropsWithChildren<Props>) => {
  return (
    <R3FCanvas {...props}>
      <Stats />
      {/* <OrbitControls /> */}
      <Preload all />
      {children}
    </R3FCanvas>
  );
};

export default Canvas;
