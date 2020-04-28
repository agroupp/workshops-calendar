import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map, tap, mergeMap } from 'rxjs/operators';
import * as monthActions from '../store/month.actions';
import { selectCurrentMonth, selectCurrentEvents } from '../store';
import { DateAdapter, WEEK_DAYS } from '../../../date-adapter';
import { Observable } from 'rxjs';
import { IDay } from '../../../data';

@Component({
  selector: 'tr-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss'],
})
export class MonthComponent implements OnInit {
  weeks$: Observable<IDay[][]>;
  currentMonth: number;
  weekDays = WEEK_DAYS;
  holiday = 6;

  constructor(private store: Store) {}

  ngOnInit(): void {
    const events$ = this.store.pipe(select(selectCurrentEvents));
    this.weeks$ = events$.pipe(
      mergeMap((event) =>
        this.store.pipe(
          select(selectCurrentMonth),
          tap((current) => (this.currentMonth = current.getMonth())),
          map((date) => DateAdapter.generateWeeks(date)),
          map((weeks) =>
            weeks.map((week) =>
              week.map(
                (date) =>
                  ({
                    date,
                    events: event.filter((e) =>
                      DateAdapter.isEqualDay(e.dateStart, date)
                    ),
                  } as IDay)
              )
            )
          )
        )
      )
    );
  }
}
