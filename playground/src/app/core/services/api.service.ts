import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
  private readonly baseRoute = '/api';

  constructor(private http: HttpClient) {}

  getPosts() {
    const url = this.getRoute('posts');
    return this.http.get(url).pipe(delay(1500));
  }

  getPost(id: number) {
    const url = `${this.getRoute('posts')}/${id}`;
    return this.http.get(url);
  }

  putPost(post: any) {
    const url = `${this.getRoute('posts')}/${post.id}`;
    return this.http.put(url, post);
  }

  private getRoute(route: string) {
    return `${this.baseRoute}/${route}`;
  }
}
