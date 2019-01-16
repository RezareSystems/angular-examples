import { postInitialState, postAdapter } from './post.state';
import {
  getPostFeatureSelector,
  getAllPostsSelector,
  getPostById,
  getPostLoading,
  getPostError
} from './post.selectors';
import { State } from '.';

describe('PostSelectors', () => {
  let overallState: State;
  beforeEach(() => {
    const initialPostState = postInitialState;
    overallState = {
      app: null,
      router: null,
      post: postAdapter.addAll(
        [
          {
            id: 1,
            favourite: true,
            first_name: 'asfd',
            last_name: 'aasd',
            post: 'asdfs',
            title: 'Hello'
          },
          {
            id: 2,
            favourite: false,
            first_name: 'zz',
            last_name: 'vv',
            post: 'rtw',
            title: 'World'
          }
        ],
        { ...initialPostState }
      )
    };
  });

  describe('getPostFeatureSelector', () => {
    it('get something', () => {
      const postFeatureState = getPostFeatureSelector(overallState);
      expect(postFeatureState).not.toBeFalsy();
    });
  });

  describe('getAllPostsSelector', () => {
    it('get two posts', () => {
      const allPosts = getAllPostsSelector(overallState);
      expect(allPosts.length).toBe(2);
    });
  });
  describe('getPostById', () => {
    it('get post with id 2', () => {
      const post = getPostById(2)(overallState);
      expect(post.id).toBe(2);
    });
  });
  describe('getPostLoading', () => {
    it('get loading true', () => {
      overallState = {
        ...overallState,
        post: {
          ...overallState.post,
          loading: true
        }
      };
      const loading = getPostLoading(overallState);
      expect(loading).toBe(true);
    });
  });
  describe('getPostError', () => {
    it('get an error', () => {
      overallState = {
        ...overallState,
        post: {
          ...overallState.post,
          error: 'this is an error'
        }
      };
      const error = getPostError(overallState);
      expect(error).toBe('this is an error');
    });
  });
});
