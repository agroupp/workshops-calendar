import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { IParticipant } from '../../../data';

@Component({
  selector: 'tr-participant-item',
  templateUrl: './participant-item.component.html',
  styleUrls: ['./participant-item.component.scss']
})
export class ParticipantItemComponent implements OnInit, OnChanges {
  @Input() participant: IParticipant;
  @Input() showDelete = true;
  @Output() remove = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

  onRemoveClick() {
    this.remove.emit();
  }

}
