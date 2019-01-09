import { appInitialState, AppState } from './app.state';
import { AppActions, AppActionTypes } from './app.actions';

export function appReducer(
  state = appInitialState,
  action: AppActions
): AppState {
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
