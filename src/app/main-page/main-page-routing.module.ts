import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContainerComponent } from './components';
import { TrackContainerComponent } from '../track/components';

const routes: Routes = [
  { path : '', component : MainContainerComponent, children: [
    { path: ':name', component: TrackContainerComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }
