import { Component, HostListener, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AudioService } from 'src/app/shared/services/audio.service';
import { PlayerService } from 'src/app/shared//services/player.service';
import { TrackService } from 'src/app/shared/services/track.service';
import { AlbumService } from 'src/app/shared/services/album.service';
import { PlaylistService } from 'src/app/shared/services/playlist.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnDestroy {
  title = 'tonefolder audio';

  get fileSelected() { return this.playerService.selectedFile; }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 32 && this.fileSelected) {
      event.preventDefault();
      this.togglePlay();
    }
  }

  private _destroy = new Subject();

  constructor(
    private trackService: TrackService,
    private albumService: AlbumService,
    private audioService: AudioService,
    private playerService: PlayerService,
    private playlistService: PlaylistService,
    private snackBar: MatSnackBar) {
    this.audioService.error$
      .pipe(takeUntil(this._destroy))
      .subscribe(err => err && this.showToast('Could not play track', 'error-state'));
    this.trackService.loadingError$
      .pipe(takeUntil(this._destroy))
      .subscribe(() => this.showToast('Could not load tracks', 'error-state'));
    this.albumService.loadingError$
      .pipe(takeUntil(this._destroy))
      .subscribe(() => this.showToast('Could not load albums', 'error-state'));
    this.playlistService.playlistUpdated$
      .pipe(takeUntil(this._destroy))
      .subscribe(title => {
        if (title) {
          this.showToast(`${title} added to playlist!`);
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  showToast(message: string, state?: string) {
    const options: MatSnackBarConfig = state ? { panelClass: state, duration: 2000 } : { duration: 2000 };
    this.snackBar.open(message, 'Ok', options);
  }

  private togglePlay() {
    if (this.playerService.state.playing) {
      this.playerService.pause();
    } else {
      this.playerService.play();
    }
  }
}
