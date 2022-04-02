import { SelectedFile } from "./selected-file";

export interface Playlist {
  id: number;
  name: string;
  created_at: Date;
  tracks: SelectedFile[]
}