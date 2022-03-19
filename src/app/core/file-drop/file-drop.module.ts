import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { FileDropperComponent } from './components/file-dropper/file-dropper.component';

@NgModule({
  declarations: [
    FileDropperComponent,
  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    MaterialModule,
    PipesModule,
  ],
  exports: [
    FileDropperComponent,
  ],
})
export class FileDropModule { }
