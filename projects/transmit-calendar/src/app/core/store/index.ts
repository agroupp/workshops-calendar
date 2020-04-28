import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as root from '../../reducers';
import { Params } from '@angular/router';

export const coreStateFeatureKey = 'coreState';

export interface CoreState {

}

export const reducers: ActionReducerMap<CoreState> = {

};

export const selectCurrentMonth = createSelector(
  root.selectRouteParams,
  (params: Params) => {
    if (!params) {
      return null;
    }
    const year = +params.year;
    const month = +params.month;
    return new Date(year, month - 1, 1, 0, 0, 0);
  }
);

export const metaReducers: MetaReducer<CoreState>[] = !environment.production ? [] : [];
