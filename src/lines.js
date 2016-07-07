
import { select } from 'd3-selection';
import { line, area, symbol } from 'd3-shape';
import { max, min, descending } from 'd3-array';
import { scaleLinear, scaleLog, scaleTime } from 'd3-scale';
import { axisBottom, axisLeft, axisRight } from 'd3-axis';
import { timeFormat, timeFormatDefaultLocale } from 'd3-time-format';
import { formatDefaultLocale } from 'd3-format';
import { voronoi } from 'd3-voronoi';
import { polygonArea, polygonCentroid } from 'd3-polygon';
import { nest } from 'd3-collection';

import { 
  timeMillisecond,
  utcMillisecond,
  timeSecond,
  utcSecond,
  timeMinute,
  utcMinute,
  timeHour,
  utcHour,
  timeDay,
  utcDay,
  timeWeek,
  utcWeek,
  timeSunday,
  utcSunday,
  timeMonday,
  utcMonday,
  timeTuesday,
  utcTuesday,
  timeWednesday,
  utcWednesday,
  timeThursday,
  utcThursday,
  timeFriday,
  utcFriday,
  timeSaturday,
  utcSaturday,
  timeMonth,
  utcMonth,
  timeYear,
  utcYear
} from 'd3-time';

import { 
  curveBasis,
//curveBundle,
  curveCardinal,
  curveCatmullRom,
  curveMonotoneX,
  curveMonotoneY,
  curveNatural,
  curveStep,
  curveStepAfter,
  curveStepBefore,
  symbolCircle,
  symbolCross,
  symbolDiamond,
  symbolSquare,
  symbolStar,
  symbolTriangle,
  symbolWye
} from 'd3-shape';


import { html as svg } from '@redsift/d3-rs-svg';
import { svg as legends } from '@redsift/d3-rs-legends';
import { units, time } from '@redsift/d3-rs-intl';
import { tip } from '@redsift/d3-rs-tip';
import { 
  presentation10 as presentation10,
  display as display
} from '@redsift/d3-rs-theme';

const intervals = {
  timeMillisecond: [timeMillisecond, 1],
  timeTnMillisecond: [timeMillisecond, 10],
  timeHnMillisecond: [timeMillisecond, 100],
  utcMillisecond: [utcMillisecond, 1],
  utcTnMillisecond: [utcMillisecond, 10],
  utcHnMillisecond: [utcMillisecond, 100],
  timeSecond: [timeSecond, 1],
  timeTnSecond: [timeSecond, 10],
  utcSecond: [utcSecond, 1],
  utcTnSecond: [utcSecond, 10],
  timeMinute: [timeMinute, 1],
  utcMinute: [utcMinute, 1],
  timeHour: [timeHour, 1],
  utcHour: [utcHour, 1],
  timeDay: [timeDay, 1],
  timeBiDay: [timeDay, 2],  
  utcDay: [utcDay, 1],
  utcBiDay: [utcDay, 2],
  timeSunday: [timeSunday, 1],
  utcSunday: [utcSunday, 1],
  timeMonday: [timeMonday, 1],
  utcMonday: [utcMonday, 1],
  timeTuesday: [timeTuesday, 1],
  utcTuesday: [utcTuesday, 1],
  timeWednesday: [timeWednesday, 1],
  utcWednesday: [utcWednesday, 1],
  timeThursday: [timeThursday, 1],
  utcThursday: [utcThursday, 1],
  timeFriday: [timeFriday, 1],
  utcFriday: [utcFriday, 1],
  timeSaturday: [timeSaturday, 1],
  utcSaturday: [utcSaturday, 1],
  timeWeek: [timeWeek, 1],
  timeBiWeek: [timeWeek, 2],
  utcWeek: [utcWeek, 1],
  utcBiWeek: [utcWeek, 2],
  timeMonth: [timeMonth, 1],
  timeBiMonth: [timeMonth, 2],
  timeQtMonth: [timeMonth, 3],
  utcMonth: [utcMonth, 1],
  utcBiMonth: [utcMonth, 2],
  utcTrMonth: [utcMonth, 3],
  timeYear: [timeYear, 1],
  timeBiYear: [timeYear, 2],
  timeDecade: [timeYear, 10],
  utcYear: [utcYear, 1],
  utcBiYear: [utcYear, 2],
  utcDecade: [utcYear, 10]
};

