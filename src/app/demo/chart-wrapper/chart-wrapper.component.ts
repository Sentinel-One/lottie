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

  data;
  randomInterval;

  static randomizeData() {
    return Math.floor((Math.random() * 10) + 1);
  }

  ngOnInit(): void {
    this.data           = [48, 21, 65, 30];
    this.randomInterval = setInterval(() => {
      const dataset = [];
      this.data.forEach(() => {
        const datum = ChartWrapperComponent.randomizeData();
        dataset.push(datum);
      });
      this.data = dataset;
    }, 2000);
  }

  ngOnDestroy(): void {
    clearInterval(this.randomInterval);
  }

}
