import { Action } from '@ngrx/store';

export enum AppActionTypes {
  SetLoading = '[App] Set Loading'
}

export class SetLoading implements Action {
  readonly type = AppActionTypes.SetLoading;
  constructor(public payload: boolean) {}
}

export type AppActions = SetLoading;
