import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { DialogsModule } from '../dialogs';
import { StoreModule } from '@ngrx/store';
import * as fromMonthState from './store';

import { CellComponent } from './cell/cell.component';
import { MonthComponent } from './month/month.component';

const monthNow = new Date().getUTCMonth() + 1;
const yearNow = new Date().getUTCFullYear();

const routes: Routes = [
  { path: ':year/:month', component: MonthComponent },
  { path: '', redirectTo: `${yearNow}/${monthNow}`, pathMatch: 'full' },
];

@NgModule({
  declarations: [MonthComponent, CellComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    DialogsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(
      fromMonthState.monthStateFeatureKey,
      fromMonthState.reducers,
      { metaReducers: fromMonthState.metaReducers }
    ),
  ],
})
export class MonthModule {}
