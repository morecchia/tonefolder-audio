import { Album } from "./album";
import { Entity } from "./entity";

export interface Track extends Entity {
  name: string;
  filePath: string;
  order: number;
  album_id: number;
  album: Album;
}

export interface FileListItem {
  file: File,
  name: string;
  size: number;
  modified: string;
  status: string;
}

export const UploadStatus = {
  pending: 'pending',
  inProgress: 'in progress',
  done: 'done'
}