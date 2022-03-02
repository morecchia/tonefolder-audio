import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path : 'albums',
    loadChildren: () => import('./album/album.module').then(m => m.AlbumModule)
  },
  {
    path : 'tracks/:id',
    loadChildren: () => import('./track/track.module').then(m => m.TrackModule)
  },
  {
    path : 'library',
    loadChildren: () => import('./library/library.module').then(m => m.LibraryModule)
  },
  {
    path: '',
    redirectTo: '/albums',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
