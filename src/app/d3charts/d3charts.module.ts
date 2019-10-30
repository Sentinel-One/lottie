import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DonutComponent} from './donut/donut.component';

@NgModule({
  declarations: [
    DonutComponent
  ],
  imports: [
    CommonModule],
  exports: [
    DonutComponent,
  ]
})
export class D3chartsModule {
}
