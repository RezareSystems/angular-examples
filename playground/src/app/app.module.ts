import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import {
  StoreRouterConnectingModule,
  routerReducer,
  RouterReducerState
} from '@ngrx/router-store';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { appReducer } from './state/app.reducer';
import { SharedModule } from './shared/shared.module';
import * as fromApp from './state';

export interface OverallState {
  app: fromApp.State;
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<OverallState> = {
  app: appReducer,
  router: routerReducer
};

export const metaReducers: MetaReducer<OverallState>[] = !environment.production
  ? [storeFreeze]
  : [];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'Playground Application Store DevTools',
      maxAge: 25,
      logOnly: environment.production
    }),
    StoreRouterConnectingModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
