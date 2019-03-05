import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './core/login/login.component';
import { HomeComponent } from './core/home/home.component';
import { UnauthorizedComponent } from './core/unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'home', component: HomeComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
