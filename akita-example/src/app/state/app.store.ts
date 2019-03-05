import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface AppState {
  userDetails: {
    id: number;
    name: string;
    email: string;
    accessToken: string;
  };
}

export function createInitialState(): AppState {
  return {
    userDetails: null
  };
}

@Injectable()
@StoreConfig({ name: 'app' })
export class AppStore extends Store<AppState> {
  constructor() {
    super(createInitialState());
  }
}
