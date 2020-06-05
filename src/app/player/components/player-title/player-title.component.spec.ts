import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTitleComponent } from './player-title.component';

describe('PlayerTitleComponent', () => {
  let component: PlayerTitleComponent;
  let fixture: ComponentFixture<PlayerTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
