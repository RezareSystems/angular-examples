import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Post } from '../models/post';

export enum PostActionTypes {
  LoadPosts = '[Post] Load Posts',
  LoadPostsSuccess = '[Post] Load Posts Success',
  LoadPostsFailure = '[Post] Load Posts Failure',
  FavouritePost = '[Post] Favourite Post',
  FavouritePostSuccess = '[Post] Favourite Post Success',
  FavouritePostFailure = '[Post] Favourite Post Failure'
}

export class LoadPosts implements Action {
  readonly type = PostActionTypes.LoadPosts;
}

export class LoadPostsSuccess implements Action {
  readonly type = PostActionTypes.LoadPostsSuccess;
  constructor(public payload: Post[]) {}
}

export class LoadPostsFailure implements Action {
  readonly type = PostActionTypes.LoadPostsFailure;
  constructor(public payload: any) {}
}

export class FavouritePost implements Action {
  readonly type = PostActionTypes.FavouritePost;
  constructor(public postId: number) {}
}

export class FavouritePostSuccess implements Action {
  readonly type = PostActionTypes.FavouritePostSuccess;
}

export class FavouritePostFailure implements Action {
  readonly type = PostActionTypes.FavouritePostFailure;
  constructor(public postId: number, public error: any) {}
}

export type PostActions =
  | LoadPosts
  | LoadPostsSuccess
  | LoadPostsFailure
  | FavouritePost
  | FavouritePostSuccess
  | FavouritePostFailure;
