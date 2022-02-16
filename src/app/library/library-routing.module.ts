import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibraryContainerComponent } from './library-container/library-container.component';

const routes: Routes = [
  { path : '', component : LibraryContainerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
