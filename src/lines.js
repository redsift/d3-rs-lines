
import { select } from 'd3-selection';
import { line, area, symbol, stack } from 'd3-shape';
import { max, min, descending } from 'd3-array';
import { scaleLinear, scaleLog, scaleTime } from 'd3-scale';
import { axisBottom, axisLeft, axisRight } from 'd3-axis';
import { timeFormat, timeFormatLocale, timeFormatDefaultLocale } from 'd3-time-format';
import { formatLocale, formatDefaultLocale } from 'd3-format';
import { voronoi } from 'd3-voronoi';
import { polygonArea, polygonCentroid } from 'd3-polygon';
import { nest } from 'd3-collection';

import {  
  stackOffsetExpand,
  stackOffsetNone,
  stackOffsetSilhouette,
  stackOffsetWiggle,
  stackOrderAscending,
  stackOrderDescending,
  stackOrderInsideOut,
  stackOrderNone,
  stackOrderReverse
} from 'd3-shape';

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
import { body as tip } from '@redsift/d3-rs-tip';
import { 
  presentation10,
  display,
  highlights,
  fonts,
  widths,
  dashes
} from '@redsift/d3-rs-theme';

export const intervals = {
  timeMillisecond: [timeMillisecond, 1],
  timeTnMillisecond: [timeMillisecond, 10],
  timeHnMillisecond: [timeMillisecond, 100],
  timeSecond: [timeSecond, 1],
  timeTnSecond: [timeSecond, 10],
  timeMinute: [timeMinute, 1],
  timeHour: [timeHour, 1],
  timeDay: [timeDay, 1],
  timeBiDay: [timeDay, 2],  
  timeSunday: [timeSunday, 1],
  timeMonday: [timeMonday, 1],
  timeTuesday: [timeTuesday, 1],
  timeWednesday: [timeWednesday, 1],
  timeThursday: [timeThursday, 1],
  timeFriday: [timeFriday, 1],
  timeSaturday: [timeSaturday, 1],
  timeWeek: [timeWeek, 1],
  timeBiWeek: [timeWeek, 2],
  timeMonth: [timeMonth, 1],
  timeBiMonth: [timeMonth, 2],
  timeQtYear: [timeMonth, 3],
  timeYear: [timeYear, 1],
  timeBiYear: [timeYear, 2],
  timeDecade: [timeYear, 10],
  utcMillisecond: [utcMillisecond, 1],
  utcTnMillisecond: [utcMillisecond, 10],
  utcHnMillisecond: [utcMillisecond, 100],
  utcSecond: [utcSecond, 1],
  utcTnSecond: [utcSecond, 10],
  utcMinute: [utcMinute, 1],
  utcHour: [utcHour, 1],
  utcDay: [utcDay, 1],
  utcBiDay: [utcDay, 2],
  utcSunday: [utcSunday, 1],
  utcMonday: [utcMonday, 1],
  utcTuesday: [utcTuesday, 1],
  utcWednesday: [utcWednesday, 1],
  utcThursday: [utcThursday, 1],
  utcFriday: [utcFriday, 1],
  utcSaturday: [utcSaturday, 1],
  utcWeek: [utcWeek, 1],
  utcBiWeek: [utcWeek, 2],
  utcMonth: [utcMonth, 1],
  utcBiMonth: [utcMonth, 2],
  utcQtYear: [utcMonth, 3],
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

const stackOffsets = {
  stackOffsetExpand: stackOffsetExpand,
  stackOffsetNone: stackOffsetNone,
  stackOffsetSilhouette: stackOffsetSilhouette,
  stackOffsetWiggle: stackOffsetWiggle  
}

const stackOrders = {
  stackOrderAscending: stackOrderAscending,
  stackOrderDescending: stackOrderDescending,
  stackOrderInsideOut: stackOrderInsideOut,
  stackOrderNone: stackOrderNone,
  stackOrderReverse: stackOrderReverse
}

// If localtime, the dates are assumed to be boundaries in localtime
export function timeMultiFormat(options, tf) {
  options = options || {};
  
  let format = null;
  
    
  let second = utcSecond,
      minute = utcMinute,
      hour = utcHour,
      day = utcDay,
      week = utcWeek,
      month = utcMonth,
      year = utcYear;
      
  if (options.localtime === true) {
    second = timeSecond;
    minute = timeMinute;
    hour = timeHour;
    day = timeDay;
    week = timeWeek;
    month = timeMonth;
    year = timeYear;  
  }

  return function (date) {
    // needs to done late to ensure the localisation is correct if it has been set
    if (format == null) {
      tf = tf || timeFormat;
      format = {};
      [ 
          [ 'millisecond',  '.%L' ],
          [ 'second',       ':%S' ],
          [ 'minute',       '%I:%M' ],
          [ 'hour',         '%I %p' ],
          [ 'day',          '%a %d' ],
          [ 'week',         '%b %d' ],
          [ 'month',        '%B' ],
          [ 'year',         '%Y' ]
        ].forEach(function (e) {
          let opt = options[e[0]];
          if (opt == null) {
            format[e[0]] = tf(e[1]);
          } else if (typeof opt === 'function') {
            format[e[0]] = opt;
          } else {
            format[e[0]] = tf(opt);
          }
        });      
    }
    
    
    return (second(date) < date ? format.millisecond
        : minute(date) < date ? format.second
        : hour(date) < date ? format.minute
        : day(date) < date ? format.hour
        : month(date) < date ? (week(date) < date ? format.day : format.week)
        : year(date) < date ? format.month 
        : format.year)(date);
  }
}


const DEFAULT_SIZE = 420;
const DEFAULT_ASPECT = 160 / 420;
const DEFAULT_MARGIN = 26;  // white space
const DEFAULT_INSET = 24;   // scale space
const DEFAULT_TICK_COUNT_INDEX = 6;
const DEFAULT_TICK_COUNT_VALUE = Math.ceil(DEFAULT_TICK_COUNT_INDEX * DEFAULT_ASPECT);
const DEFAULT_SYMBOL_SIZE = 32;
const DEFAULT_SCALE = 42; // why not
const DEFAULT_AXIS_PADDING = 8;
const DEFAULT_MAJOR_TICK_SIZE = 8;
const DEFAULT_MINOR_TICK_SIZE = 4;
const DEFAULT_TIP_CIRCLE_SIZE = 4;
const DEFAULT_TIP_OFFSET = 4;
const DEFAULT_HIGHLIGHT_PADDING = 4;

export default function lines(id) {
  let classed = 'chart-lines', 
      theme = 'light',
      background = undefined,
      width = DEFAULT_SIZE,
      height = null,
      margin = DEFAULT_MARGIN,
      style = undefined,
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
      tickCountValue = DEFAULT_TICK_COUNT_VALUE,
      tickCountIndex = DEFAULT_TICK_COUNT_INDEX,
      tickMinorValue = null,
      tickMinorIndex = null,
      niceValue = true,
      niceIndex = true,
      gridValue = true,
      gridIndex = false,
      fillOpacity = null,
      fillArea = null,
      fillStroke = null,
      language = null,
      stacked = null,
      stackOrder = stackOrderNone, 
      stackOffset = stackOffsetNone,
      voronoiAttraction = 0.33,
      highlightIndex = [],
      animateAxis = true,
      animateLabels = true,
      axisValue = 'left',
      axisDisplayIndex = true,
      axisDisplayValue = false,
      animation = null,
      tipHtml = null,
      importFonts = true,
      trim = null,
      _ptrim = null,
      legendOrientation = 'bottom',
      axisPaddingIndex = DEFAULT_AXIS_PADDING,
      axisPaddingValue = DEFAULT_AXIS_PADDING,
      legend = [ ],
      legendsEnabled = [ ],
      legendIsToggleable = false,
      tintColor = '#000',
      fill = null,
      labelTime = null,
      curve = curveCatmullRom.alpha(0),
      psymbol = [ ],
      symbolSize = DEFAULT_SYMBOL_SIZE,
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
      
  let tid = null;
  if (id) tid = 'tip-' + id;
  let rtip = tip(tid).offset([- DEFAULT_TIP_CIRCLE_SIZE - DEFAULT_TIP_OFFSET, 0]).style(null);
      
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

      if (typeof c === 'string') {
        return map[c];
      }

      return c;
    }
  }
  
  let _mapCurve = _map(curves);
  let _mapSymbols = _map(symbols);
  let _fnIntervals = _map(intervals);

  let _mapStackOffset = _map(stackOffsets);
  let _mapStackOrder = _map(stackOrders);
    
  let _mapIntervalTickCount = function (c) {
    
    let o = _fnIntervals(c);
    if (o == null) {
      return [];
    }
    
    if (!Array.isArray(o)) {
      return [ c ];  
    }
    
    return o;
  }
  
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
        
    let localeFormat = units(language).d3;
    formatDefaultLocale(localeFormat);

    let localeTime = time(language).d3;
    timeFormatDefaultLocale(localeTime);

      
   let _fillOpacity = fillOpacity,
      _fillArea = fillArea,
      _fillStroke = fillStroke;
    
    if (stacked !== null && stacked !== false) {
      if (_fillOpacity == null) _fillOpacity = 1.0;
      if (_fillArea == null) _fillArea = true;
      if (_fillStroke == null) _fillStroke = false;      
    } else {
      if (_fillOpacity == null) _fillOpacity = display[theme].fillOpacity;
      if (_fillArea == null) _fillArea = true;
      if (_fillStroke == null) _fillStroke = true;         
    }
    
    let _background = background;
    if (_background === undefined) {
      _background = display[theme].background;
    }
      
    selection.each(function() {

      let node = select(this);  
      let sh = height || Math.round(width * DEFAULT_ASPECT);
      
      // SVG element
      let sid = null;
      if (id) sid = 'svg-' + id;
      let root = svg(sid).width(width).height(sh).margin(margin).scale(scale).background(_background);
      let tnode = node;
      if (transition === true) {
        tnode = node.transition(context);
      }
      tnode.call(root);
      
      let snode = node.select(root.self());
      
      let pid = 'highlight-fill';
      if (id) pid = pid + '-' + id;
      let pattern = highlights(pid);
//      TODO: Could expose the colors for customization      
//      pattern.foreground(display[theme].highlight);
//      pattern.background('transparent');      
      snode.call(pattern);   
            
      let elmS = snode.select(root.child());

      let _inset = inset;
      if (_inset == null) {
        _inset = { top: 0, bottom: DEFAULT_INSET + DEFAULT_MAJOR_TICK_SIZE, left: 0, right: 0 };
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
      
      let cid = id != null ? 'clip-' + id : 'clip';
      
      // Create required elements
      let g = elmS.select(_impl.self())
      if (g.empty()) {
        g = elmS.append('g').attr('class', classed).attr('id', id);
        g.append('g').attr('class', 'axis-v-minor axis');
        g.append('g').attr('class', 'axis-v axis');
        g.append('g').attr('class', 'axis-i-minor axis');
        g.append('g').attr('class', 'axis-i axis');
        g.append('g').attr('class', 'legend');
        g.append('g').attr('class', 'lines');

        g.append('g').attr('class', 'highlight-v highlight');
        g.append('g').attr('class', 'highlight-i highlight');
        
        g.append('g').attr('class', 'voronoi');
        
        g.append('clipPath').attr('id', cid).append('rect');
      }
      g.selectAll('circle.tip').remove();


      let data = g.datum() || [];

      let _mapData = function(option, arr = data) {
        if (!Array.isArray(option)) {
          return arr.map(d => option === true ?
              trim == null ? d : d.slice(0, trim)
              : []);
        } else {
          return arr.map(function (d, i) {
            if (i < option.length) {
              return option[i] === true ?
                  trim == null ? d : d.slice(0, trim)
                  : [];
            }
            return [];
          });
        }
      }

      if (!Array.isArray(data)) {
        data = [ data ];
      }

      function draw(initialDrawing) {
        let _data = data.map(item => Object.assign(
              {},
              item,
              {v: item.v.map((v, idx) => legendsEnabled.includes(idx) ? v : null)}
            )
        );
        if (_data.length > 0) {
          if (stacked !== null && stacked !== false) {
            let stacker = stack();

            if (stacked === true) {
              let maxD = max(_data, d => d.v.length);

              stacker.keys(Array.from(Array(maxD).keys())).value((d,k) => d.v[k] != null ? d.v[k] : 0);
            } else {
              stacker.keys(stacked);
            }

            let _stackOrder = _mapStackOrder(stackOrder);
            if (_stackOrder != null) stacker.order(_stackOrder);

            let _stackOffset = _mapStackOffset(stackOffset);
            if (_stackOffset != null) stacker.offset(_stackOffset);

            _data = stacker(_data).map(s => s.map(v => [ v.data.l, v ]));

          } else if (Array.isArray(_data[0])) {
            _data = _data.map(a => a.map((d, i) => value(d, i, true))).map(s => s.map(e => [ e[0], [ 0, e[1] ] ]) );
          } else {
            _data = _flatArrays(_data.map((d, i) => value(d, i, false))).map(s => s.map(e => [ e[0], [ 0, e[1] ] ]) );
          }
        }

        let fdata = _mapData(_fillArea, _data);

        let sdata = _mapData(_fillStroke, _data);

        let _curve = _data.map(function (d, i) {
          if (!Array.isArray(curve)) {
            return _mapCurve(curve);
          }
          if (i < curve.length) {
            return _mapCurve(curve[i]);
          }
          return null;
        });

        g.datum(_data); // this rebind is required even though there is a following select

        let minV = minValue;
        if (minV == null) {
          minV = min(_data, d => min(d, d1 => min(d1[1]) ));
          if (minV > 0) {
            minV = logValue === 0 ? 0 : 1;
          } else if (logValue > 0 && minV < 1) {
            minV = 1;
          }
        }

        let maxV = maxValue;
        if (maxV == null) {
          maxV = max(_data, d => max(d, d1 => max(d1[1]) ));
        }

        let minI = minIndex;
        if (minI == null) {
          minI = min(_data, d => min(d, d1 => d1[0]));
        }
        if (minI == null) minI = 0;

        let maxI = maxIndex;
        if (maxI == null) {
          maxI = max(_data, d => max(d, d1 => d1[0]));
        }
        if (maxI == null) maxI = DEFAULT_SCALE;

        let w = root.childWidth(),
            h = root.childHeight();

        let colors = _makeFillFn();

        // Create the legend
        let lchart = null;
        if (legend.length > 0 && legendOrientation !== 'voronoi') {
          let lid = null;
          if (id) lid = `legend-${id}`;
          lchart = legends(lid)
              .width(w)
              .height(h)
              .style(null)
              .margin(0)
              .inset(0)
              .fill(colors)
              .theme(theme)
              .orientation(legendOrientation)
              .toggleable(legendIsToggleable)
              .onEnabledLegendItemsChange(enabledLegendItems => {
                legendsEnabled = enabledLegendItems;
                draw(false);
              })
              .tintColor(tintColor)
          ;

          if (initialDrawing) _inset = lchart.childInset(_inset);
          elmS.datum(legend).call(lchart);
        }

        // margin is a bit of a hack but don't trim the top
        let marginTop = margin.top !== undefined ? margin.top : margin;
        g.select('#' + cid).select('rect')
            .attr('x', _inset.left)
            .attr('y', -(_inset.top + marginTop))
            .attr('width', w - _inset.right - _inset.left)
            .attr('height', h - _inset.bottom + _inset.top + marginTop);

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
        } else {
          aV.tickSizeInner(DEFAULT_MAJOR_TICK_SIZE);
        }
        if (tickDisplayValue) {
          aV.tickFormat(tickDisplayValue);
        }

        let aVMinor = null;
        if (tickMinorValue !== null) {
          aVMinor = axis(scaleV).ticks(tickMinorValue).tickSizeInner(DEFAULT_MINOR_TICK_SIZE).tickFormat(() => undefined);
        }
        let axisTranslate = (axisValue === 'left') ? _inset.left : w - _inset.right;
        let gAxisV = g.select('g.axis-v')
            .attr('transform', 'translate(' + axisTranslate + ',0)');
        let gAxisVMinor = g.select('g.axis-v-minor')
            .attr('transform', 'translate(' + axisTranslate + ',0)');

        let aI = axisBottom(scaleI).tickPadding(axisPaddingIndex);

        if (labelTime != null) {
          let freq = _mapIntervalTickCount(tickCountIndex);
          if (freq != null) {
            aI = aI.tickArguments(freq);
          }
          if (typeof labelTime === 'function') {
            aI.tickFormat(labelTime);
          } else if (labelTime === 'multi') {
            aI.tickFormat(timeMultiFormat());
          }  else if (labelTime === 'multi-local') {
            aI.tickFormat(timeMultiFormat({ localtime: true }));
          } else {
            aI.tickFormat(timeFormat(labelTime));
          }
        } else {
          aI = aI.ticks(tickCountIndex, (tickFormatIndex == null ? scaleI.tickFormat(tickCountIndex) : tickFormatIndex));
        }
        if (gridIndex === true) {
          aI.tickSizeInner((_inset.top + _inset.bottom) - h);
        } else {
          aI.tickSizeInner(DEFAULT_MAJOR_TICK_SIZE);
        }
        if (tickDisplayIndex != null) {
          aI.tickFormat(tickDisplayIndex);
        }

        let aIMinor = null;
        if (tickMinorIndex !== null) {
          let density = [ tickMinorIndex ];
          if (labelTime != null) {
            density = _mapIntervalTickCount(tickMinorIndex);
          }
          aIMinor = axisBottom(scaleI).tickArguments(density).tickSizeInner(DEFAULT_MINOR_TICK_SIZE).tickFormat(() => undefined);
        }

        let gAxisI = g.select('g.axis-i')
            .attr('transform', 'translate(0,' + (h - _inset.bottom) + ')');

        let gAxisIMinor = g.select('g.axis-i-minor')
            .attr('transform', 'translate(0,' + (h - _inset.bottom) + ')');

        if (transition === true && animateAxis === true) {
          gAxisVMinor = gAxisVMinor.transition(context);
          gAxisIMinor = gAxisIMinor.transition(context);
          gAxisV = gAxisV.transition(context);
          gAxisI = gAxisI.transition(context);
        }

        if (aIMinor !== null) {
          gAxisIMinor.call(aIMinor);
        } else {
          gAxisIMinor.selectAll('*').remove();
        }

        if (aVMinor !== null) {
          gAxisVMinor.call(aVMinor);
        } else {
          gAxisVMinor.selectAll('*').remove();
        }

        gAxisV.call(aV)
            .selectAll('line')
            .attr('class', (d, i) => gridValue ? i === 0 ? 'grid first' : 'grid' : null);

        gAxisI.call(aI)
            .selectAll('line')
            .attr('class', (d, i) => gridIndex ? i === 0 ? 'grid first' : 'grid' : null);

        const safeScaleV = (v) => (logValue > 0 && v < 1) ? scaleV.range()[0] : scaleV(v);

        // Note: A lot of scaleI, scaleV calls.
        let lines = line()
            .x(d => scaleI(d[0]))
            .y(d => safeScaleV(d[1][1]));
        // These can be truncated .defined(d => scaleI(d[0]) <= (w - _inset.right) && scaleV(d[1][1]) >= _inset.top);

        let areas = area()
            .x(d => scaleI(d[0]))
            .y0(d => safeScaleV(d[1][0]) ) // bottom
            .y1(d => safeScaleV(d[1][1]) ); // top


        let uS = psymbol.map(_mapSymbols).map(s => s != null ? symbol().type(s).size(symbolSize) : null);
        let sym = _data.map((d, i) => i < uS.length ? uS[i] : null).map(d => d !== null ? d : null);

        let elmL = g.select('g.lines');

        let elmG = elmL.selectAll('g.line').data(_data);
        elmG.exit().remove();
        let elmGNew = elmG.enter().append('g').attr('class', 'line');
        elmGNew.append('path').attr('class', 'area').attr('stroke', 'none');
        elmGNew.append('path').attr('class', 'stroke').attr('fill', 'none');
        elmGNew.append('g').attr('class', 'symbols');
        elmG = elmG.merge(elmGNew);

        let elmArea = elmL.selectAll('path.area').data(fdata);
        let elmStroke = elmL.selectAll('path.stroke').data(sdata);

        // Add the clipping paths to ensure curves do not move outside
        // the graph area. Do this before the animation
        elmArea.attr('clip-path', `url(#${cid})`);
        elmStroke.attr('clip-path', `url(#${cid})`);

        if (transition === true) {
          elmArea = elmArea.transition(context);
          elmStroke = elmStroke.transition(context);
        }

        function revealInterpolation(tr, fn) {
          return function (d, i) {
            let ln = fn(i);
            if (tr == null) tr = 1;

            let interpolate = scaleLinear()
                .domain([0, 1])
                .range([tr, d.length + 1]);

            return function(t) {
              if (d.length == 0) return '';

              let flooredX = Math.floor(interpolate(t));

              let weight = interpolate(t) - flooredX;
              let interpolatedLine = d.slice(0, flooredX);

              if (flooredX > 0 && flooredX < d.length) {
                let wY0 = d[flooredX][1][0] * weight + d[flooredX-1][1][0] * (1.0 - weight);
                let wY1 = d[flooredX][1][1] * weight + d[flooredX-1][1][1] * (1.0 - weight);

                let wX = d[flooredX][0] * weight + d[flooredX-1][0] * (1.0 - weight);

                interpolatedLine.push([ wX, [ wY0, wY1 ] ]);
              }

              return ln(interpolatedLine);
            }
          }
        }

        function valueInterpolation(tr, fn) {
          return function (d, i) {
            let ln = fn(i);

            return function(t) {
              let flooredX = d.length - 1;
              if (flooredX < 0) return '';

              let interpolatedLine = d.slice(0, flooredX);

              let wY0 = d[flooredX][1][0] * t;
              let wY1 = d[flooredX][1][1] * t;

              interpolatedLine.push([ d[flooredX][0], [ wY0, wY1 ] ]);

              return ln(interpolatedLine);
            }
          }
        }


        elmArea.attr('opacity', _fillOpacity)
            .attr('fill', (d,i) => colors(d, i, 'area'));

        elmStroke.attr('stroke', (d,i) => colors(d, i, 'stroke'));

        let interpolation = null;
        if (transition === true) {
          if (animation === 'reveal') {
            interpolation = revealInterpolation;
          } else if (animation === 'value') {
            interpolation = valueInterpolation;
          }
        }

        if (interpolation !== null) {
          elmArea.attrTween('d', interpolation(_ptrim, i => _curve[i] != null ? areas.curve(_curve[i]) : areas));
          elmStroke.attrTween('d', interpolation(_ptrim, i => _curve[i] != null ? lines.curve(_curve[i]) : lines));
        } else {
          elmArea.attr('d', (d, i) => _curve[i] != null ? areas.curve(_curve[i])(d, i) : areas(d, i));
          elmStroke.attr('d', (d, i) => _curve[i] != null ? lines.curve(_curve[i])(d, i) : lines(d, i));
        }

        let eS = elmG.select('g.symbols').selectAll('path').data((d, i) => sym[i] != null ? d.map(function (v) { return { v : v, i : i }; }) : []);
        eS.exit().remove();
        eS = eS.enter().append('path').merge(eS);
        eS.attr('transform', d => 'translate('+scaleI(d.v[0])+','+safeScaleV(d.v[1][1])+')')
            .attr('d', (d) => sym[d.i](d.v, d.i))
            .attr('fill', d => colors(d.v, d.i, 'symbol'))
            .attr('stroke', 'none');

        let flat = _data.reduce((p, a, s) => p.concat(a.map((e, i) => [ e[0], e[1][1], s, i, (e[1][1] - e[1][0])] )), []);
        let overlay = voronoi()
            .x(d => scaleI(d[0]))
            .y(d => safeScaleV(d[1]))
            .extent([ [ _inset.left, _inset.top ], [ w - _inset.right, h - _inset.bottom ] ])
            .polygons(flat);

        let vmesh = g.select('g.voronoi').selectAll('path').data(overlay);
        vmesh.exit().remove();
        vmesh = vmesh.enter().append('path')
            .attr('fill', 'none')
            .attr('pointer-events', 'all')
            .merge(vmesh);

        vmesh.attr('d', d => d != null ? 'M' + d.join('L') + 'Z' : '')
            .attr('class', d => d != null ? 'series-' + d.data[2] : null);

        let _tipHtml = tipHtml;

        let fmtX = (v) => v;

        if (labelTime != null) {
          if (typeof labelTime === 'function') {
            fmtX = labelTime
          } else if (labelTime === 'multi') {
            let tf = timeFormatLocale(localeTime).format;

            fmtX = timeMultiFormat({ localtime: false } , tf);
          } else if (labelTime === 'multi-local') {
            let tf = timeFormatLocale(localeTime).format;
            //TODO: Temp fix related to https://github.com/redsift/d3-rs-lines/issues/6
            // needs a refactor to properly support time zones
            fmtX = timeMultiFormat({ localtime: false } , tf);
          } else {
            let tf = timeFormatLocale(localeTime);

            fmtX = tf.format(labelTime);
          }
        } else if (typeof tickFormatIndex === 'function') {
          fmtX = tickFormatIndex;
        } else if (tickFormatIndex != null) {
          fmtX = formatLocale(localeFormat).format(tickFormatIndex);
        }

        let fmtY = null;

        if (formatValue != null) {
          if (typeof formatValue === 'function') {
            fmtY = formatValue;
          } else {
            fmtY = formatLocale(localeFormat).format(formatValue);
          }
        }
        if (_tipHtml == null) {


          _tipHtml = function (d,i,s) {
            let v = value(d);
            let x = v[0];
            let y = 0;
            if (stacked === true) {
              y = (s === -1) ? 0 : v[1][s];

            } else {
              y = v[1];
            }

            if (fmtX != null) {
              x = fmtX(x);
            }

            if (fmtY != null && logValue === 0) {
              y = fmtY(y);
            }

            return x + ', ' + y;
          }
        }

        // Tip
        let _style = style;
        if (_style === undefined) {
          // build a style sheet from the embedded charts
          _style = [ _impl, lchart, rtip ].filter(c => c != null).reduce((p, c) => p + c.defaultStyle(theme, w), '');
        }

        rtip.html(_tipHtml);
        elmS.call(rtip);

        let defsEl = snode.select('defs');
        if (defsEl.empty()) {
          defsEl = snode.append('defs');
        }

        let styleEl = defsEl.selectAll('style' + (id ?  '#style-lines-' + id : '.style-' + classed)).data(_style ? [ _style ] : []);
        styleEl.exit().remove();
        styleEl = styleEl.enter()
            .append('style')
            .attr('type', 'text/css')
            .attr('id', (id ?  'style-lines-' + id : null))
            .attr('class', (id ?  null : 'style-' + classed))
            .merge(styleEl);
        styleEl.text(s => s);

        vmesh.on('click', function (d) {
          let s = d.data[2];
          let i = d.data[3];

          let item = _data[s][i];

          if (stacked === true) {
            // Quick hack to ignore empty series by scanning downward
            while (item == null || (item[1][1] - item[1][0] === 0)) {
              s = s - 1;
              if (s < 0) break;
              item = _data[s][i];
            }
          }

          let nested = item[1].data;

          if (nested !== undefined) {
            item = nested;
          }
        });

        vmesh.on('mouseover', function (d) {
          let s = d.data[2];
          let i = d.data[3];

          let item = _data[s][i];

          let y = 0;

          if (stacked === true) {
            // Quick hack to ignore empty series by scanning downward
            while (item == null || (item[1][1] - item[1][0] === 0)) {
              s = s - 1;
              if (s < 0) break;
              item = _data[s][i];
            }
            y = safeScaleV(item[1][1]);
          } else {
            item = [ d.data[0], d.data[1] ];
            y = safeScaleV(item[1]);
          }


          let x = scaleI(item[0]);

          let nested = item[1].data;

          if (nested !== undefined) {
            item = nested;
          }

          g.append('circle')
              .attr('r', DEFAULT_TIP_CIRCLE_SIZE)
              .attr('class', 'tip outline')
              .attr('cx', x)
              .attr('cy', y)
              .attr('pointer-events', 'none')
              .attr('fill', display[theme].axis);

          let circle = g.append('circle')
              .attr('r', DEFAULT_TIP_CIRCLE_SIZE - widths.outline)
              .attr('class', 'tip fill')
              .attr('cx', x)
              .attr('cy', y)
              .attr('pointer-events', 'none')
              .attr('fill', colors(item, s));

          rtip.show.apply(circle.node(), [ item, i, s ]);
        });

        elmS.on('mouseout', function () {
          g.selectAll('circle.tip').remove();
          rtip.hide.apply(this);
        });
        rtip.hide();

        let labels = [];

        if (legendOrientation === 'voronoi') {
          const centerI = (scaleI.range()[1] - scaleI.range()[0]) / 2;
          const UNIT_TO_RAD = Math.PI / 2;

          let calculatePolygon = function(d, i) {
            let c = polygonCentroid(d);
            // the more central (in x), the more suitable
            let centraility = Math.cos(UNIT_TO_RAD * Math.abs(centerI - c[0]) / centerI);
            // a: larger number, more suitable polygon
            return { a: polygonArea(d) * centraility, s: d.data[2], i: i, c: c };
          }

          // will drag the text position towards the data point by a funciton of
          // voronoiAttraction
          let calculateTextPosition = function(centroid, point) {
            let angle = Math.atan2(centroid[1] - point[1], centroid[0] - point[0]);

            let x = centroid[0] - point[0];
            let y = centroid[1] - point[1];

            let l = Math.sqrt(x*x + y*y);

            return [ centroid[0] - voronoiAttraction*l*Math.cos(angle), centroid[1] - voronoiAttraction*l*Math.sin(angle) ];
          }

          let polys = overlay.map(calculatePolygon);

          let candidates = nest()
              .key(d => d != null ? d.s : '')
              .sortValues((a,b) => descending(a.a, b.a))
              .entries(polys)
              .filter(d => d.key !== '')
              .map(function (d) {
                for (let i=0; i < d.values.length; i++) {
                  let e = d.values[i];
                  if (e != null) return e.i;
                }
                // nothing was an option
                return 0;
              });
          labels = candidates.map(i => calculateTextPosition(polys[i].c, [ scaleI(flat[i][0]), safeScaleV(flat[i][1]) ]));
        }

        let vlabels = g.select('g.voronoi').selectAll('text').data(labels);
        vlabels.exit().remove();
        vlabels = vlabels.enter().append('text')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'central')
            .merge(vlabels);

        if (transition === true && animateLabels === true) {
          vlabels = vlabels.transition(context);
        }

        vlabels.attr('x', d => d[0])
            .attr('y', d => d[1])
            .attr('fill', (d,i) => colors(d,i,'legend'))
            .attr('font-weight', fonts.variable.weightColor)
            .text((d, i) => i < legend.length ? legend[i] : '');


        function _mapHighlights(e) {
          if (Array.isArray(e)) {
            return { l: e.map(fmtX).join(','), v: e };
          }

          if (typeof e === 'object') {
            if (!Array.isArray(e.v)) {
              return { l: e.l, v: [ e.v ], c: 'supplied' };
            } else {
              return { l: e.l, v: e.v, c: 'supplied' };
            }
          }

          return { l: fmtX(e), v: [ e ] }
        }

        let _highlightIndex = highlightIndex.map(_mapHighlights);

        let hIndex = g.select('g.highlight-v').selectAll('rect').data(_highlightIndex);
        hIndex.exit().remove();
        hIndex = hIndex.enter().append('rect')
            .merge(hIndex);

        let hLabel = g.select('g.highlight-v').selectAll('text').data(_highlightIndex);
        hLabel.exit().remove();
        hLabel = hLabel.enter().append('text')
            .attr('dominant-baseline', 'text-after-edge')
            .merge(hLabel);

        hLabel
            .attr('text-anchor', 'middle')
            .attr('class', d => d.c);

        if (transition === true) {
          hIndex = hIndex.transition(context);
          hLabel = hLabel.transition(context);
        }

        hIndex.attr('y', _inset.top)
            .attr('height', h - _inset.bottom - _inset.top)
            .attr('x', d => Math.round(scaleI(d.v[0]) - (pattern.size() / 2)))
            .attr('width', function(d) {
              let sz = 1;
              if (d.v[1] != null) {
                sz = scaleI(d.v[1]) - scaleI(d.v[0]);
              }

              return pattern.align(sz);
            })
            .attr('fill', pattern.url());

        hLabel.attr('x', d => d.v[1] == null ? scaleI(d.v[0]) + DEFAULT_HIGHLIGHT_PADDING : DEFAULT_HIGHLIGHT_PADDING + scaleI(d.v[0]) + (scaleI(d.v[1]) - scaleI(d.v[0]))/2 )
            .attr('y', _inset.top)
            .text(d => d.l);

        _ptrim = trim;
      }
      draw(true);
    });
    
  }
  
  _impl.self = function() { return 'g' + (id ?  '#' + id : '.' + classed); }

  _impl.id = function() {
    return id;
  };

  _impl.defaultStyle = (_theme, _width) => `
                  ${_impl.importFonts() ? fonts.fixed.cssImport : ''}
                  ${_impl.importFonts() ? fonts.variable.cssImport : ''}  
                  ${_impl.self()} .axis line, 
                  ${_impl.self()} .axis path { 
                                              shape-rendering: crispEdges; 
                                              stroke-width: ${widths.axis}; 
                                              stroke: none;
                                            }

                  ${_impl.self()} g.axis-v line, 
                  ${_impl.self()} g.axis-v path { 
                                              stroke: ${axisDisplayValue === true ? display[_theme].axis : 'none'}; 
                                            }
                                            
                  ${_impl.self()} g.axis-i line, 
                  ${_impl.self()} g.axis-i path { 
                                              stroke: ${axisDisplayIndex === true ? display[_theme].axis : 'none'}; 
                                            }

                  ${_impl.self()} g.axis-v-minor line,
                  ${_impl.self()} g.axis-i-minor line { 
                                              stroke: ${display[_theme].axis}; 
                                            }
                                              
                  ${_impl.self()} text { 
                                        font-family: ${fonts.variable.family};
                                        font-size: ${fonts.variable.sizeForWidth(_width)};                
                                      }
                   
                  ${_impl.self()} path.stroke { stroke-width: ${widths.data} }
                  
                  ${_impl.self()} g.axis-v line.grid,
                  ${_impl.self()} g.axis-i line.grid { 
                                             stroke-width: ${widths.grid}; 
                                             stroke-dasharray: ${dashes.grid};
                                             stroke: ${display[_theme].grid};
                                            }

                  ${_impl.self()} g.axis-i g.tick line.grid.first,                  
                  ${_impl.self()} g.axis-v g.tick line.grid.first {
                                              stroke: none;
                                            }
                                            
                  ${_impl.self()} .axis text, 
                  ${_impl.self()} g.highlight text { 
                                    font-family: ${fonts.fixed.family};
                                    font-size: ${fonts.fixed.sizeForWidth(_width)};                
                                    font-weight: ${fonts.fixed.weightMonochrome};  
                                    fill: ${display[_theme].text}
                                  }
                `;
  
  _impl.importFonts = function(value) {
    return arguments.length ? (importFonts = value, _impl) : importFonts;
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
  
  _impl.tickCountValue = function(value) {
    return arguments.length ? (tickCountValue = value, _impl) : tickCountValue;
  }; 
   
  _impl.tickCountIndex = function(value) {
    return arguments.length ? (tickCountIndex = value, _impl) : tickCountIndex;
  };    

  _impl.tickMinorValue = function(value) {
    return arguments.length ? (tickMinorValue = value, _impl) : tickMinorValue;
  };   
  
  _impl.tickMinorIndex = function(value) {
    return arguments.length ? (tickMinorIndex = value, _impl) : tickMinorIndex;
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
    return arguments.length ? (
        legend = _coerceArray(value),
        legendsEnabled = Object.keys(legend).map(i => parseInt(i)),
        _impl
    ) : legend;
  }; 
   
  _impl.labelTime = function(value) {
    return arguments.length ? (labelTime = value, _impl) : labelTime;
  };   
  
  _impl.displayTip = function(value) {
    return arguments.length ? (displayTip = value, _impl) : displayTip;
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
  
  _impl.stacked = function(value) {
    return arguments.length ? (stacked = value, _impl) : stacked;
  };  
 
  _impl.stackOrder = function(value) {
    return arguments.length ? (stackOrder = value, _impl) : stackOrder;
  };  

  _impl.stackOffset = function(value) {
    return arguments.length ? (stackOffset = value, _impl) : stackOffset;
  };  

  _impl.trim = function(value) {
    return arguments.length ? (trim = value, _impl) : trim;
  }; 
      
  _impl.fill = function(value) {
    return arguments.length ? (fill = value, _impl) : fill;
  };    

  _impl.fillArea = function(value) {
    return arguments.length ? (fillArea = value, _impl) : fillArea;
  };    

  _impl.fillStroke = function(value) {
    return arguments.length ? (fillStroke = value, _impl) : fillStroke;
  };    
  
  _impl.fillAreaOpacity = function(value) {
    return arguments.length ? (fillOpacity = value, _impl) : fillOpacity;
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

  _impl.voronoiAttraction = function(value) {
    return arguments.length ? (voronoiAttraction = value, _impl) : voronoiAttraction;
  };  

  _impl.animateAxis = function(value) {
    return arguments.length ? (animateAxis = value, _impl) : animateAxis;
  };   

  _impl.animateLabels = function(value) {
    return arguments.length ? (animateLabels = value, _impl) : animateLabels;
  };        

  _impl.animation = function(value) {
    return arguments.length ? (animation = value, _impl) : animation;
  };     
          
  _impl.tipHtml = function(value) {
    return arguments.length ? (tipHtml = value, _impl) : tipHtml;
  };             
          
  _impl.highlightIndex = function(value) {
    return arguments.length ? (highlightIndex = _coerceArray(value), _impl) : highlightIndex;
  }; 
  
  _impl.axisDisplayValue = function(value) {
    return arguments.length ? (axisDisplayValue = value, _impl) : axisDisplayValue;
  };        

  _impl.axisDisplayIndex = function(value) {
    return arguments.length ? (axisDisplayIndex = value, _impl) : axisDisplayIndex;
  };      

  _impl.legendIsToggleable = function(value) {
    return arguments.length ? (legendIsToggleable = value, _impl) : legendIsToggleable;
  };

  _impl.tintColor = function(value) {
    return arguments.length ? (tintColor = value, _impl) : tintColor;
  }

  return _impl;
}