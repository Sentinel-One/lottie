import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-chart',
  template: `
    <app-donut [data]="data"></app-donut>`,
  styles: [`:host {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  `]
})
export class ChartWrapperComponent implements OnInit, OnDestroy {

  data: number[];
  randomInterval: number;

  static randomizeData() {
    return Math.floor((Math.random() * 10) + 1);
  }

  ngOnInit(): void {
    this.data = [48, 21, 65, 30];
    this.randomInterval = setInterval(() => {
      this.data = this.data.map(() => {
        return  ChartWrapperComponent.randomizeData();
      });
    }, 2000);
  }

  ngOnDestroy(): void {
    clearInterval(this.randomInterval);
  }

}
