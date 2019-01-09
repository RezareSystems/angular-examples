import { postInitialState, PostState, postAdapter } from './post.state';
import { PostActions, PostActionTypes } from './post.actions';

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
    default:
      return state;
  }
}
