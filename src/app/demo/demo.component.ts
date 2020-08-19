import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {faPause, faPlay} from '@fortawesome/free-solid-svg-icons';
import {AnimationItem} from 'lottie-web';
import {S1LottieConfig} from '../../../projects/s1-lottie/src/lib/s1-lottie';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit, AfterViewChecked {
  isPlaying = true;
  runOutsideAngular = false;
  icon = faPause;
  animation: AnimationItem = null;
  lottieParams: S1LottieConfig;
  totalFrames;
  currentFrame;

  private _loopCount: number;

  get loopCount(): number {
    return this._loopCount;
  }

  set loopCount(value: number) {
    this._loopCount = value;
  }

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.lottieParams  = {
      path: 'assets/lottie/s1_logo.json',
      renderer: 'svg',
      loop: true,
      autoplay: true
    };
    this.loopCount = 0;
  }

  ngAfterViewChecked() {
    this.cd.detectChanges();
  }

  onAnimationCreated(anim: AnimationItem) {
    this.animation = anim;
  }
  onLoopComplete(anim: AnimationItem){
    this.loopCount++;
    this.cd.detectChanges();
  }

  updateAnimationFrames(anim: AnimationItem) {
    this.currentFrame = anim['currentFrame'];
    this.totalFrames = anim['totalFrames'];
    this.cd.detectChanges();
  }

  togglePlay() {
    this.isPlaying ? this.animation.pause() : this.animation.play();
    this.icon      = this.isPlaying ? faPlay : faPause;
    this.isPlaying = !this.isPlaying;
  }

  changeAnimation() {
    this.lottieParams = {
      ...this.lottieParams,
      path: 'assets/lottie/s1_test.json'
    };
    setTimeout(()=> {
      this.lottieParams = {
        ...this.lottieParams,
        path: 'assets/lottie/s1_logo.json'
      };
    }, 600)
  }

  onSliderChange(event) {
    const value = Number(event.target.value);
    const cf = value * this.totalFrames / 100;
    this.animation['currentFrame'] = cf;
    if (this.isPlaying) {
      this.animation.goToAndPlay(cf, true);
    } else {
      this.animation.setSpeed(0.5);
      this.animation.goToAndStop(cf, true);
      this.animation.setSpeed(1);
    }
  }

  onSpeedSelected(event) {
  }
}
