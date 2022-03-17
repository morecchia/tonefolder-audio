import { Entity } from "./entity";

export interface Track extends Entity {
  name: string;
  filePath: string;
  order: number;
  album_id: number;
}

export interface  TrackUpload {
  name: string;
  status: string;
}

export interface FileListItem {
  name: string;
  size: number;
  modified: string;
}

export const UploadStatus = {
  pending: 'pending',
  inProgress: 'in progress',
  done: 'done'
}