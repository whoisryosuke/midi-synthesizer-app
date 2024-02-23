import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { BaseNote, Note } from "./input";
// import type {} from "@redux-devtools/extension"; // required for devtools typing

export type PianoRollNoteData = {
  time: number;
  length: number;
};

export interface PianoRollState {
  // Settings
  timeGap: number;

  // Notes
  notes: Record<Note, PianoRollNoteData[] | never[]>;
  addNote: (note: Note, noteData: PianoRollNoteData) => void;
  removeNote: (note: Note, noteIndex: number) => void;
}

export const usePianoRollStore = create<PianoRollState>()(
  devtools((set) => ({
    timeGap: 30,

    notes: {
      "C#": [],
      "D#": [],
      "F#": [],
      "G#": [],
      "A#": [],
      C1: [],
      C2: [],
      C3: [],
      C4: [],
      C5: [],
      C6: [],
      C7: [],
      "C#1": [],
      "C#2": [],
      "C#3": [],
      "C#4": [],
      "C#5": [],
      "C#6": [],
      "C#7": [],
      "C##": [],
      D1: [],
      D2: [],
      D3: [],
      D4: [],
      D5: [],
      D6: [],
      D7: [],
      "D#1": [],
      "D#2": [],
      "D#3": [],
      "D#4": [],
      "D#5": [],
      "D#6": [],
      "D#7": [],
      "D##": [],
      E1: [],
      E2: [],
      E3: [],
      E4: [],
      E5: [],
      E6: [],
      E7: [],
      "E#": [],
      F1: [],
      F2: [],
      F3: [],
      F4: [],
      F5: [],
      F6: [],
      F7: [],
      "F#1": [],
      "F#2": [],
      "F#3": [],
      "F#4": [],
      "F#5": [],
      "F#6": [],
      "F#7": [],
      "F##": [],
      G1: [],
      G2: [],
      G3: [],
      G4: [],
      G5: [],
      G6: [],
      G7: [],
      "G#1": [],
      "G#2": [],
      "G#3": [],
      "G#4": [],
      "G#5": [],
      "G#6": [],
      "G#7": [],
      "G##": [],
      A1: [],
      A2: [],
      A3: [],
      A4: [],
      A5: [],
      A6: [],
      A7: [],
      "A#1": [],
      "A#2": [],
      "A#3": [],
      "A#4": [],
      "A#5": [],
      "A#6": [],
      "A#7": [],
      "A##": [],
      B1: [],
      B2: [],
      B3: [],
      B4: [],
      B5: [],
      B6: [],
      B7: [],
      "B#": [],
    },
    addNote: (note, noteData) =>
      set((state) => ({
        notes: {
          ...state.notes,
          [note]: [...state.notes[note], noteData],
        },
      })),
    removeNote: (note, noteIndex) =>
      set((state) => ({
        notes: {
          ...state.notes,
          [note]: state.notes[note].filter(
            (_: PianoRollNoteData, index) => noteIndex === index
          ),
        },
      })),
  }))
);
