import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlbumContainerComponent } from './album-container.component';

describe('AlbumContainerComponent', () => {
  let component: AlbumContainerComponent;
  let fixture: ComponentFixture<AlbumContainerComponent>;

  beforeEach(waitForAsync(() => {
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
