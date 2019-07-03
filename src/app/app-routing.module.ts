import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
// import { AuthRoutingModule } from './auth/auth-routing.module';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadChildren: './home/home.module#HomePageModule', 
    canActivate: [AuthGuard] 
  },
  {
    path: 'player_detail/:playerId',
    loadChildren: './player/player.module#PlayerPageModule',
    canActivate: [AuthGuard]
  }
  // { path: 'login', loadChildren: './login/login.module#LoginPageModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
