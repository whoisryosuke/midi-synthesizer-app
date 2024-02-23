import React from "react";
import { ColumnLines, RowLines } from "./GridLines";
import DAWContainer from "./DAWContainer";
import PianoRows from "./PianoRows";

type Props = {};

const PianoRoll = (props: Props) => {
  return (
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
  );
};

export default PianoRoll;
