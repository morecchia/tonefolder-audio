import { Track } from "./track";

export interface SelectedFile {
  track: Track;
  albumTitle: string;
  cover: string;
  order: number;
}