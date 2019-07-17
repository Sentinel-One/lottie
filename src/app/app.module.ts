import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {S1LottieModule} from '../../projects/s1-lottie/src/lib/s1-lottie.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    S1LottieModule,
    FontAwesomeModule,
    NoopAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
