import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import * as fromEventsStore from './events.store';

export interface AppState {
  router: fromRouter.RouterReducerState<any>;
  currentEvents: fromEventsStore.EventsState;
}

export const selectRouter = createFeatureSelector<
  AppState,
  fromRouter.RouterReducerState
>('router');

export const { selectRouteParams } = fromRouter.getSelectors(selectRouter);

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  currentEvents: fromEventsStore.eventsReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
