import { Query } from '@datorama/akita';
import { Injectable } from '@angular/core';

import { AppState, AppStore } from './app.store';
import { map } from 'rxjs/operators';

@Injectable()
export class AppQuery extends Query<AppState> {
  constructor(protected store: AppStore) {
    super(store);
  }

  isAuthenticated$ = this.select(appState => appState.userDetails != null);

  userDetails$ = this.select(appState => appState.userDetails);

  get accessToken(): string {
    const stateCurrent = this.getValue();
    if (stateCurrent && stateCurrent.userDetails) {
      return stateCurrent.userDetails.accessToken;
    }
    return null;
  }
}
