import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TrackContainerComponent } from './track-container.component';

describe('TrackContainerComponent', () => {
  let component: TrackContainerComponent;
  let fixture: ComponentFixture<TrackContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
