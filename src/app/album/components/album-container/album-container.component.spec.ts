import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumContainerComponent } from './album-container.component';

describe('AlbumContainerComponent', () => {
  let component: AlbumContainerComponent;
  let fixture: ComponentFixture<AlbumContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
