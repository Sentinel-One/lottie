import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
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
import {S1LottieFactory} from './s1-lottie.factory';
import {S1LottieConfig} from './s1-lottie';

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

export interface LottieEventType { [key: string]: EventEmitter<AnimationItem>; }

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

  @Input() width: number;
  @Input() height: number;
  @Input() options: S1LottieConfig ;
  @Input() optimize = true;

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

  eventEmittersMap: LottieEventType;

  @ViewChild('lottieContainer', {static: true}) lottieContainer: ElementRef;

  private animationInstance: AnimationItem;
  public viewWidth: string;
  public viewHeight: string;
  observer;

  constructor(@Inject(PLATFORM_ID) private platformId: string,
              private renderer: Renderer2,
              private ngZone: NgZone) {}

  ngOnInit() {
    this.eventEmittersMap = S1LottieFactory.setLottiesEventTypes(this);
    this.viewWidth  = this.width + 'px' || '100%';
    this.viewHeight = this.height + 'px' || '100%';
  }

  ngAfterViewInit() {
    if (isPlatformServer(this.platformId)) return;

    const options: AnimationConfigWithPath & AnimationConfigWithData = S1LottieFactory.setLottiesConfig(this);
    if (this.optimize) {
      this.ngZone.runOutsideAngular(() => {
        this.loadAnimation(options);
        this.playAnimationOnlyWhenElementAppears();
      });
    } else {
      this.loadAnimation(options);
      this.playAnimationOnlyWhenElementAppears();
    }
  }

  playAnimationOnlyWhenElementAppears() {
    if (this.options.loop) {
      this.observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio !== 0) {
            this.animationInstance.play();
          } else {
            this.animationInstance.pause();
          }
        }
      });
    }
    this.observer.observe(this.lottieContainer.nativeElement);
  }

  loadAnimation(options: AnimationConfig | AnimationConfigWithData) {
    this.animationInstance = Lottie.loadAnimation(options);
    this.animationCreated.emit(this.animationInstance);
    // registering the lottie's enterFrame event (https://airbnb.io/projects/lottie-web/)
    this.initListeners();
  }

  private initListeners() {
    for (const eventType of Object.values(LottieEventTypes)) {
      this.renderer.listen(this.animationInstance, eventType, () => this.onEventDetected(eventType));
    }
  }

  private onEventDetected(eventType: LottieEventTypes) {
    this.eventEmittersMap[eventType].emit(this.animationInstance);
  }

  ngOnDestroy(): void {
    this.animationInstance && this.animationInstance.destroy();
    this.observer.disconnect();
  }

}
