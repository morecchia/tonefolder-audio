import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LibraryContainerComponent } from './library-container/library-container.component';
import { LibraryRoutingModule } from './library-routing.module';


@NgModule({
  declarations: [LibraryContainerComponent],
  imports: [
    CommonModule,
    LibraryRoutingModule,
  ],
  exports: [RouterModule],
})
export class LibraryModule { }
