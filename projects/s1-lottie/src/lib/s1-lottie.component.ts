import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnInit,
  Output,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import Lottie, {AnimationConfigWithData, AnimationConfigWithPath, AnimationItem} from 'lottie-web';
import {isPlatformServer} from '@angular/common';

@Component({
  selector: 's1-lottie',
  template: `
    <div #lottieContainer
         [ngStyle]="{'width': viewWidth, 'height': viewHeight, 'overflow':'hidden', 'margin': '0 auto'}">
    </div>

  `,
  styles: []
})
export class S1LottieComponent implements OnInit, AfterViewInit {

  @Input() params: AnimationConfigWithPath | AnimationConfigWithData | any;
  @Input() width: number;
  @Input() height: number;
  @Input() runOutsideAngular = true;

  @Output() animationCreated = new EventEmitter<AnimationItem>();

  @ViewChild('lottieContainer', {static: true}) lottieContainer: ElementRef;

  public viewWidth: string;
  public viewHeight: string;

  constructor(@Inject(PLATFORM_ID) private platformId: string,
              private ngZone: NgZone) {
  }

  ngOnInit() {
    this.viewWidth  = this.width + 'px' || '100%';
    this.viewHeight = this.height + 'px' || '100%';
  }

  ngAfterViewInit() {
    if (isPlatformServer(this.platformId)) {
      return;
    }


    // TODO: Add Type
    const params: any = {
      autoplay: this.params.autoplay,
      animationData: this.params.animationData,
      container: this.params.container || this.lottieContainer.nativeElement,
      loop: this.params.loop,
      name: this.params.name,
      path: this.params.path,
      renderer: this.params.renderer || 'svg',
      rendererSettings: this.params.rendererSettings
    };

    if (this.runOutsideAngular) {
      this.ngZone.runOutsideAngular(() => {
        this.loadAnimation(params);
      });
    } else {
      this.loadAnimation(params);
    }

  }

  loadAnimation(params: any) {
    const animation: AnimationItem = Lottie.loadAnimation(params);
    this.animationCreated.emit(animation);
  }

}
