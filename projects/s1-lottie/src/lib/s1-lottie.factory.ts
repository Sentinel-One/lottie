import {LottieEventType, S1LottieComponent} from './s1-lottie.component';
import {AnimationConfigWithData, AnimationConfigWithPath} from 'lottie-web';

export class S1LottieFactory {
  constructor() {}
  
  static setLottiesEventTypes(s1LottieInstance: S1LottieComponent): LottieEventType {
    return  {
      complete: s1LottieInstance.complete,
      loopComplete: s1LottieInstance.loopComplete,
      enterFrame: s1LottieInstance.enterFrame,
      segmentStart: s1LottieInstance.segmentStart,
      config_ready: s1LottieInstance.configReady,
      data_ready: s1LottieInstance.dataReady,
      data_failed: s1LottieInstance.dataFailed,
      loaded_images: s1LottieInstance.loadedImages,
      DOMLoaded: s1LottieInstance.DOMLoaded,
      destroy: s1LottieInstance.destroy
    };
  }
  
  static setLottiesConfig(s1LottieInstance: S1LottieComponent): AnimationConfigWithPath & AnimationConfigWithData {
    return {
      autoplay: s1LottieInstance.options.autoplay,
      animationData: s1LottieInstance.options.animationData,
      container: s1LottieInstance.options.container || s1LottieInstance.lottieContainer.nativeElement,
      loop: s1LottieInstance.options.loop,
      name: s1LottieInstance.options.name,
      path: s1LottieInstance.options.path,
      renderer: s1LottieInstance.options.renderer || 'svg',
      rendererSettings: s1LottieInstance.options.rendererSettings
    };
  }
}
