import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../core/services/api.service';
import { Post } from '../models/post';

@Injectable()
export class PostService {
  constructor(private apiService: ApiService) {}

  getPosts() {
    return this.apiService.getPosts() as Observable<Post[]>;
  }
}
