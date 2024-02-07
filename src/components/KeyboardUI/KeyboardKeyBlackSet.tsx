import React from "react";
import KeyboardKeyBlack from "./KeyboardKeyBlack";
import {
  KEYBOARD_BLACK_KEY_WIDTH,
  KEYBOARD_WHITE_KEY_WIDTH,
} from "../../utils/constants";
import { Note } from "../../store/input";

// The black keys go "in between" keys,
// so we do the width and subtract the width of the black key
// @see: https://whoisryosuke.com/blog/2023/3d-midi-piano-using-rust-and-bevy
const generateOffset = (index: number) =>
  KEYBOARD_WHITE_KEY_WIDTH * index - KEYBOARD_BLACK_KEY_WIDTH / 2;

type BlackKeyPosition = {
  label: Note;
  offset: number;
};
const BLACK_KEY_POSITIONS: BlackKeyPosition[] = [
  {
    label: "C#",
    offset: generateOffset(1),
  },
  {
    label: "D#",
    offset: generateOffset(2),
  },
  {
    label: "F#",
    offset: generateOffset(4),
  },
  {
    label: "G#",
    offset: generateOffset(5),
  },
  {
    label: "A#",
    offset: generateOffset(6),
  },
];

type Props = {};

const KeyboardKeyBlackSet = (props: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
      }}
    >
      {BLACK_KEY_POSITIONS.map((blackKey) => (
        <KeyboardKeyBlack
          label={blackKey.label}
          style={{ left: blackKey.offset }}
        />
      ))}
    </div>
  );
};

export default KeyboardKeyBlackSet;
