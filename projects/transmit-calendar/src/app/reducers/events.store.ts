import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { v4 as uuid } from 'uuid';
import * as fromEventsActions from './events.actions';
import { IEvent } from '../data';

export interface EventsState extends EntityState<IEvent> {}

export const adapter: EntityAdapter<IEvent> = createEntityAdapter<IEvent>();

const initialState = adapter.getInitialState();

export const eventsReducer = createReducer<EventsState>(
  initialState,
  on(fromEventsActions.loadMonthEventsSuccess, (state, action) =>
    adapter.setAll(action.events, state)
  ),
  on(fromEventsActions.addEventSuccess, (state, action) =>
    adapter.addOne(action.event, state)
  ),
  on(fromEventsActions.removeEventSuccess, (state, action) =>
    adapter.removeOne(action.id, state)
  )
);
