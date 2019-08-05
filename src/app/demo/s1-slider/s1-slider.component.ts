import {Component, Input} from '@angular/core';
import {AnimationItem} from 'lottie-web';

@Component({
  selector: 'app-s1-slider',
  templateUrl: './s1-slider.component.html',
  styleUrls: ['./s1-slider.component.css']
})
export class S1SliderComponent {

  animData;

  @Input() set animation(animation: AnimationItem) {
    this.animData = animation;
  }

  get animation(): AnimationItem {
    return this.animData;
  }

}
