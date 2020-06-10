import { Component } from '@angular/core';
import { TrackService } from 'src/app/track/services/track.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  title = 'tonefolder-audio';

  get tracksLoading() { return this.trackService.loading; }

  constructor(private trackService: TrackService) { }
}
