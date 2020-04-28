import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IEvent } from './../../../data';

@Component({
  selector: 'tr-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss'],
})
export class ViewEventComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IEvent) {}

  ngOnInit(): void {}
}