const curves = {
  curveBasis: curveBasis,
//curveBundle: curveBundle, -- does not support area
  curveCardinal: curveCardinal,
  curveCatmullRom: curveCatmullRom,
  curveMonotoneX: curveMonotoneX,
  curveMonotoneY: curveMonotoneY,
  curveNatural: curveNatural, 
  curveStep: curveStep,
  curveStepAfter: curveStepAfter,
  curveStepBefore: curveStepBefore
};

const symbols = {
  symbolCircle: symbolCircle,
  symbolCross: symbolCross,
  symbolDiamond: symbolDiamond,
  symbolSquare: symbolSquare,
  symbolStar: symbolStar,
  symbolTriangle: symbolTriangle,
  symbolWye: symbolWye  
}


const DEFAULT_SIZE = 420;
const DEFAULT_ASPECT = 160 / 420;
const DEFAULT_MARGIN = 26;  // white space
const DEFAULT_INSET = 24;   // scale space
const DEFAULT_TICK_COUNT = 4;
const DEFAULT_SYMBOL_SIZE = 32;
const DEFAULT_SCALE = 42; // why not
const DEFAULT_AXIS_PADDING = 8;

// Font fallback chosen to keep presentation on places like GitHub where Content Security Policy prevents inline SRC
const DEFAULT_STYLE = [ "@import url(https://fonts.googleapis.com/css?family=Source+Code+Pro:300,500);",
                        ".axis text{ font-family: 'Source Code Pro', Consolas, 'Liberation Mono', Menlo, Courier, monospace; font-weight: 300; fill: " + display.text.black + "; }",
                        ".voronoi text{ font-size: 14px; font-family: 'Source Code Pro', Consolas, 'Liberation Mono', Menlo, Courier, monospace; font-weight: 500 }",
                        ".chart-legends text{ font-size: 14px; font-family: 'Source Code Pro', Consolas, 'Liberation Mono', Menlo, Courier, monospace; font-weight: 300; fill: " + display.text.black + "; }",
                        ".axis path, .axis line { fill: none; stroke: " + display.lines.seperator + "; shape-rendering: crispEdges; }",
                        "g.axis-v path { stroke: none }",
                        "g.axis-i path, g.axis-i g.tick line { stroke-width: 1.0px; stroke: " + display.text.black + " }",
                        "line { stroke-width: 1.5px }",
                        "line.grid, g.axis-i g.tick line.grid { stroke-width: 2.0px; stroke-dasharray: 2,2; stroke: " + display.lines.seperator + " }",
                        ".legend text { font-size: 12px }",
                        "path.stroke { stroke-width: 2.5px }",
                        "path.area { opacity: 0.33 }",
                        ".voronoi path { stroke: none }",
                        ".highlight { opacity: 0.66 }",
                        ".highlight text { font-size: 12px }"
                      ].join(' \n');

/*
                        "path.series-0 { stroke: red }",
                        "path.series-1 { stroke: green }",
                        "path.series-2 { stroke: orange }",
                        "path.series-3 { stroke: grey }" 
                        */

