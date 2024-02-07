import React from "react";
import Stack from "../Stack/Stack";
import KeyboardKeyWhite from "./KeyboardKeyWhite";
import { generateKeysByOctaveInOrder } from "../../utils/music-keyboard";
import KeyboardKeyBlackSet from "./KeyboardKeyBlackSet";

type Props = {};

const KeyboardUI = (props: Props) => {
  const keys = generateKeysByOctaveInOrder();
  const baseNotes = Object.keys(keys);
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        zIndex: 420,
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex" }}>
        {baseNotes.map((baseNote) => {
          return (
            <div style={{ position: "relative" }}>
              <KeyboardKeyBlackSet />
              <div style={{ display: "flex" }}>
                {keys[baseNote].map((note) => (
                  <KeyboardKeyWhite key={note} label={note} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KeyboardUI;
