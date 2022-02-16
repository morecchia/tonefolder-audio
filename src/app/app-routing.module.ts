import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path : 'albums',
    loadChildren: () => import('./album/album.module').then(m => m.AlbumModule)
  },
  {
    path : 'tracks/:name',
    loadChildren: () => import('./track/track.module').then(m => m.TrackModule)
  },
  {
    path : 'library',
    loadChildren: () => import('./library/library.module').then(m => m.LibraryModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
