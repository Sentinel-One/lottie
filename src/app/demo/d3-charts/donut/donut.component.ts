import {Component, NgZone, OnInit} from '@angular/core';
import * as d3 from 'd3';
import { Utils } from './utils';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css']
})
export class DonutComponent implements OnInit {

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    this.draw();
  }

  draw() {
    this.ngZone.runOutsideAngular(() => {
      const data = [48, 21, 65, 30, 16, 2];
      const colors = Utils.getColors();

      const sizes = {
        innerRadius: 50,
        outerRadius: 100
      };

      const durations = {
        entryAnimation: 2000
      };

      d3.select('#chart').html('');
      const generator = d3.pie().sort(null);

      const chart = generator(data);

      const arcs = d3.select('#chart')
        .append('g')
        .attr('transform', 'translate(100, 100)')
        .selectAll('path')
        .data(chart)
        .enter()
        .append('path')
        .style('fill', (d, i) => colors[i]);

      const angleInterpolation = d3.interpolate(generator.startAngle()(null), generator.endAngle()(null));

      const innerRadiusInterpolation = d3.interpolate(0, sizes.innerRadius);
      const outerRadiusInterpolation = d3.interpolate(0, sizes.outerRadius);

      const arc: any = d3.arc();

      arcs.transition()
        .duration(durations.entryAnimation)
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

      d3.select('#chart')
        .transition()
        .duration(durations.entryAnimation)
        .tween('arcRadii', () => {
          return t => arc
            .innerRadius(innerRadiusInterpolation(t))
            .outerRadius(outerRadiusInterpolation(t));
        });
    });
  }
}
