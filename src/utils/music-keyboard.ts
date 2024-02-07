import { BaseNote, Note, Octaves } from "../store/input";
import { NOTE_LETTERS, OCTAVES } from "./constants";

export function generateKeysByOctave() {
  const octaves = new Array(OCTAVES).fill(0);
  const notes = octaves.map(
    (_, octave) => NOTE_LETTERS.map((note) => `${note}${octave + 1}`) as Note[]
  );
  return notes;
}

export function generateKeysByOctaveInOrder() {
  const octaves = new Array(OCTAVES).fill(0);
  const notes: Record<BaseNote, Note[]> = {
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
    A: [],
    B: [],
  };
  octaves.forEach((_, octave) =>
    NOTE_LETTERS.map((note) => notes[note].push(`${note}${octave + 1}` as Note))
  );
  return notes;
}

export function generateKeysFlat() {
  const octaves = new Array(OCTAVES).fill(0) as Octaves[];
  let notes: Note[] = [];
  octaves.forEach((_, octave) =>
    NOTE_LETTERS.forEach((note) => notes.push(`${note}${octave + 1}` as Note))
  );
  return notes;
}
