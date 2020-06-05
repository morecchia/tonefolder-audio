import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerContainerComponent } from './player-container.component';

describe('PlayerContainerComponent', () => {
  let component: PlayerContainerComponent;
  let fixture: ComponentFixture<PlayerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
