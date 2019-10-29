import {Component, Input, OnInit} from '@angular/core';
import {faPause, faPlay} from '@fortawesome/free-solid-svg-icons';
import {AnimationItem} from 'lottie-web';
import {S1LottieConfig} from '../../../../projects/s1-lottie/src/lib/s1-lottie';

@Component({
  selector: 'app-lottie',
  templateUrl: './s1-lottie-wrapper.component.html',
  styleUrls: ['./s1-lottie-wrapper.css']
})
export class S1LottieWrapperComponent implements OnInit {

  isPlaying = true;
  runOutsideAngular = true;
  icon = faPause;
  animation: AnimationItem = null;
  lottieParams: S1LottieConfig;
  totalFrames;
  currentFrame;


  constructor() {}

  ngOnInit(): void {
    this.lottieParams  = {
      path: 'assets/lottie/s1_logo.json',
      renderer: 'svg',
      loop: true,
      autoplay: true
    };
  }


  onAnimationCreated(anim: AnimationItem) {
    this.animation = anim;
  }

  togglePlay() {
    this.isPlaying ? this.animation.pause() : this.animation.play();
    this.icon      = this.isPlaying ? faPlay : faPause;
    this.isPlaying = !this.isPlaying;
  }

}
