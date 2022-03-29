import { SelectedFile } from "src/app/core/services/track.service";
import { PlayContext } from "./play-context";

export interface PlayerState {
  currentAlbum: SelectedFile[];
  playContext: PlayContext;
}