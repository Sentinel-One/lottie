import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { S1LottieModule } from '../../projects/s1-lottie/src/lib/s1-lottie.module';
import {FormsModule} from '@angular/forms';
import { S1SliderComponent } from './demo/s1-slider/s1-slider.component';
import { DonutComponent } from './demo/d3-charts/donut/donut.component';
import { AnimCubeComponent } from './demo/anim-cube/anim-cube.component';
import { WebAnimDirective } from './demo/web-anim.directive';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    S1SliderComponent,
    DonutComponent,
    AnimCubeComponent,
    WebAnimDirective
  ],
  imports: [
    BrowserModule,
    S1LottieModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
