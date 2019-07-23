import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-s1-slider',
  templateUrl: './s1-slider.component.html',
  styleUrls: ['./s1-slider.component.css']
})
export class S1SliderComponent {

  animData;

  @Input() set animation(animation) {
    this.animData = animation;
  }

  get animation() {
    return this.animData;
  }
}
