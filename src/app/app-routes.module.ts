import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {S1LottieWrapperComponent} from './demo/s1-lottie-wrapper/s1-lottie-wrapper.component';
import {ChartWrapperComponent} from './demo/chart-wrapper/chart-wrapper.component';
import {AppLandingComponent} from './demo/landing/landing.component';

const routes: Routes = [
  {path: '', component: AppLandingComponent},
  {path: 'lottie', component: S1LottieWrapperComponent},
  {path: 'd3chart', component: ChartWrapperComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
