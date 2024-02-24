import React, { useRef } from "react";
import styled from "styled-components";
import { Note } from "../../store/input";
import {
  PianoRollNoteData,
  PianoRollState,
  usePianoRollStore,
} from "../../store/piano-roll";
import PianoRollNote from "./PianoRollNote";

type PianoTrackContainerProps = {
  black: boolean;
};

const PianoTrackContainer = styled("div")<PianoTrackContainerProps>`
  position: relative;
  display: flex;
  flex: 1;

  border-bottom: 1px solid ${({ theme }) => theme.colors.background};

  background: ${({ theme }) => theme.colors.background_level3};

  ${({ black, theme }) =>
    black &&
    `
        background: ${theme.colors.background_level1};
    `}
`;

type Props = {
  note: Note;
  notes: PianoRollNoteData[];
  timeGap: number;
  addNote: PianoRollState["addNote"];
};

const PianoTrack = ({ note, notes, timeGap, addNote }: Props) => {
  const isBlackKey = note.includes("#");

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const trackSize = e.currentTarget.getBoundingClientRect();
    // We subtract x position because the mouse position is
    // relative to screen not the current element. This "zeros" it out.
    const x = e.clientX - trackSize.x;

    // How far user clicked down path
    const percent = x / trackSize.width; // 0 = left, 1 = right

    // We take the physical length and map that to time
    // and we use the "gap" which represents the space 1 second takes up
    const trackTimeLength = trackSize.width / timeGap;
    const clickTime = trackTimeLength * percent;

    console.log(
      "user clicked track",
      x,
      trackSize.width,
      percent,
      trackTimeLength,
      clickTime
    );

    addNote(clickTime, {
      time: clickTime,
      length: 1,
      note: note,
    });
  };

  return (
    <PianoTrackContainer black={isBlackKey} onClick={handleClick}>
      {notes.map((data) => (
        <PianoRollNote note={note} data={data} timeGap={timeGap} />
      ))}
    </PianoTrackContainer>
  );
};

export default PianoTrack;
