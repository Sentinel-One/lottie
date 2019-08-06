import {Component, Input} from '@angular/core';
import {AnimationItem} from 'lottie-web';

@Component({
  selector: 'app-s1-slider',
  templateUrl: './s1-slider.component.html',
  styleUrls: ['./s1-slider.component.css']
})
export class S1SliderComponent {

  _totalFrames;
  _currentFrame;

  @Input() set totalFrames(totalFrames) {
    this._totalFrames = totalFrames;
  }

  get totalFrames(): AnimationItem {
    return this._totalFrames;
  }

  @Input() set currentFrame(currentFrame) {
    this._currentFrame = currentFrame;
  }

  get currentFrame(): AnimationItem {
    return this._currentFrame;
  }

}
