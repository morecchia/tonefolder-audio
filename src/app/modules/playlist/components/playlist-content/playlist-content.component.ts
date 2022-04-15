import { CdkDragDrop, CdkDragSortEvent, moveItemInArray } from '@angular/cdk/drag-drop';
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
    for (let [i, v] of this.playlistItems.entries()) {
      v.order = i
    }
    this.playlistService.playlistReordered$.next({
      playlist: this.playlistItems,
      id: this.playlistId
    });
  }

  drag() {
    this.playlistService.playlistReordered$.next({
      playlist: this.playlistItems,
      id: null
    });
  }
}
