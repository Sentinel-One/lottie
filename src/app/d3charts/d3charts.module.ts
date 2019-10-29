import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DonutComponent} from './donut/donut.component';
import {RouterModule} from '@angular/router';
import {routes} from './charts-routes';



@NgModule({
  declarations: [
    DonutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    DonutComponent,
  ]
})
export class D3chartsModule { }
