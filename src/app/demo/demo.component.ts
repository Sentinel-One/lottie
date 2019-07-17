import {ChangeDetectorRef, Component} from '@angular/core';
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
  lottieParams     = {
    path: 'assets/lottie/s1_logo.json',
    renderer: 'svg',
    loop: true,
    autoplay: true
  };

  private animation: AnimationItem;

  onAnimationCreated(animation) {
    this.animation        = animation;
    this.animation.addEventListener('complete', () => {
      console.log('hi');
    });
  }

  togglePlay() {
    this.isPlaying ? this.animation.pause() : this.animation.play();
    this.icon      = this.isPlaying ? faPlay : faPause;
    this.isPlaying = !this.isPlaying;
  }

}
