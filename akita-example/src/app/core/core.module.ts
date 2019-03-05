import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ApiService } from './services/api.service';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

@NgModule({
  exports: [NavComponent],
  imports: [HttpClientModule, SharedModule],
  providers: [ApiService],
  declarations: [LoginComponent, NavComponent, HomeComponent, UnauthorizedComponent]
})
export class CoreModule {}
