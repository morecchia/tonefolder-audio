import { Component, Input } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { PlaylistService } from 'src/app/core/services/playlist.service';
import { SelectedFile } from '../../models/selected-file';

@Component({
  selector: 'app-playlist-select',
  templateUrl: './playlist-select.component.html',
  styleUrls: ['./playlist-select.component.scss']
})
export class PlaylistSelectComponent {
  selectedId: number;
  
  get playlists() { return this.playlistService.playlists; }

  constructor(private playlistService: PlaylistService) {
    this.selectedId = this.playlistService.selectedPlaylistId;
  }

  selectPlaylist(change: MatSelectChange) {
    this.selectedId = change.value;
  }
}
