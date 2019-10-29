import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DemoComponent} from './demo/demo.component';
import {DonutComponent} from '../../projects/d3charts/donut/donut.component';
import {S1LottieWrapperComponent} from './demo/s1-lottie-wrapper/s1-lottie-wrapper.component';
import {CanvasDemoComponent} from './demo/canvas-demo/canvas-demo.component';

const routes: Routes = [
  { path: 'demo', component: DemoComponent, children: [
      { path: 'd3chart', component: DonutComponent },
      { path: 'lottie', component: S1LottieWrapperComponent },
      { path: 'canvas', component: CanvasDemoComponent },
    ] },
  {
    path: '',
    redirectTo: 'demo',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
