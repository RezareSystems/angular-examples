import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PostState, postAdapter } from './post.state';
import { Post } from '../models/post';

export const getPostFeatureSelector = createFeatureSelector<PostState>('post');

export const getAllPostsSelector = postAdapter.getSelectors(
  getPostFeatureSelector
).selectAll;

export const getPostById = (postId: number) =>
  createSelector(
    this.getAllPostsSelector,
    (posts: Post[]) => {
      if (posts) {
        return posts.find(c => c.id === postId);
      } else {
        return null;
      }
    }
  );

export const getPostError = createSelector(
  getPostFeatureSelector,
  (state: PostState) => state.isLoading
);
