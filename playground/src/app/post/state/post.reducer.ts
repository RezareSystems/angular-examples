import { Update } from '@ngrx/entity';

import { postInitialState, PostState, postAdapter } from './post.state';
import { PostActions, PostActionTypes } from './post.actions';
import { Post } from '../models/post';

export function postReducer(
  state = postInitialState,
  action: PostActions
): PostState {
  switch (action.type) {
    case PostActionTypes.LoadPosts: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case PostActionTypes.LoadPostsSuccess: {
      return postAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        error: null
      });
    }
    case PostActionTypes.LoadPostsFailure: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case PostActionTypes.FavouritePost: {
      const post = postAdapter
        .getSelectors()
        .selectAll(state)
        .find(p => p.id === action.postId);
      const postUpdate: Update<Post> = {
        id: post.id,
        changes: {
          favourite: !post.favourite
        }
      };
      return postAdapter.updateOne(postUpdate, {
        ...state
      });
    }
    case PostActionTypes.FavouritePostFailure: {
      const post = postAdapter
        .getSelectors()
        .selectAll(state)
        .find(p => p.id === action.postId);
      const postRollbackUpdate: Update<Post> = {
        id: post.id,
        changes: {
          favourite: !post.favourite
        }
      };
      return postAdapter.updateOne(postRollbackUpdate, {
        ...state,
        error: action.error
      });
    }
    default:
      return state;
  }
}
