import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map, tap, mergeMap } from 'rxjs/operators';
import { selectCurrentMonth, selectCurrentEvents } from '../store';
import { DateAdapter } from '../../../date-adapter';
import { Observable } from 'rxjs';
import { IDay, IEvent } from '../../../data';

@Component({
  selector: 'tr-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss'],
})
export class MonthComponent implements OnInit {
  weeks$: Observable<IDay[][]>;
  currentMonth: number;
  holiday = 6;

  constructor(private store: Store) {}

  ngOnInit(): void {
    const events$ = this.store.pipe(select(selectCurrentEvents));
    const currentMonth$ = this.store.pipe(
      select(selectCurrentMonth),
      tap((current) => (this.currentMonth = current.getMonth())),
      map((date) => DateAdapter.generateWeeks(date))
    );

    this.weeks$ = events$.pipe(
      mergeMap(events => currentMonth$.pipe(
        map(weeks => weeks.map(week => this.buildWeek(week, events)))
      ))
    );
  }

  private buildDay(date: Date, events: IEvent[]): IDay {
    return {
      date,
      events: events.filter((e) => DateAdapter.isEqualDay(e.dateStart, date))
    } as IDay;
  }

  private buildWeek(week: Date[], events: IEvent[]): IDay[] {
    return week.map(date => this.buildDay(date, events));
  }
}
