import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LibraryContainerComponent } from './library-container.component';

describe('LibraryContainerComponent', () => {
  let component: LibraryContainerComponent;
  let fixture: ComponentFixture<LibraryContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
