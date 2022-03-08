import { Entity } from "./entity";
import { Track } from "./track";

export interface Album extends Entity {
  artist: string;
  title: string;
  cover: string;
  tracks: Track[];
}


export interface AlbumResponse {
  data: Album[];
  total: number;
  next_page_url: string;
  prev_page_url: string;
  current_page: number;
  last_page: number;
}