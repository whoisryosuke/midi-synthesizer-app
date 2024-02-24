import React from "react";
import styled from "styled-components";
import Text from "../../components/primitives/Text";
import { BaseNote } from "../../store/input";
import {
  PIANO_ROLL_KEY_HEIGHT,
  PIANO_ROLL_KEY_WIDTH,
} from "./piano-roll-constants";

type PianoKeyContainerProps = {
  black: boolean;
};

const PianoKeyContainer = styled("div")<PianoKeyContainerProps>`
  width: ${PIANO_ROLL_KEY_WIDTH}px;
  height: ${PIANO_ROLL_KEY_HEIGHT}px;
  display: flex;
  justify-content: flex-end;
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[1]}`};
  align-items: center;

  background: ${({ theme }) => theme.colors.piano.whiteKey.background};
  box-shadow: ${({ theme }) => theme.colors.piano.whiteKey.boxShadow};
  border-bottom: 2px solid ${({ theme }) => theme.colors.button.border.default};

  ${({ black, theme }) =>
    black &&
    `
        background: ${theme.colors.piano.blackKey.background};
        box-shadow: ${theme.colors.piano.whiteKey.boxShadow};
    `}
`;

const PianoLabel = styled(Text)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.piano.whiteKey.text};
`;

type Props = {
  note: BaseNote;
};

const PianoKey = ({ note }: Props) => {
  const isBlackKey = note.includes("#");
  return (
    <PianoKeyContainer black={isBlackKey}>
      <PianoLabel>{note}</PianoLabel>
    </PianoKeyContainer>
  );
};

export default PianoKey;
