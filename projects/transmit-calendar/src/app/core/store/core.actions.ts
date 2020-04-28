import { createAction, props } from '@ngrx/store';

export const setCurrentMonth = createAction(
  '[Core Main Layout Component] Set current month',
  props<{ currentMonth: Date }>()
);

export const incCurrentMonth = createAction(
  '[Core Main Layout Component] Increment current month'
);

export const decCurrentMonth = createAction(
  '[Core Main Layout Component] Decrement current month'
);
