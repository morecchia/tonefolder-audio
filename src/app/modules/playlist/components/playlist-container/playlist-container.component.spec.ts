import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlaylistContainerComponent } from './playlist-container.component';

describe('PlaylistContainerComponent', () => {
  let component: PlaylistContainerComponent;
  let fixture: ComponentFixture<PlaylistContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
