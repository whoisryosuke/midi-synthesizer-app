import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { SynthTypes } from "../features/Music/Music";
// import type {} from "@redux-devtools/extension"; // required for devtools typing

interface AppState {
  // UI
  showGamepad: boolean;
  setShowGamepad: (showGamepad: boolean) => void;

  // Sound state
  mute: boolean;
  setMute: (mute: boolean) => void;
  synthType: SynthTypes;
  setSynthType: (synthType: SynthTypes) => void;
}

export const useAppStore = create<AppState>()(
  devtools((set) => ({
    // UI
    showGamepad: true,
    setShowGamepad: (showGamepad) => set((state) => ({ showGamepad })),

    // Sound
    mute: false,
    setMute: (mute) => set((state) => ({ mute })),
    synthType: "poly",
    setSynthType: (synthType) => set((state) => ({ synthType })),
  }))
);
