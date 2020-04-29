import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IEvent } from '../data';
import { LocalStorageService } from './local-storage.service';

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
