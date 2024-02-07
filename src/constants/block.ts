import { Note } from "../store/input";

// Time in milliseconds
export const DESTROY_TIME = 4200;

export type BlockSpawn = {
  note: Note;
  time: number;
  hash: string;
};
