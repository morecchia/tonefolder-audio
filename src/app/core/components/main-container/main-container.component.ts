import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { PlayerService } from 'src/app/core/services/player.service';
import { AlbumService } from 'src/app/core/services/album.service';
import { FocusService } from '../../services/focus.service';
import { PlaylistService } from '../../services/playlist.service';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnDestroy {
  title = 'tonefolder audio';
  currentRoute: string;
  inputFocused: boolean;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code === 'Space' && !this.inputFocused && this.fileSelected) {
      event.preventDefault();
      this.togglePlay();
    }
  }

  private _destroy = new Subject();

  get fileSelected() { return this.playerService.selectedFile; }
  get isLoggedIn$() { return this.auth.isAuthenticated$; }

  constructor(
    private router: Router,
    private auth: AuthService,
    private playerService: PlayerService,
    private playlistService: PlaylistService,
    private albumService: AlbumService,
    private focusService: FocusService,
  ) {
    this.router.events
      .pipe(
        takeUntil(this._destroy),
        filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      });
    this.focusService.focusChange$
      .pipe(takeUntil(this._destroy))
      .subscribe((focused: boolean) => {
        this.inputFocused = focused;
      });
    this.playlistService.initPlaylist()
      .pipe(
        switchMap(() => this.playlistService.getPlaylists()),
        takeUntil(this._destroy)
      ).subscribe(() => {
        this.playerService.initPlayer();
      });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
  
  onScroll() {
    if (this.albumService.nextPageUrl) {
      this.albumService.albumsScrolled$.next(this.albumService.currentPage + 1);
    }
  }

  private togglePlay() {
    if (this.playerService.audioState.playing) {
      this.playerService.pause();
    } else {
      this.playerService.play();
    }
  }
}
