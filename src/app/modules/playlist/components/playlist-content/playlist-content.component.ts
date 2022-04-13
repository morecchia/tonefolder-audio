import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayerService } from 'src/app/core/services/player.service';
import { PlaylistService } from 'src/app/core/services/playlist.service';
import { SelectedFile } from 'src/app/shared/models/selected-file';

@Component({
  selector: 'app-playlist-content',
  templateUrl: './playlist-content.component.html',
  styleUrls: ['./playlist-content.component.scss']
})
export class PlaylistContentComponent {
  @Input()
  loggedIn: boolean;

  @Input()
  playlistId: number;
  
  @Input()
  playlistItems: SelectedFile[];

  @Output()
  itemPlayed = new EventEmitter<SelectedFile>();
  
  @Input()
  sorting: boolean;
  
  get currentTrackId() {
    return this.player.currentFile?.track.id;
  }

  get playlistOrdered() {
    return this.playlistItems &&
      this.playlistItems.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0));
  }

  constructor(private player: PlayerService, private playlistService: PlaylistService) { }

  drop(event: CdkDragDrop<SelectedFile[]>) {
    moveItemInArray(this.playlistItems, event.previousIndex, event.currentIndex);
    const currentItem = Object.assign({}, this.playlistItems[event.currentIndex], {
      order: event.currentIndex,
    });
    this.playlistItems.splice(event.currentIndex, 1, currentItem);
    this.playlistService.playlist = this.playlistItems;
    this.playlistService.playlistReordered$.next(event.currentIndex);
  }
}
