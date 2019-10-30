import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart-wrapper.component.html',
  styleUrls: ['./chart-wrapper.css']
})
export class ChartWrapperComponent implements OnInit {

  data;

  static randomizeData() {
    return Math.floor((Math.random() * 10) + 1);
  }

  constructor() {}

  ngOnInit(): void {
    this.data = [48, 21, 65, 30];
    setInterval(() => {
      const dataset = [];
      this.data.forEach(() => {
        const datum = ChartWrapperComponent.randomizeData();
        dataset.push(datum);
      });
      this.data = dataset;
    }, 2000);
  }

}
