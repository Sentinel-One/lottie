import {Component} from '@angular/core';
import {faPause, faPlay} from '@fortawesome/free-solid-svg-icons';
import {AnimationItem} from 'lottie-web';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent {

  isPlaying        = true;
  icon             = faPause;
  animation: AnimationItem;
  lottieParams     = {
    path: 'assets/lottie/s1_logo.json',
    renderer: 'svg',
    loop: true,
    autoplay: true
  };

  onAnimationCreated(animation) {
    this.animation        = animation;
  }

  togglePlay() {
    this.isPlaying ? this.animation.pause() : this.animation.play();
    this.icon      = this.isPlaying ? faPlay : faPause;
    this.isPlaying = !this.isPlaying;
  }

}
