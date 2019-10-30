import {AfterViewInit, Component, Input, NgZone} from '@angular/core';
import {ChartDrawerService} from './chart-drawer.service';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css']
})
export class DonutComponent  {

  private _data;

  @Input() set data(dataset) {
    this._data = dataset;
      this.ngZone.runOutsideAngular(() => {
        this.chartDrawer.update(dataset);
      });
  }

  get data() {
    return this._data;
  }

  constructor(private ngZone: NgZone, private chartDrawer: ChartDrawerService) { }

}
