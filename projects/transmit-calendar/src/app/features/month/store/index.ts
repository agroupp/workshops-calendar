import {
  createFeatureSelector,
  MetaReducer,
  ActionReducerMap
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import * as core from '../../../core/store';
import * as rootEventsSelectors from '../../../reducers/events.selectors';

export const monthStateFeatureKey = 'monthState';

// tslint:disable-next-line:no-empty-interface
export interface MonthState {
  // For future use
}

export const reducers: ActionReducerMap<MonthState> = {};

// Selectors
export const selectMonthFeature = createFeatureSelector(monthStateFeatureKey);
export const selectCurrentMonth = core.selectCurrentMonth;
export const selectCurrentEvents = rootEventsSelectors.selectCurrentEvents;

export const metaReducers: MetaReducer<MonthState>[] = !environment.production
  ? []
  : [];
