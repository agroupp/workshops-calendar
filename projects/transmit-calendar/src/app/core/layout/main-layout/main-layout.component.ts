import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import * as coreActions from '../../store/core.actions';
import { selectCurrentMonth } from '../../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'tr-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  today = new Date();
  current$: Observable<Date>;
  currentMonth: number;
  currentYear: number;
  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.current$ = this.store.pipe(
      select(selectCurrentMonth),
      tap((date) => {
        if (!date) {
          return;
        }
        this.currentMonth = date.getMonth() + 1;
        this.currentYear = date.getFullYear();
      })
    );
  }

  onNextMonthClick(): void {
    const nextMonth = this.currentMonth < 12 ? this.currentMonth + 1 : 1;
    const year =
      this.currentMonth < 12 ? this.currentYear : this.currentYear + 1;
    const url = `/month/${year}/${nextMonth}`;
    this.router.navigate([url]);
  }

  onPrevMonthClick(): void {
    const prevMonth = this.currentMonth > 1 ? this.currentMonth - 1 : 12;
    const year =
      this.currentMonth > 1 ? this.currentYear : this.currentYear - 1;
    const url = `/month/${year}/${prevMonth}`;
    this.router.navigate([url]);
  }

  onTodayClick(): void {
    const url = `/month/${this.today.getFullYear()}/${
      this.today.getMonth() + 1
    }`;
    this.router.navigate([url]);
  }
}