export default function lines(id) {
  let classed = 'chart-lines', 
      theme = 'light',
      background = null,
      width = DEFAULT_SIZE,
      height = null,
      margin = DEFAULT_MARGIN,
      style = DEFAULT_STYLE,
      scale = 1.0,
      logValue = 0,
      minValue = null,
      maxValue = null,
      minIndex = null,
      maxIndex = null,
      inset = null,
      tickFormatValue = null,
      tickFormatIndex = null,
      tickDisplayValue = null,
      tickDisplayIndex = null,
      tickCountValue = DEFAULT_TICK_COUNT,
      tickCountIndex = null,
      niceValue = true,
      niceIndex = true,
      gridValue = true,
      gridIndex = false,
      fillArea = true,
      language = null,
      axisValue = 'left',
      legendOrientation = 'bottom',
      axisPaddingIndex = DEFAULT_AXIS_PADDING,
      axisPaddingValue = DEFAULT_AXIS_PADDING,
      legend = [ ],
      fill = null,
      labelTime = null,
      curve = curveCatmullRom.alpha(0),
      psymbol = [ ],
      symbolSize = DEFAULT_SYMBOL_SIZE,
      highlight = [ ],
      displayTip = -1,
      value = function (d, i, notArray) {
        if (Array.isArray(d)) {
          return d;
        }
        if (typeof d === 'object') {
          i = (d.l === undefined) ? i : d.l;
          d = d.v;
        }

        return [ i, (notArray === true || Array.isArray(d)) ? d : [ d ] ];
      };

  // [ [ [i1,v1], [i1,v1] ], [ [i2,v2] ... ], ... ]
  function _flatArrays(a) {
      let maxD = max(a, d => d[1].length);
      let result = [];
      
      for (let i=0; i<maxD; ++i) {
        let v = a.map(function (d) {
          if (i === 0) {
            return [ d[0], Array.isArray(d[1]) ? d[1][i] : d[1] ]
          }
          
          if (Array.isArray(d[1]) && d[1].length > i) return [ d[0], d[1][i] ]
          
          return null;
        });
        result.push(v.filter(d => d !== null)); 
      }      
      
      return result;
  }
    
  function _coerceArray(d) {
    if (d == null) {
      return [];
    }
    
    if (!Array.isArray(d)) {
        return [ d ];
    }
    
    return d;
  }
  
  function _map(map) {
    return function (c) {
      if (c == null) return null;
      // TODO: does not seem to behave
      if (typeof c === 'string') {
        return map[c];
      }
      return c;
    }
  }
  
  let _mapCurve = _map(curves);
  let _mapSymbols = _map(symbols);
  let _mapIntervalTickCount = _map(intervals);
 
  function _makeFillFn() {
    let colors = () => fill;
    if (fill == null) {
      let c = presentation10.standard;
      colors = (d, i) => (c[i % c.length]);
    } else if (typeof fill === 'function') {
      colors = fill;
    } else if (Array.isArray(fill)) {
      colors = (d, i) => fill[ i % fill.length ];
    }
    return colors;  
  }  
  
  function _impl(context) {
    let selection = context.selection ? context.selection() : context,
        transition = (context.selection !== undefined);
   
    formatDefaultLocale(units(language).d3);
    timeFormatDefaultLocale(time(language).d3);
      
    selection.each(function() {
      let node = select(this);  
      let sh = height || Math.round(width * DEFAULT_ASPECT);
      
      // SVG element
      let sid = null;
      if (id) sid = 'svg-' + id;
      let root = svg(sid).width(width).height(sh).margin(margin).scale(scale);
      let tnode = node;
      if (transition === true) {
        tnode = node.transition(context);
      }
      tnode.call(root);
      
      let elmS = node.select(root.self()).select(root.child());

      // Tip
      let tid = null;
      if (id) tid = 'tip-' + id;
      let rtip = tip(tid).html((d) => d);
      let st = style + ' ' + rtip.style();
      rtip.style(st);
      elmS.call(rtip);
      
      let _inset = inset;
      if (_inset == null) {
        _inset = { top: 0, bottom: DEFAULT_INSET, left: 0, right: 0 };
        if (axisValue === 'left') {
          _inset.left = DEFAULT_INSET;
        } else {
          _inset.right = DEFAULT_INSET;
        }
      } else if (typeof _inset === 'object') {
        _inset = { top: _inset.top, bottom: _inset.bottom, left: _inset.left, right: _inset.right };
      } else {
        _inset = { top: _inset, bottom: _inset, left: _inset, right: _inset };
      }     
    
      // Create required elements
      let g = elmS.select(_impl.self())
      if (g.empty()) {
        g = elmS.append('g').attr('class', classed).attr('id', id);
        g.append('g').attr('class', 'axis-v axis');
        g.append('g').attr('class', 'axis-i axis');
        g.append('g').attr('class', 'legend');
        g.append('g').attr('class', 'lines');
        g.append('g').attr('class', 'voronoi');
      }

      let data = g.datum() || [];
      
      if (!Array.isArray(data)) {
        data = [ data ];
      }
      
      if (data.length > 0) {
        if (Array.isArray(data[0])) {
          data = data.map(a => a.map((d, i) => value(d,i, true)));
        } else {
          data = _flatArrays(data.map((d, i) => value(d, i, false)));          
        }
      }

      g.datum(data); // this rebind is required even though there is a following select

      let minV = minValue;
      if (minV == null) {
        minV = min(data, d => min(d, d1 => d1[1]));
        if (minV > 0) {
          minV = logValue === 0 ? 0 : 1;
        }
      }
            
      let maxV = maxValue;
      if (maxV == null) {
        maxV = max(data, d => max(d, d1 => d1[1]));
      }
      
      let minI = minIndex;
      if (minI == null) {
        minI = min(data, d => min(d, d1 => d1[0]));
      }
      if (minI == null) minI = 0;
      
      let maxI = maxIndex;
      if (maxI == null) {
        maxI = max(data, d => max(d, d1 => d1[0]));
      }
      if (maxI == null) maxI = DEFAULT_SCALE;
                       
      let w = root.childWidth(),
          h = root.childHeight();
      
      // Create the legend
      if (legend.length > 0 && legendOrientation !== 'voronoi') {
        let lchart = legends().width(w).height(h).inset(0).fill(fill).orientation(legendOrientation);

        _inset = lchart.childInset(_inset);

        elmS.datum(legend).call(lchart);
      }            
      
      let sV = scaleLinear(); 
      if (logValue > 0) sV = scaleLog().base(logValue);
      let scaleV = sV.domain([ minV, maxV ]).range([ h - _inset.bottom, _inset.top ]);
      if (niceValue === true) {
        scaleV = scaleV.nice();
      }
            
      let sI = scaleLinear(); 
      if (labelTime != null) sI = scaleTime();
      let domainI = [ minI, maxI ];
      let scaleI = sI.domain(domainI).range([ _inset.left, w - _inset.right ]);
      if (niceIndex === true) {
        scaleI = scaleI.nice();
      }

      let formatValue = tickFormatValue;
      if (logValue > 0 && formatValue == null) {
        formatValue = '.0r';
      }        
      
      let axis = (axisValue === 'left') ? axisLeft : axisRight;
          
      let aV = axis(scaleV)
                  .tickPadding(axisPaddingValue)
                  .ticks(tickCountValue, (formatValue == null ? scaleV.tickFormat(tickCountValue) : formatValue));
      if (gridValue === true) {
        aV.tickSizeInner((_inset.left + _inset.right) - w);
      }
      if (tickDisplayValue) {
        aV.tickFormat(tickDisplayValue);
      }

      let axisTranslate = (axisValue === 'left') ? _inset.left : w - _inset.right;
      g.select('g.axis-v')
        .attr('transform', 'translate(' + axisTranslate + ',0)')
        .call(aV)
        .selectAll('line')
          .attr('class', gridValue ? 'grid' : null);

      let aI = axisBottom(scaleI).tickPadding(axisPaddingIndex);
      if (labelTime != null) {
        let freq = _mapIntervalTickCount(tickCountIndex);
        if (freq != null) {
          aI = aI.tickArguments(freq);
        }
        if (typeof labelTime === 'function') {
          aI.tickFormat(labelTime);          
        } else {
          aI.tickFormat(timeFormat(labelTime));          
        }
      } else {
        aI = aI.ticks(tickCountIndex, (tickFormatIndex == null ? scaleI.tickFormat(tickCountIndex) : tickFormatIndex));
      }
      if (gridIndex === true) {
        aI.tickSizeInner((_inset.top + _inset.bottom) - h);
      }  
      if (tickDisplayIndex != null) {
        aI.tickFormat(tickDisplayIndex);
      }   
      
      g.select('g.axis-i')
        .attr('transform', 'translate(0,' + (h - _inset.bottom) + ')')
        .call(aI)
        .selectAll('line')
          .attr('class', gridIndex ? 'grid' : null);  
          
      let lines = line()
        .x(d => scaleI(d[0]))
        .y(d => scaleV(d[1]));
      
      let areas = area()
          .x(d => scaleI(d[0]))
          .y0(h)
          .y1(d => scaleV(d[1]));      
      
      let cv = _mapCurve(curve);
      if (cv != null) {  
        lines.curve(cv);  
        areas.curve(cv);
      }
      
      let colors = _makeFillFn();
   
      let uS = psymbol.map(_mapSymbols).map(s => s != null ? symbol().type(s).size(symbolSize) : null);
      let sym = data.map((d, i) => i < uS.length ? uS[i] : null).map(d => d !== null ? d : null);
            
      let elmL = g.select('g.lines');

      let elmG = elmL.selectAll('g.line').data(data);
      elmG.exit().remove();
      let elmGNew = elmG.enter().append('g').attr('class', 'line');
      elmGNew.append('path').attr('class', 'area').attr('stroke', 'none');
      elmGNew.append('path').attr('class', 'stroke').attr('fill', 'none');
      elmGNew.append('g').attr('class', 'symbols');
      elmG = elmG.merge(elmGNew);
      
      let elmArea = elmL.selectAll('path.area').data(data.map((d) => fillArea === true ? d : []));
      elmArea.attr('d', areas)
              .attr('fill', colors);   

      let elmStroke = elmL.selectAll('path.stroke').data(data);
      elmStroke.attr('d', lines)
                .attr('stroke', colors);     

      let eS = elmG.select('g.symbols').selectAll('path').data((d, i) => sym[i] != null ? d.map(function (v) { return { v : v, i : i }; }) : []);
      eS.exit().remove();
      eS = eS.enter().append('path').merge(eS);
      eS.attr('transform', d => 'translate('+scaleI(d.v[0])+','+scaleV(d.v[1])+')')
        .attr('d', (d) => sym[d.i](d.v, d.i))
        .attr('fill', d => colors(d.v, d.i))
        .attr('stroke', 'none');  
      
      let indexs = [];
      function seriesFor(v) {
        for (let i=0; i<indexs.length; ++i) {
          if (v < indexs[i]) return i - 1;
        }
        
        return indexs.length - 1;
      }
      let flat = data.reduce((p, a) => (indexs.push(p.length), p.concat(a)), []);
      let overlay = voronoi()
                    .x(d => scaleI(d[0]))
                    .y(d => scaleV(d[1]))
                    .extent([ [ _inset.left, _inset.top ], [ w - _inset.right, h - _inset.bottom ] ])
                    .polygons(flat);
      
      const centerI = (scaleI.range()[1] - scaleI.range()[0]) / 2;
      const UNIT_TO_RAD = Math.PI / 2;

      // larger number, more suitable polygon
      // the more central (in x), the more suitable
      function polygonSuitability(d) {
        let centraility = Math.cos(UNIT_TO_RAD * Math.abs(centerI - polygonCentroid(d)[0]) / centerI);
        return polygonArea(d) * centraility;
      }
                
      let vmesh = g.select('g.voronoi').selectAll('path').data(overlay);
      vmesh.exit().remove();
      vmesh = vmesh.enter().append('path')
              .attr('fill', 'none')
              .style('pointer-events', 'all');
              
      vmesh.attr('d', d => 'M' + d.join('L') + 'Z')
          .attr('class', (d, i) => 'series-' + seriesFor(i));

// highlight selected entry
//            .attr('fill', (d, i) => (candidates.indexOf(i) === -1) ? 'none' : 'red')
        
      let labels = []; 

      if (legendOrientation === 'voronoi') {
        let candidates = nest()
                    .key(d => d.s)
                    .sortValues((a,b) => descending(a.a, b.a))
                    .entries(overlay.map((d, i) => ({ a: polygonSuitability(d), s: seriesFor(i), i: i })))
                    .map(d => d.values[0].i);  
                          
        labels = candidates.map(i => polygonCentroid(overlay[i]));
      }
      
      let vlabels = g.select('g.voronoi').selectAll('text').data(labels);
      vlabels.exit().remove();
      vlabels = vlabels.enter().append('text')            
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'central');
      
      vlabels.attr('x', d => d[0])
            .attr('y', d => d[1])
            .attr('fill', colors)
            .text((d, i) => i < legend.length ? legend[i] : '');
    });
    
  }
  
  _impl.self = function() { return 'g' + (id ?  '#' + id : '.' + classed); }

  _impl.id = function() {
    return id;
  };
    
  _impl.classed = function(value) {
    return arguments.length ? (classed = value, _impl) : classed;
  };
    
  _impl.background = function(value) {
    return arguments.length ? (background = value, _impl) : background;
  };

  _impl.theme = function(value) {
    return arguments.length ? (theme = value, _impl) : theme;
  };  

  _impl.size = function(value) {
    return arguments.length ? (width = value, height = null, _impl) : width;
  };
    
  _impl.width = function(value) {
    return arguments.length ? (width = value, _impl) : width;
  };  

  _impl.height = function(value) {
    return arguments.length ? (height = value, _impl) : height;
  }; 

  _impl.scale = function(value) {
    return arguments.length ? (scale = value, _impl) : scale;
  }; 

  _impl.margin = function(value) {
    return arguments.length ? (margin = value, _impl) : margin;
  };   

  _impl.logValue = function(value) {
    return arguments.length ? (logValue = value, _impl) : logValue;
  }; 

  _impl.minValue = function(value) {
    return arguments.length ? (minValue = value, _impl) : minValue;
  };  

  _impl.maxValue = function(value) {
    return arguments.length ? (maxValue = value, _impl) : maxValue;
  };  

  _impl.minIndex = function(value) {
    return arguments.length ? (minIndex = value, _impl) : minIndex;
  };  

  _impl.maxIndex = function(value) {
    return arguments.length ? (maxIndex = value, _impl) : maxIndex;
  };  

  _impl.inset = function(value) {
    return arguments.length ? (inset = value, _impl) : inset;
  };  

  _impl.tickFormatValue = function(value) {
    return arguments.length ? (tickFormatValue = value, _impl) : tickFormatValue;
  };  
  
  _impl.tickFormatIndex = function(value) {
    return arguments.length ? (tickFormatIndex = value, _impl) : tickFormatIndex;
  };   

  _impl.tickDisplayValue = function(value) {
    return arguments.length ? (tickDisplayValue = value, _impl) : tickDisplayValue;
  };    

  _impl.tickDisplayIndex = function(value) {
    return arguments.length ? (tickDisplayIndex = value, _impl) : tickDisplayIndex;
  };   

  _impl.style = function(value) {
    return arguments.length ? (style = value, _impl) : style;
  }; 
  
  _impl.value = function(valuep) {
    return arguments.length ? (value = valuep, _impl) : value;
  };
  
  _impl.language = function(value) {
    return arguments.length ? (language = value, _impl) : language;
  };   
  
  _impl.legend = function(value) {
    return arguments.length ? (legend = _coerceArray(value), _impl) : legend;
  }; 
   
  _impl.labelTime = function(value) {
    return arguments.length ? (labelTime = value, _impl) : labelTime;
  };   
  
  _impl.tickCountValue = function(value) {
    return arguments.length ? (tickCountValue = value, _impl) : tickCountValue;
  }; 
   
  _impl.tickCountIndex = function(value) {
    return arguments.length ? (tickCountIndex = value, _impl) : tickCountIndex;
  };     
  
  _impl.displayTip = function(value) {
    return arguments.length ? (displayTip = value, _impl) : displayTip;
  };   
  
  _impl.highlight = function(value) {
    return arguments.length ? (highlight = _coerceArray(value), _impl) : highlight;
  };    

  _impl.gridValue = function(value) {
    return arguments.length ? (gridValue = value, _impl) : gridValue;
  };     

  _impl.gridIndex = function(value) {
    return arguments.length ? (gridIndex = value, _impl) : gridIndex;
  };    

  _impl.niceValue = function(value) {
    return arguments.length ? (niceValue = value, _impl) : niceValue;
  };     

  _impl.niceIndex = function(value) {
    return arguments.length ? (niceIndex = value, _impl) : niceIndex;
  }; 

  _impl.curve = function(value) {
    return arguments.length ? (curve = value, _impl) : curve;
  }; 
  
  _impl.symbol = function(value) {
    return arguments.length ? (psymbol = _coerceArray(value), _impl) : psymbol;
  };   

  _impl.symbolSize = function(value) {
    return arguments.length ? (symbolSize = value, _impl) : symbolSize;
  };    
  
  _impl.fill = function(value) {
    return arguments.length ? (fill = value, _impl) : fill;
  };    

  _impl.fillArea = function(value) {
    return arguments.length ? (fillArea = value, _impl) : fillArea;
  };              
  
  _impl.axisValue = function(value) {
    return arguments.length ? (axisValue = value, _impl) : axisValue;
  };    

  _impl.axisPaddingIndex = function(value) {
    return arguments.length ? (axisPaddingIndex = value, _impl) : axisPaddingIndex;
  };   
  
  _impl.axisPaddingValue = function(value) {
    return arguments.length ? (axisPaddingValue = value, _impl) : axisPaddingValue;
  };      
  
  _impl.legendOrientation = function(value) {
    return arguments.length ? (legendOrientation = value, _impl) : legendOrientation;
  };  
                  
              
  return _impl;
}