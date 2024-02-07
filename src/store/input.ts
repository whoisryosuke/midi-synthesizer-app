import { create } from "zustand";

export type BaseNote = "C" | "D" | "E" | "F" | "G" | "A" | "B";
export type Octaves = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "#";
export type Note = `${BaseNote}${Octaves}`;

export type UserInputMap = Record<Note, boolean>;

const DEFAULT_USER_MAP: UserInputMap = {
  C1: false,
  C2: false,
  C3: false,
  C4: false,
  C5: false,
  C6: false,
  C7: false,
  D1: false,
  D2: false,
  D3: false,
  D4: false,
  D5: false,
  D6: false,
  D7: false,
  E1: false,
  E2: false,
  E3: false,
  E4: false,
  E5: false,
  E6: false,
  E7: false,
  F1: false,
  F2: false,
  F3: false,
  F4: false,
  F5: false,
  F6: false,
  F7: false,
  G1: false,
  G2: false,
  G3: false,
  G4: false,
  G5: false,
  G6: false,
  G7: false,
  A1: false,
  A2: false,
  A3: false,
  A4: false,
  A5: false,
  A6: false,
  A7: false,
  B1: false,
  B2: false,
  B3: false,
  B4: false,
  B5: false,
  B6: false,
  B7: false,
};

export type UserInputKeys = keyof UserInputMap;

interface InputState {
  input: UserInputMap;
  setInput: (key: UserInputKeys, input: boolean) => void;
}

export const useInputStore = create<InputState>()((set) => ({
  input: DEFAULT_USER_MAP,
  setInput: (key, input) =>
    set((state) => ({ input: { ...state.input, [key]: input } })),
}));
