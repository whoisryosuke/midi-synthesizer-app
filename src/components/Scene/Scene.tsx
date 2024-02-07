import React from "react";
import Blocks from "../effects/Blocks/Blocks";
import Canvas from "../Canvas/Canvas";

type Props = {};

const Scene = (props: Props) => {
  return (
    <Canvas>
      <Blocks />
      <ambientLight position={[0, 3, 0]} intensity={1} />
    </Canvas>
  );
};

export default Scene;
