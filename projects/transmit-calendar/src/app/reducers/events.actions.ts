import { createAction, props } from '@ngrx/store';
import { IEvent } from '../data';

export const loadMonthEventsSuccess = createAction(
  'Events Effects Load month events success',
  props<{ events: IEvent[] }>()
);

export const addEvent = createAction(
  '[Month Cell Component] Add Event',
  props<{ event: IEvent }>()
);

export const addEventSuccess = createAction(
  '[Event Add Effect] Add Event Success',
  props<{ event: IEvent }>()
);

export const addEventFailure = createAction(
  '[Event Add Effect] Add Event Failure',
  props<{ error: any }>()
);

export const removeEvent = createAction(
  '[Month Cell Component] Remove Event',
  props<{ id: string }>()
);

export const removeEventSuccess = createAction(
  '[Event Remove Effect] Remove Event Success',
  props<{ id: string }>()
);

export const removeEventFailure = createAction(
  '[Event Remove Effect] Remove Event Failure',
  props<{ error: any }>()
);
