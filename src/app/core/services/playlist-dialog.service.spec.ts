import { TestBed } from '@angular/core/testing';

import { PlaylistDialogService } from './playlist-dialog.service';

describe('PlaylistDialogService', () => {
  let service: PlaylistDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
