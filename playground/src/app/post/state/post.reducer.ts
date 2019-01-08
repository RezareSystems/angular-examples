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
        isLoading: true,
        error: null
      };
    }
    case PostActionTypes.LoadPostsSuccess: {
      return postAdapter.addAll(action.payload, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case PostActionTypes.LoadPostsFailure: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
}
