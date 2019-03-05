import { Injectable } from '@angular/core';

import { AppStore } from './app.store';

@Injectable()
export class AppService {
  constructor(private appStore: AppStore) {}

  setUserDetails(id: number, name: string, email: string, accessToken: string) {
    return this.appStore.update({
      userDetails: {
        id: id,
        name: name,
        email: email,
        accessToken: accessToken
      }
    });
  }

  unsetUserDetails() {
    return this.appStore.update({
      userDetails: null
    });
  }
}
