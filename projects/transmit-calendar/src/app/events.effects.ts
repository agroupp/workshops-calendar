import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { ActivatedRouteSnapshot, Params } from '@angular/router';
import { mergeMap, map, filter, catchError } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import * as fromEventsActions from './reducers/events.actions';
import { EventsService } from './services';

@Injectable()
export class EventsEffects {
  createEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromEventsActions.addEvent),
      mergeMap((action) =>
        this.eventsService.add(action.event).pipe(
          map((event) => fromEventsActions.addEventSuccess({ event })),
          catchError((err) => EMPTY)
        )
      )
    )
  );

  removeEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromEventsActions.removeEvent),
      map((action) => action.id),
      mergeMap((id) =>
        this.eventsService.delete(id).pipe(
          map(() => fromEventsActions.removeEventSuccess({ id })),
          catchError((error) =>
            of(fromEventsActions.removeEventFailure({ error }))
          )
        )
      )
    )
  );

  // TBD Caching system
  loadEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      map((payload) => this.getRouteParams(payload.payload.routerState.root)),
      filter((params) => params && params.year && params.month),
      mergeMap((params) =>
        this.eventsService.getEvents(+params.month, +params.year).pipe(
          map((events) => fromEventsActions.loadMonthEventsSuccess({ events })),
          catchError((error) =>
            of(fromEventsActions.addEventFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private eventsService: EventsService
  ) {}

  private getRouteParams(route: ActivatedRouteSnapshot): Params {
    let params: Params;
    if (Object.keys(route.params).length > 0) {
      return route.params;
    }
    if (route.children && route.children.length > 0) {
      let counter = 0;
      while (!params || counter < route.children.length - 1) {
        params = this.getRouteParams(route.children[counter]);
        counter++;
      }
    }
    return params;
  }
}
