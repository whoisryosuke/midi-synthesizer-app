import React, { useMemo } from "react";
import { NOTE_LETTERS_WITH_BLACK } from "../../utils/constants";
import PianoKey from "./PianoKey";
import PianoTrack from "./PianoTrack";
import { usePianoRollStore } from "../../store/piano-roll";
import { generateKeysByOctave } from "../../utils/music-keyboard";

type Props = {};

const PianoRows = (props: Props) => {
  const { timeGap, notes, addNote } = usePianoRollStore();
  const pianoNotes = useMemo(() => generateKeysByOctave(true), []);

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {pianoNotes.map((octave) =>
        octave.map((note) => (
          <div style={{ display: "flex" }}>
            <PianoKey note={note} />
            <PianoTrack
              note={note}
              notes={notes[note]}
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
