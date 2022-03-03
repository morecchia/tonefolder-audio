import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackContainerComponent } from './components';

const routes: Routes = [
  { path: '', component: TrackContainerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackRoutingModule { }
