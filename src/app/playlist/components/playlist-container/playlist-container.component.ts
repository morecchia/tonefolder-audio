import { Component } from "@angular/core";
import { PlayerService } from "src/app/player/services/player.service";
import { TrackService } from "src/app/track/services/track.service";
import { PlaylistDialogService } from "../../services/playlist-dialog.service";
import { PlaylistItem, PlaylistService } from "../../services/playlist.service";

@Component({
  selector: "app-playlist-container",
  templateUrl: "./playlist-container.component.html",
  styleUrls: ["./playlist-container.component.scss"],
})
export class PlaylistContainerComponent {
  get playlistItems() {
    return this.playlistService.playlist;
  }
  get currentTrack() {
    return this.player.currentFile?.track;
  }

  constructor(
    private playlistService: PlaylistService,
    private player: PlayerService,
    private trackService: TrackService
  ) {}

  playItem(item: PlaylistItem) {
    this.trackService.selectTrack({album: item.album, track: item.title, cover: item.cover });
  }

  clearPlaylist() {
    this.playlistService.clearPlaylist();
  }
}
