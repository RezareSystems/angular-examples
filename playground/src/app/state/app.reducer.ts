import { appInitialState, State } from './app.state';
import { AppActions, AppActionTypes } from './app.actions';

export function appReducer(state = appInitialState, action: AppActions): State {
  switch (action.type) {
    case AppActionTypes.SetLoading: {
      return {
        ...state,
        loading: action.payload
      };
    }
    default:
      return state;
  }
}
