import {AfterViewInit, Directive, ElementRef, OnDestroy} from '@angular/core';

@Directive({
  selector: '[appWebAnim]'
})
export class WebAnimDirective implements AfterViewInit, OnDestroy {

  rAF;
  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    this.rAF = requestAnimationFrame(() => this.animate());
  }

  animate() {
    // web animation API
    this.el.nativeElement.animate(
      [
        { transform: 'rotate(0) translate3D(-50%, -50%, 0)', color: '#000' },
        { color: '#431236', offset: 0.3},
        { transform: 'rotate(360deg) translate3D(-50%, -50%, 0)', color: '#000' }
      ], {
        duration: 3000,
        iterations: Infinity
      });
  }

  ngOnDestroy(): void {

    if (this.rAF) {
      cancelAnimationFrame(this.rAF);
    }
  }

}
