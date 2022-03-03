import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumContainerComponent } from './components/album-container/album-container.component';

const routes: Routes = [
  { path : '', component : AlbumContainerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
