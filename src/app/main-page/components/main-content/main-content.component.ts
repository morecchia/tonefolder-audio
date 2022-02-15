import { Component } from '@angular/core';
import { TrackService } from 'src/app/track/services/track.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent {
  get tracksLoading() { return this.trackService.loading; }

  constructor(private trackService: TrackService) { }
}
