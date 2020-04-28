import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import * as monthActions from './month.actions';
import * as core from '../../../core/store';
import * as rootEventsSelectors from '../../../reducers/events.selectors';

export const monthStateFeatureKey = 'monthState';

export interface MonthState {
  current: Date;
}

export const initialState: MonthState = {
  current: new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1))
};

export const reducers = createReducer(
  initialState,
  on(monthActions.setCurrentMonth, (state, action) => ({...state, current: action.currentMonth}))
);

export const selectMonthFeature = createFeatureSelector(monthStateFeatureKey);
export const selectCurrentMonth = core.selectCurrentMonth;
export const selectCurrentEvents = rootEventsSelectors.selectCurrentEvents;
// export const selectEventsOnDate = rootEventsSelectors.selectEventsOnDate;

export const metaReducers: MetaReducer<MonthState>[] = !environment.production ? [] : [];
