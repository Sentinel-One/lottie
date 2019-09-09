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
import {isPlatformServer, KeyValue} from '@angular/common';

export enum LottieEventTypes {
  complete = 'complete',
  loopComplete = 'loopComplete',
  enterFrame = 'enterFrame',
  segmentStart = 'segmentStart',
  configReady = 'config_ready',  // (when initial config is done)
  dataReady = 'data_ready', // (when all parts of the animation have been loaded)
  dataFailed = 'data_failed', // (when part of the animation can not be loaded)
  loadedImages = 'loaded_images', // (when all image loads have either succeeded or errored)
  DOMLoaded = 'DOMLoaded', // (when elements have been added to the DOM)
  destroy = 'destroy'
}

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
  @Output() enterFrame = new EventEmitter<AnimationItem>();
  @Output() complete = new EventEmitter<AnimationItem>();
  @Output() loopComplete = new EventEmitter<AnimationItem>();
  @Output() segmentStart = new EventEmitter<AnimationItem>();
  @Output() configReady = new EventEmitter<AnimationItem>();
  @Output() dataReady = new EventEmitter<AnimationItem>();
  @Output() dataFailed = new EventEmitter<AnimationItem>();
  @Output() loadedImages = new EventEmitter<AnimationItem>();
  @Output() DOMLoaded = new EventEmitter<AnimationItem>();
  @Output() destroy = new EventEmitter<AnimationItem>();

  eventEmittersMap: {[key: string]: EventEmitter<AnimationItem>} = {
    complete: this.complete,
    loopComplete: this.loopComplete,
    enterFrame: this.enterFrame,
    segmentStart: this.segmentStart,
    config_ready: this.configReady,
    data_ready: this.dataReady,
    data_failed: this.dataFailed,
    loaded_images: this.loadedImages,
    DOMLoaded: this.DOMLoaded,
    destroy: this.destroy
  }

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
    this.initListeners();
  }

  private initListeners() {
    Object.values(LottieEventTypes).map(value => {
      this.renderer.listen(this.animationInstance, value, () => this.onEventHeard(value));
    });
  }

  private onEventHeard(eventType: LottieEventTypes) {
    this.eventEmittersMap[eventType].emit(this.animationInstance);
  }

  ngOnDestroy(): void {
    this.animationInstance && this.animationInstance.destroy();
  }

}
