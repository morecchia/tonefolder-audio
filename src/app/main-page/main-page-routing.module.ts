import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContainerComponent } from './components';
import { AlbumContainerComponent } from '../album/components/album-container/album-container.component';

const routes: Routes = [{
  path : '', component : MainContainerComponent, children: [
    { path: '', component: AlbumContainerComponent },
    {
      path : 'tracks',
      loadChildren: () => import('../track/track.module').then(m => m.TrackModule)
    }
  ]},
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }
