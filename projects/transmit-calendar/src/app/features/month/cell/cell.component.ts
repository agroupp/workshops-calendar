import {
  Component,
  OnInit,
  OnChanges,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IDay, IEvent } from '../../../data';
import {
  AddEventComponent,
  ViewEventComponent,
  EventsListComponent,
} from '../../dialogs';
import { MonthState } from './../store';
import { DateAdapter } from './../../../date-adapter';

import * as fromMonthActions from '../store/month.actions';

@Component({
  selector: 'tr-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent implements OnInit, OnChanges {
  @Input() day: IDay;
  @Input() currentMonth: number;
  @Input() isHoliday = false;
  isToday = false;
  isPast = false;

  isHover = false;

  events: IEvent[] = [];
  cellHeightString = '';
  cellHeight = 0;
  showEventsList = true;

  dialogWidth = 450;
  dialogHeight = 350;

  @ViewChild('wrapper') private wrapperRef: ElementRef;
  @ViewChild('eventsSection') private eventsRef: ElementRef;

  constructor(
    private dialog: MatDialog,
    private store: Store<MonthState>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  ngOnChanges() {
    const now = new Date();
    this.isToday = DateAdapter.isEqualDay(this.day.date, now);
    this.isPast = DateAdapter.isLessDay(this.day.date, now);
    this.day.events.sort(
      (a, b) => a.dateStart.getTime() - b.dateStart.getTime()
    );
  }

  showEventsListDialog() {
    const dialogRef = this.dialog.open(EventsListComponent, { data: this.day });
    dialogRef.afterClosed().subscribe((event: IEvent) => this.viewEvent(event));
  }

  addEvent(): void {
    if (this.day.events.length === 5) {
      this.snackBar.open('You can have 5 events per day maximum', 'Add Event', {
        duration: 2000,
      });
      return;
    }
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: `${this.dialogWidth}px`,
      minHeight: `${this.dialogHeight}px`,
      data: { date: this.day.date },
    });
    dialogRef.afterClosed().subscribe((event: IEvent) => {
      if (!event) {
        return;
      }
      this.store.dispatch(fromMonthActions.addEvent({ event }));
    });
  }

  viewEvent(event: IEvent) {
    const dialogRef = this.dialog.open(ViewEventComponent, {
      width: `${this.dialogWidth}px`,
      minHeight: `${this.dialogHeight}px`,
      data: event,
    });

    dialogRef.afterClosed().subscribe((action) => {
      if (!event) {
        return;
      }
      if (action === 'delete') {
        this.store.dispatch(fromMonthActions.removeEvent({ id: event.id }));
      }
    });
  }
}
