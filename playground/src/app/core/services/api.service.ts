import { Injectable } from '@angular/core';

import { CoreModule } from '../core.module';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
  private readonly baseRoute = '/api';

  constructor(private http: HttpClient) {}

  getPosts() {
    const url = this.getRoute('posts');
    return this.http.get(url);
  }

  getPost(id: number) {
    const url = `${this.getRoute('posts')}/${id}`;
    return this.http.get(url);
  }

  private getRoute(route: string) {
    return `${this.baseRoute}/${route}`;
  }
}
