import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { PortalModule } from '@angular/cdk/portal'
import { DialogContainerComponent } from './components/dialog-container/dialog-container.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { UploadTableComponent } from './components/upload-table/upload-table.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FileSizePipe } from './pipes/filesize.pipe';

@NgModule({
  declarations: [
    DialogContainerComponent,
    ConfirmComponent,
    UploadTableComponent,
    FilterPipe,
    FileSizePipe,
  ],
  imports: [
    CommonModule,
    PortalModule,
    MaterialModule,
  ],
  exports: [
    DialogContainerComponent,
    ConfirmComponent,
    UploadTableComponent,
    FilterPipe,
    FileSizePipe,
  ]
})
export class SharedModule { }
