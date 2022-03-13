import { NgModule } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { FileSizePipe } from './filesize.pipe';

@NgModule({
  declarations: [FilterPipe, FileSizePipe],
  imports: [],
  exports: [FilterPipe, FileSizePipe]
})
export class PipesModule { }
