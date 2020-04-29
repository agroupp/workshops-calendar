import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EventsState, adapter } from './events.store';

const selectEvents = createFeatureSelector<EventsState>('currentEvents');
export const selectCurrentEvents = createSelector(
  selectEvents,
  adapter.getSelectors().selectAll
);
