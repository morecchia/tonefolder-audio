import { Entity } from "./entity";

export interface Track extends Entity {
  name: string;
  filePath: string;
  order: number;
  album_id: number;
}