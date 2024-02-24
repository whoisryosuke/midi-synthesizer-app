import React, { useMemo } from "react";
import { NOTE_LETTERS_WITH_BLACK } from "../../utils/constants";
import PianoKey from "./PianoKey";
import PianoTrack from "./PianoTrack";
import { usePianoRollStore } from "../../store/piano-roll";
import { generateKeysByOctave } from "../../utils/music-keyboard";
import PianoRollPlaybackLine from "./PianoRollPlaybackLine";

type Props = {};

const PianoRows = (props: Props) => {
  const { timeGap, notes, addNote, playing, startTime } = usePianoRollStore();
  const pianoNotes = useMemo(() => generateKeysByOctave(true), []);

  const allNotes = Object.values(notes);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <PianoRollPlaybackLine
        playing={playing}
        startTime={startTime}
        timeGap={timeGap}
      />
      {pianoNotes.map((octave) =>
        octave.map((note) => (
          <div style={{ display: "flex" }}>
            <PianoKey note={note} />
            <PianoTrack
              note={note}
              notes={allNotes.filter((noteData) => noteData.note === note)}
              timeGap={timeGap}
              addNote={addNote}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default PianoRows;
