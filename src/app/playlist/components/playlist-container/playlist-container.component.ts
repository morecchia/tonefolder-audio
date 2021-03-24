import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';

@Component({
  selector: 'app-playlist-container',
  templateUrl: './playlist-container.component.html',
  styleUrls: ['./playlist-container.component.scss']
})
export class PlaylistContainerComponent implements OnInit {
  get playlistItems() { return this.playlistService.playlist; }

  constructor(private playlistService: PlaylistService) { }

  ngOnInit(): void {
  }
}
