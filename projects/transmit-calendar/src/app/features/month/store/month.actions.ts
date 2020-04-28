import { createAction, props } from '@ngrx/store';
import { IEvent } from '../../../data';
import * as fromRootEventsActions from '../../../reducers/events.actions';

export const setCurrentMonth = createAction(
  '[Month Month Component] Set current month',
  props<{ currentMonth: Date }>()
);

export const addEvent = fromRootEventsActions.addEvent;
export const removeEvent = fromRootEventsActions.removeEvent;
