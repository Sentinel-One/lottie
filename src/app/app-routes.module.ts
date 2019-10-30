import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DemoComponent} from './demo/demo.component';
import {S1LottieWrapperComponent} from './demo/s1-lottie-wrapper/s1-lottie-wrapper.component';
import {ChartWrapperComponent} from './demo/chart-wrapper/chart-wrapper.component';

const routes: Routes = [
  { path: 'demo', component: DemoComponent, children: [
        { path: 'lottie', component: S1LottieWrapperComponent },
        { path: 'd3chart', component: ChartWrapperComponent },
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
