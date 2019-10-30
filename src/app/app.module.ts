import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { S1LottieModule } from '../../projects/s1-lottie/src/lib/s1-lottie.module';
import {FormsModule} from '@angular/forms';
import { S1LottieWrapperComponent } from './demo/s1-lottie-wrapper/s1-lottie-wrapper.component';
import { WebAnimDirective } from './demo/web-anim.directive';
import {AppRoutingModule} from './app-routes.module';
import {D3chartsModule} from './d3charts/d3charts.module';
import {ChartWrapperComponent} from './demo/chart-wrapper/chart-wrapper.component';
import {DonutComponent} from './d3charts/donut/donut.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    S1LottieWrapperComponent,
    WebAnimDirective,
    ChartWrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    S1LottieModule,
    FontAwesomeModule,
    FormsModule,
    D3chartsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
