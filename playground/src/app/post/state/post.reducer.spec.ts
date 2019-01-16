import { postInitialState, PostState, postAdapter } from './post.state';
import { postReducer } from './post.reducer';
import {
  LoadPosts,
  LoadPostsFailure,
  LoadPostsSuccess,
  PostActions,
  FavouritePost,
  FavouritePostFailure
} from './post.actions';
import { Dictionary } from '@ngrx/entity';

describe('PostReducer', () => {
  describe('LoadPosts Action', () => {
    it('should have loading to true ', () => {
      const initalState = postInitialState;
      const action = new LoadPosts();
      const state = postReducer(undefined, action);
      expect(state).toMatchObject({
        loading: true,
        error: null
      });
    });
  });

  describe('LoadPostsFailure Action', () => {
    it('should have error set and loading back to false', () => {
      const initialState = postInitialState;
      const previousState = { ...initialState, loading: true };
      const action = new LoadPostsFailure('this is an error');
      const state = postReducer(previousState, action);
      expect(state).toMatchObject({
        loading: false,
        error: 'this is an error'
      });
    });
  });

  describe('LoadPostsSuccess Action', () => {
    let previousState: PostState;
    let action: PostActions;

    beforeEach(() => {
      const initialState = postInitialState;
      previousState = { ...initialState, loading: true };
      action = new LoadPostsSuccess([
        {
          id: 1,
          title: 'test',
          last_name: '',
          favourite: false,
          first_name: '',
          post: ''
        }
      ]);
    });

    it('should have no error set and loading back to false', () => {
      const state = postReducer(previousState, action);
      expect(state).toMatchObject({
        loading: false,
        error: null
      });
    });

    it('should have loaded the post entities into the entity state', () => {
      const state = postReducer(previousState, action);
      expect(state.entities['1']).not.toBeUndefined();
    });
  });

  describe('FavouritePost Action', () => {
    it('should be setting the post as favourite true', () => {
      const initialState = postInitialState;
      const previousState = postAdapter.addAll(
        [
          {
            id: 1,
            title: 'test',
            favourite: false,
            first_name: 'hello',
            last_name: 'world',
            post: 'sdafa'
          }
        ],
        { ...initialState }
      );
      const action = new FavouritePost(1);
      const state = postReducer(previousState, action);
      expect(state.entities['1'].favourite).toBe(true);
    });
  });

  describe('FavouritePostFailure Action', () => {
    it('should rollback the favourite true to false', () => {
      const initialState = postInitialState;
      const previousState = postAdapter.addAll(
        [
          {
            id: 1,
            title: 'test',
            favourite: true,
            first_name: 'hello',
            last_name: 'world',
            post: 'sdafa'
          }
        ],
        { ...initialState }
      );
      const action = new FavouritePostFailure(1, 'this is an error');
      const state = postReducer(previousState, action);
      expect(state.entities['1'].favourite).toBe(false);
    });
  });
});
