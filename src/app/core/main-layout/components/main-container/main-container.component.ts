import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { PlayerService } from 'src/app/shared//services/player.service';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnDestroy {
  title = 'tonefolder audio';

  get fileSelected() { return this.playerService.selectedFile; }
  get isLoggedIn$() { return this.auth.isAuthenticated$; }
  get isAdminPage() { return this._currentRoute === '/admin'; }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code === 'Space' && this.fileSelected && !this.isAdminPage) {
      event.preventDefault();
      this.togglePlay();
    }
  }

  private _currentRoute: string;
  private _destroy = new Subject();

  constructor(private router: Router, private auth: AuthService, private playerService: PlayerService) {
    this.router.events
      .pipe(
        takeUntil(this._destroy),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: any) => {
        this._currentRoute = event.url;
      });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  private togglePlay() {
    if (this.playerService.state.playing) {
      this.playerService.pause();
    } else {
      this.playerService.play();
    }
  }
}
