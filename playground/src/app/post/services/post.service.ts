import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ApiService } from '../../core/services/api.service';
import { Post } from '../models/post';

@Injectable()
export class PostService {
  constructor(private apiService: ApiService) {}

  getPosts() {
    return this.apiService.getPosts().pipe(delay(3000)) as Observable<Post[]>;
  }
}
