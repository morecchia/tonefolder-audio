import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PlaylistContainerComponent } from '../../modules/playlist/components/playlist-container/playlist-container.component';

@Injectable({
  providedIn: 'root'
})
export class PlaylistDialogService {
  dialogRef: MatDialogRef<PlaylistContainerComponent>;

  constructor(private dialog: MatDialog) { }

  openPlaylist() {
    this.dialogRef = this.dialog.open(PlaylistContainerComponent, {
      panelClass: 'playlist-modal',
      width: '540px',
      hasBackdrop: false,
      autoFocus: false,
      disableClose: true,
      position: {
        bottom: '68px',
        right: '8px',
      }
    });
  }
}
