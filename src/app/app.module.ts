import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { S1LottieModule } from '../../projects/s1-lottie/src/lib/s1-lottie.module';
import {FormsModule} from '@angular/forms';
import { S1SliderComponent } from './demo/s1-slider/s1-slider.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    S1SliderComponent
  ],
  imports: [
    BrowserModule,
    S1LottieModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
