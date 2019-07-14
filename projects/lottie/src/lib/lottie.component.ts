import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input,
  PLATFORM_ID,
  Inject,
  NgZone,
  OnInit
} from '@angular/core';
import * as lottie from 'lottie-web';
import { LottieParams, LottieAnimation } from './symbols';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'fiv-lottie',
  template: `
    <div #lottieContainer [ngStyle]="{'width': viewWidth, 'height': viewHeight, 'overflow':'hidden', 'margin': '0 auto'}">
    </div>
  `,
  styles: []
})
export class LottieComponent implements OnInit, AfterViewInit {

  @Input() params: LottieParams;
  @Input() width: number;
  @Input() height: number;
  @Input() runOutsideAngular = true;

  @Output() animationCreated = new EventEmitter<LottieAnimation>();

  @ViewChild('lottieContainer') lottieContainer: ElementRef;

  public viewWidth: string;
  public viewHeight: string;

  private _params: LottieParams;

  constructor(@Inject(PLATFORM_ID) private platformId: string, private ngZone: NgZone) { }

  ngOnInit() {
    this.viewWidth = this.width + 'px' || '100%';
    this.viewHeight = this.height + 'px' || '100%';
  }

  ngAfterViewInit() {
    if (isPlatformServer(this.platformId)) { return; }

    this._params = {
      autoplay: this.params.autoplay,
      animationData: this.params.animationData,
      container: this.params.container || this.lottieContainer.nativeElement,
      loop: this.params.loop,
      name: this.params.name,
      path: this.params.path || '',
      renderer: this.params.renderer || 'svg',
      rendererSettings: this.params.rendererSettings
    };

    if (this.runOutsideAngular) {
      this.ngZone.runOutsideAngular(() => {
        this.loadAnimation();
      });
    } else {
      this.loadAnimation();
    }

  }

  loadAnimation() {
    const animation = lottie.loadAnimation(this._params);
    animation.addEventListener('DOMLoaded', () => {
      this.animationCreated.emit(animation);
    });
  }

}
