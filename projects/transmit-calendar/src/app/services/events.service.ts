import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Observable, of } from 'rxjs';
import { IEvent } from '../data';
import { filter, map, tap, switchMap } from 'rxjs/operators';

const MOCK: IEvent[] = [
  {
    id: '98594598698',
    dateStart: new Date(2020, 3, 20, 10, 30),
    dateEnd: new Date(2020, 3, 20, 12, 30),
    title: 'Test Event 1',
    description: 'Test Event 1',
    participants: [],
  },
  {
    id: '985944702098',
    dateStart: new Date(2020, 3, 27, 16, 30),
    dateEnd: new Date(2020, 3, 27, 17, 0),
    title: 'Test Event 2',
    description: 'Test Event 2',
    participants: [],
  },
];

const COLLECTION_NAME = '_events';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private ls: LocalStorageService) {}

  getEvents(month: number, year: number): Observable<IEvent[]> {
    return this.getAllEvents().pipe(
      map((events) =>
        events.filter(
          (e) =>
            e.dateStart.getFullYear() === year &&
            e.dateStart.getMonth() === month - 1
        )
      )
    );
  }

  getAllEvents(): Observable<IEvent[]> {
    return of(this.ls.collectionGet<IEvent>(COLLECTION_NAME)).pipe(
      map((events) =>
        events.map((event) => ({
          ...event,
          dateStart: new Date(event.dateStart),
          dateEnd: new Date(event.dateEnd),
        }))
      )
    );
  }

  add(event: IEvent): Observable<IEvent> {
    const eventEntity: IEvent = { ...event, id: uuid() };
    return of(this.ls.collectionPush<IEvent>(COLLECTION_NAME, eventEntity));
  }

  delete(id: string): Observable<void> {
    return this.getAllEvents().pipe(
      map((events) => events.filter((e) => e.id !== id)),
      switchMap((events) => of(this.ls.setItem(COLLECTION_NAME, events)))
    );
  }
}
