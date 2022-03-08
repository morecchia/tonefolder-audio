import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { PlayerService } from 'src/app/shared//services/player.service';
import { AlbumService } from 'src/app/shared//services/album.service';

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
    if (event.code === 'Space' && this.fileSelected && !this.inputFocused) {
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
    private albumService: AlbumService) {
    this.router.events
      .pipe(
        takeUntil(this._destroy),
        filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      });
    this.albumService.focusChange$
      .pipe(takeUntil(this._destroy))
      .subscribe((focused: boolean) => {
        this.inputFocused = focused;
      });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
  
  onScroll() {
    if (this.albumService.nextPageUrl) {
      this.albumService.albumsScrolled$.next();
    }
  }

  private togglePlay() {
    if (this.playerService.state.playing) {
      this.playerService.pause();
    } else {
      this.playerService.play();
    }
  }
}
