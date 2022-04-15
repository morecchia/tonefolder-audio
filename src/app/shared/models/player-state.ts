import { SelectedFile } from "./selected-file";
import { PlayContext } from "./play-context";

export interface PlayerState {
  currentAlbum: SelectedFile[];
  playContext: PlayContext;
}