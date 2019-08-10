import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter, HostListener,
  Inject,
  Input,
  NgZone, OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID, Renderer2,
  ViewChild
} from '@angular/core';
import Lottie, {AnimationConfig, AnimationConfigWithData, AnimationConfigWithPath, AnimationItem} from 'lottie-web';
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
export class S1LottieComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() params: AnimationConfigWithPath & AnimationConfigWithData ;
  @Input() width: number;
  @Input() height: number;
  @Input() runOutsideAngular = true;

  @Output() animationCreated = new EventEmitter<AnimationItem>();
  @Output() enterFrame = new EventEmitter<{ currentFrame, totalFrames }>();

  @ViewChild('lottieContainer', {static: true}) lottieContainer: ElementRef;

  private animationInstance: AnimationItem;
  public viewWidth: string;
  public viewHeight: string;

  constructor(@Inject(PLATFORM_ID) private platformId: string,
              private renderer: Renderer2,
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

    const params: AnimationConfigWithPath & AnimationConfigWithData = {
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

  loadAnimation(params: AnimationConfig | AnimationConfigWithData) {
    this.animationInstance = Lottie.loadAnimation(params);
    this.animationCreated.emit(this.animationInstance);
    // registering the lottie's enterFrame event (https://airbnb.io/projects/lottie-web/)
    this.renderer.listen(this.animationInstance, 'enterFrame', () => this.onEnterFrame());
  }

  private onEnterFrame() {
    this.enterFrame.emit({
      currentFrame: this.animationInstance['currentFrame'],
      totalFrames: this.animationInstance['totalFrames']
    });
  }

  ngOnDestroy(): void {
    this.animationInstance && this.animationInstance.destroy();
  }

}
