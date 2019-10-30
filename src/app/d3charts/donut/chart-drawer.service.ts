import { Injectable } from '@angular/core';
import {Utils} from './utils';
import {select} from 'd3-selection';
import {pie, Pie} from 'd3-shape';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class ChartDrawerService {

  constructor() { }
    update(data) {
    const colors = Utils.getColors();
    const innerRadius = 50;
    const outerRadius = 70;
    const duration = 2000;
    const selector = '#chart';


    select(selector).html('');
    const generator: Pie<any, number | { valueOf(): number; }> = pie();

    const chart = generator(data);

    const arcs = select(selector)
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

    select(selector)
      .transition()
      .duration(duration)
      .tween('arcRadii', () => {
        return t => arc
          .innerRadius(d3.interpolate(0, innerRadius)(t))
          .outerRadius(d3.interpolate(0, outerRadius)(t));
      });
  }
}
