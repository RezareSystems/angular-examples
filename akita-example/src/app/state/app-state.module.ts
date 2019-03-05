import { NgModule } from '@angular/core';

import { AppQuery } from './app.query';
import { AppService } from './app.service';
import { AppStore } from './app.store';

@NgModule({
  providers: [AppQuery, AppService, AppStore]
})
export class AppStateModule {}
