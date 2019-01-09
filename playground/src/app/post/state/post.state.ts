import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { Post } from '../models/post';

export const postAdapter: EntityAdapter<Post> = createEntityAdapter<Post>({
  selectId: post => post.id
});

export interface PostState extends EntityState<Post> {
  loading: boolean;
  error?: any;
}

export const postInitialState: PostState = postAdapter.getInitialState({
  loading: false,
  error: null
});
