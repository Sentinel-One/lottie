import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-anim-cube',
  templateUrl: './anim-cube.component.html',
  styleUrls: ['./anim-cube.component.css']
})
export class AnimCubeComponent implements OnInit {

  @Input() set loopCount(count) {
    this.hearts.push(count);
  }

  hearts = [];

  constructor() { }

  ngOnInit() {
  }

}
