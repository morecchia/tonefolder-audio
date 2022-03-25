import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTableComponent } from './upload-table.component';

describe('UploadTableComponent', () => {
  let component: UploadTableComponent;
  let fixture: ComponentFixture<UploadTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
