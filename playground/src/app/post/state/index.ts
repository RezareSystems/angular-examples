import * as PostActions from './post.actions';
import * as PostSelectors from './post.selectors';
import * as fromPost from './post.state';
import { OverallState } from '../../app.module';

export { PostActions, PostSelectors };

export interface State extends OverallState {
  post: fromPost.PostState;
}
