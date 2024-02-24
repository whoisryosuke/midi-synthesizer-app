import React from "react";
import { ColumnLines, RowLines } from "./GridLines";
import DAWContainer from "./DAWContainer";
import PianoRows from "./PianoRows";
import PianoRollControls from "./PianoRollControls";
import usePianoRollPlayback from "./usePianoRollPlayback";

type Props = {};

const PianoRoll = (props: Props) => {
  usePianoRollPlayback();
  return (
    <div>
      <PianoRollControls />
      <DAWContainer
        style={{
          width: "800px",
          height: "500px",
          position: "relative",
          overflow: "scroll",
          // borderRadius: "16px",
        }}
      >
        {/* <ColumnLines /> */}
        {/* <RowLines /> */}
        <PianoRows />
      </DAWContainer>
    </div>
  );
};

export default PianoRoll;
