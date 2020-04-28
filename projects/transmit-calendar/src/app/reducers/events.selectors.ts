import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EventsState, adapter } from './events.store';

const selectEvents = createFeatureSelector<EventsState>('currentEvents');
export const selectCurrentEvents = createSelector(
  selectEvents,
  adapter.getSelectors().selectAll
);

/*export const selectEventsOnDate = createSelector(
  selectEvents,
  (state: EventsState, date: Date) => state.events.filter(e =>
    e.dateStart.getFullYear() === date.getFullYear() &&
    e.dateStart.getMonth() === date.getMonth() &&
    e.dateStart.getDate() === date.getDate())
);*/
