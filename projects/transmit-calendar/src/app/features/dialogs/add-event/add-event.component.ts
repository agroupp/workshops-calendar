import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DateAdapter, ITime } from '../../../date-adapter';
import { IEvent, IParticipant } from '../../../data';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tr-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {
  event: IEvent;
  isToday = false;

  titleCtrl = new FormControl();
  startTimeCtrl = new FormControl();
  endTimeCtrl = new FormControl();
  addParticipantCtrl = new FormControl();
  descriptionCtrl = new FormControl();

  times: string[] = [];
  filteredStartTimes: string[] = [];
  filteredEndTimes: string[] = [];

  startTimeCtrlSubscription: Subscription;
  endTimeCtrlSubscription: Subscription;
  descriptionCtrlSubscription: Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {date: Date}, private dialogRef: MatDialogRef<AddEventComponent>) { }

  ngOnInit(): void {
    const startTimeCtrlValueChanged$ = this.startTimeCtrl.valueChanges.pipe(
      map(value => value.replace(/\s/g, '')),
      distinctUntilChanged()
    );
    this.startTimeCtrlSubscription = startTimeCtrlValueChanged$.subscribe(value => this.onStartTimeChanged(value));

    const endTimeCtrlValueChanged$ = this.endTimeCtrl.valueChanges.pipe(
      map(value => value.replace(/\s/g, '')),
      distinctUntilChanged()
    );
    this.endTimeCtrlSubscription = endTimeCtrlValueChanged$.subscribe(value => this.onEndTimeChanged(value));

    this.descriptionCtrlSubscription = this.descriptionCtrl.valueChanges.subscribe(value => this.event.description = value);

    this.init();
    this.startTimeCtrl.setValue(this.filteredStartTimes[0]);
  }

  onStartTimeChanged(value: string): void {
    const splitted = this.splitControlTimeValue(value);
    if (!splitted) {
      return;
    }
    this.filteredStartTimes = this.times.filter(t => DateAdapter.parseStringTime(t).h === +splitted[0]);
    const time = DateAdapter.parseStringTime(value);
    if (!time) {
      return;
    }
    this.endTimeCtrl.setValue(DateAdapter.timeToString({h: time.h + 1, m: time.m}));
    this.setEventStartTime(time);
  }

  onEndTimeChanged(value: string): void {
    const splitted = this.splitControlTimeValue(value);
    if (!splitted) {
      return;
    }
    this.filteredEndTimes = this.times.filter(t => DateAdapter.parseStringTime(t).h === +splitted[0]);
    const time = DateAdapter.parseStringTime(value);
    this.setEventEndTime(time);
  }

  addParticipant(): void {
    let value = this.addParticipantCtrl.value;
    if (!value) {
      return;
    }
    value = value.trim();
    if (this.isParticipantInList({name: value})) {
      return;
    }
    this.event.participants.push({name: value});
    this.addParticipantCtrl.setValue('');
  }

  addParticipantEnterPressed(event: KeyboardEvent): void {
    if (event.key !== 'Enter') {
      return;
    }
    this.addParticipant();
  }

  private isParticipantInList(participant: IParticipant): boolean {
    const check = this.event.participants.filter(p => p.name === participant.name);
    return check.length > 0;
  }

  removePartcipant(participant: IParticipant): void {
    if (!this.isParticipantInList(participant)) {
      return;
    }
    this.event.participants = this.event.participants.filter(p => p.name !== participant.name);
  }

  private splitControlTimeValue(value: string): string[] {
    if (!value) {
      return null;
    }
    const splitted = value.split(':');
    if (splitted.length > 2) {
      return null;
    }
    splitted[0] = splitted[0].slice(0, 2);
    return splitted;
  }

  private setEventStartTime(time: ITime): void {
    if (!time) {
      return;
    }
    this.event.dateStart.setHours(time.h);
    this.event.dateStart.setMinutes(time.m);
  }

  private setEventEndTime(time: ITime): void {
    if (!time) {
      return;
    }
    this.event.dateEnd.setHours(time.h);
    this.event.dateEnd.setMinutes(time.m);
  }

  private init() {
    const now = new Date();
    this.times = DateAdapter.generateStingTimes();
    this.isToday = this.data?.date.getDate() === now.getDate();
    this.filteredStartTimes = this.isToday ?
      DateAdapter.afterTimes({h: now.getHours(), m: now.getMinutes()}, this.times) :
      DateAdapter.afterTimes({h: 8, m: 59}, this.times);
    const initialStartTime = DateAdapter.parseStringTime(this.filteredStartTimes[0]);
    const initialHrs = initialStartTime.h;
    this.filteredEndTimes = DateAdapter.afterTimes({h: initialHrs + 1, m: initialStartTime.m}, this.times);

    this.event = {
      id: undefined,
      dateStart: new Date(this.data.date.valueOf()),
      dateEnd: new Date(this.data.date.valueOf()),
      title: '',
      description: '',
      participants: []
    };
    this.setEventStartTime(initialStartTime);
    this.setEventEndTime({h: initialHrs + 1, m: initialStartTime.m});
  }

  save() {
    let title: string = this.titleCtrl.value;
    title = title ? title.trim() : '';
    this.event.title = title;
    this.dialogRef.close(this.event);
  }

  ngOnDestroy() {
    this.startTimeCtrlSubscription.unsubscribe();
    this.endTimeCtrlSubscription.unsubscribe();
    this.descriptionCtrlSubscription.unsubscribe();
  }
}
