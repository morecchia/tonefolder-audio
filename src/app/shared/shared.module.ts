import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { PortalModule } from '@angular/cdk/portal';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DialogContainerComponent } from './components/dialog-container/dialog-container.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { UploadTableComponent } from './components/upload-table/upload-table.component';
import { FileDropperComponent } from './components/file-dropper/file-dropper.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FileSizePipe } from './pipes/filesize.pipe';
import { PlaylistSelectComponent } from './components/playlist-select/playlist-select.component';

@NgModule({
  declarations: [
    DialogContainerComponent,
    ConfirmComponent,
    UploadTableComponent,
    FileDropperComponent,
    FilterPipe,
    FileSizePipe,
    PlaylistSelectComponent,
  ],
  imports: [
    CommonModule,
    PortalModule,
    NgxFileDropModule,
    MaterialModule,
  ],
  exports: [
    DialogContainerComponent,
    ConfirmComponent,
    UploadTableComponent,
    FileDropperComponent,
    FilterPipe,
    FileSizePipe,
  ]
})
export class SharedModule { }
