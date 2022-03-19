import { TestBed } from '@angular/core/testing';

import { FileDropService } from './file-drop.service';

describe('FileDropService', () => {
  let service: FileDropService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileDropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
