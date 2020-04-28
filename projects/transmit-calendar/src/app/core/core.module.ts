import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { StoreModule } from '@ngrx/store';
import * as fromCoreState from './store';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    BrowserModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    StoreModule.forFeature(
      fromCoreState.coreStateFeatureKey,
      fromCoreState.reducers,
      { metaReducers: fromCoreState.metaReducers }
    ),
  ],
  exports: [MainLayoutComponent],
})
export class CoreModule {}
