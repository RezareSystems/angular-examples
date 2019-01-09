import * as PostActions from './post.actions';
import * as PostSelectors from './post.selectors';
import * as fromPost from './post.state';
import * as fromRoot from '../../state/app.state';

export { PostActions, PostSelectors };

export interface State extends fromRoot.AppState {
  post: fromPost.PostState;
}
