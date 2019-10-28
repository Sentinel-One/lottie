import {AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import { Utils } from './utils';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css']
})
export class DonutComponent implements AfterViewInit, OnInit {
  @ViewChild('s1chart', {static: true}) s1chart: ElementRef;

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    // start the demo running this.draw(); from here
  }

  ngAfterViewInit(): void {
    if ( this.s1chart.nativeElement ) {
      this.draw();
    }
  }

  draw() {
    this.ngZone.runOutsideAngular(() => {
      const data = [48, 21, 65, 30, 16, 2];
      const colors = Utils.getColors();
      const innerRadius = 50;
      const outerRadius = 70;
      const duration = 2000;
      const selector = '#chart';

      d3.select(selector).html('');
      const generator = d3.pie().sort(null);

      const chart = generator(data);

      const arcs = d3.select(selector)
        .append('g')
        .attr('transform', 'translate(100, 100)')
        .selectAll('path')
        .data(chart)
        .enter()
        .append('path')
        .style('fill', (d, i) => colors[i]);

      const angleInterpolation = d3.interpolate(
        generator.startAngle()(null),
        generator.endAngle()(null)
      );

      const arc: any = d3.arc();

      arcs.transition()
        .duration(duration)
        .attrTween('d', d => {
          const originalEnd = d.endAngle;
          return t => {
            const currentAngle = angleInterpolation(t);
            if (currentAngle < d.startAngle) {
              return '';
            }

            d.endAngle = Math.min(currentAngle, originalEnd);

            return arc(d);
          };
        });

      d3.select(selector)
        .transition()
        .duration(duration)
        .tween('arcRadii', () => {
          return t => arc
            .innerRadius(d3.interpolate(0, innerRadius)(t))
            .outerRadius(d3.interpolate(0, outerRadius)(t));
        });
    });
  }
}
