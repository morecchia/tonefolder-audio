import { Entity } from "./entity";

export interface Track extends Entity {
  name: string;
  filePath: string;
  order: number;
  album_id: number;
}

export interface UploadStatus {
  name: string;
  status: string;
}

export interface FileListItem {
  name: string;
  size: number;
  modified: string;
}