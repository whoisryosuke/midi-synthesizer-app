import React from "react";
import styled from "styled-components";
import Text from "../../components/primitives/Text";
import { Note } from "../../store/input";
import { PianoRollNoteData } from "../../store/piano-roll";

type PianoRollNoteContainerProps = {
  length: PianoRollNoteData["length"];
  time: PianoRollNoteData["time"];
  timeGap: number;
};

const PianoRollNoteContainer = styled("div")<PianoRollNoteContainerProps>`
  width: ${({ length }) => length * 80}px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[1]}`};
  left: ${({ timeGap, time }) => `${time * timeGap}px`};

  position: absolute;

  background: ${({ theme }) => theme.gradients.pianoNote.default};
  border: 1.5px solid ${({ theme }) => theme.colors.button.border.default.color};
  box-shadow: ${({ theme }) => theme.shadows.pianoRollNote};
  border-radius: ${({ theme }) => theme.space[2]};
`;

const NoteLabel = styled(Text)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.piano.note.text};
  margin: 0;
`;

type Props = {
  note: Note;
  data: PianoRollNoteData;
  timeGap: number;
};

const PianoRollNote = ({ note, data, timeGap }: Props) => {
  return (
    <PianoRollNoteContainer {...data} timeGap={timeGap}>
      <NoteLabel>{note}</NoteLabel>
    </PianoRollNoteContainer>
  );
};

export default PianoRollNote;
