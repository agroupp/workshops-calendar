import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';

import { AddEventComponent } from './add-event/add-event.component';
import { ViewEventComponent } from './view-event/view-event.component';
import { ParticipantItemComponent } from './participant-item/participant-item.component';
import { EventsListComponent } from './events-list/events-list.component';

@NgModule({
  declarations: [
    AddEventComponent,
    ViewEventComponent,
    ParticipantItemComponent,
    EventsListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatListModule,
  ],
  exports: [MatDialogModule, AddEventComponent, ViewEventComponent],
  entryComponents: [AddEventComponent, ViewEventComponent],
})
export class DialogsModule {}
