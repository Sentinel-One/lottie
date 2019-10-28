import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-anim-cube',
  templateUrl: './anim-cube.component.html',
  styleUrls: ['./anim-cube.component.css']
})
export class AnimCubeComponent implements OnInit, OnDestroy {
  scaled = false;
  rAF;
  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.rAF = requestAnimationFrame(() => {
      this.scaled = !this.scaled;
    });
  }

  ngOnDestroy(): void {
    if (this.rAF) {
      cancelAnimationFrame(this.rAF);
    }
  }

}
