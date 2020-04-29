import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDay } from '../../../data';

@Component({
  selector: 'tr-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
})
export class EventsListComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public day: IDay) {}

  ngOnInit(): void {}
}
