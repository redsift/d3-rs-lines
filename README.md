# d3-rs-lines

[![Circle CI](https://img.shields.io/circleci/project/redsift/d3-rs-lines.svg?style=flat-square)](https://circleci.com/gh/redsift/d3-rs-lines)
[![npm](https://img.shields.io/npm/v/@redsift/d3-rs-lines.svg?style=flat-square)](https://www.npmjs.com/package/@redsift/d3-rs-lines)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/redsift/d3-rs-lines/master/LICENSE)

`d3-rs-lines` generate a range of line charts via the D3 reusable chart convention. Supports area fills, hovers and highlights.

## Example

[View @redsift/d3-rs-lines on Codepen](http://codepen.io/collection/DgkEpa/)

### Line chart

![Sample bars with a bottom orientation](https://bricks.redsift.io/reusable/d3-rs-lines.svg?_datum=[1,200,3100,1000]&orientation=bottom)

### Multiple series

![Sample bars with a left orientation](https://bricks.redsift.io/reusable/d3-rs-lines.svg?_datum=[[1,2,4],[0,1]])

## Usage

### Browser

    <script src="//static.redsift.io/reusable/d3-rs-lines/latest/d3-rs-lines.umd-es2015.min.js"></script>
    <script>
        var chart = d3_rs_lines.html();
        d3.select('body').datum([ 1, 2, 3, 10, 100 ]).call(chart);
    </script>

### ES6

    import { html as chart } from "@redsift/d3-rs-lines";
    let eml = chart();
    ...

### Require

    var chart = require("@redsift/d3-rs-lines");
    var eml = chart.html();
    ...

### Datum

- Simplest form, array of numbers: `[1,2,3,4...]`

### Parameters

Property|Description|Transition|Preview
----|-----------|----------|-------
`classed`|*String* SVG custom class|N
`width`, `height`, `size`, `scale`|*Integer* SVG container sizes|Y|[Pen](...)
`style`|*String* Custom CSS to inject into chart|N
`minValue`,`maxValue`|*Number* Sets the minimum and maximum Value scale range. Note that for log scales, minValue must be > 0.|Y
`tickCountIndex`,`tickCountValue`|*Number, String, Interval Function* Hints at the number of ticks to set in the corresponding axis. Supports strings for example [time intervals](https://github.com/d3/d3-time#intervals)
`tickMinorIndex`, `tickMinorValue`|*Number, String, Interval Function* Hints at the number of minor ticks to set in the corresponding axis.
`tickFormatIndex`, `tickFormatValue`|*String, Function* Sets the formatting string or function for the ticks
`tickDisplayIndex`, `tickDisplayValue`|*Function* Alternatively you can customise all tick presentation logic with this function
`curve`|*String, Function*, [curves](https://github.com/d3/d3-shape#curves), excluding closed and open curves. If a function is supplied, it should implement [custom-curves](https://github.com/d3/d3-shape#custom-curves)
`symbol`|*(Array of) String, Function* [symbol circle](https://github.com/d3/d3-shape#symbolCircle) or [custom symbol types](https://github.com/d3/d3-shape#custom-symbol-types)
`legendOrientation`|*String* top, left, bottom, right, voronoi
`voronoiAttraction`|*Number -1...0...1* When using the voronoi legendOrientation, how far the label is dragged to the data line. 0 implies no dragging, -1 pushes the labels away
`fill`|*String, Array, Function* If function, in addition to usual *data*, *index* parameters, a 3rd string parameter indicates the context - one of `area`, `stroke`, `symbol`, `legend`   
`fillAreaOpacity`|*Unit Number* 
`fillArea`, `fillStroke`|*Boolean, Array[Boolean]* Sets if the lines should be filled or stroked. By default is set appropriately for line and stack presentation
`stackOffset`, `stackOrder`|*String, Array, Function* [stack orders](https://github.com/d3/d3-shape#stack-orders) [stack offsets](https://github.com/d3/d3-shape#stack-offsets)
`animation`|*String* `reveal`, `value`, `default`
`trim`|*Integer* Level to trim the array to
`tipHtml`|*String, Function* parameters of the function are `(d, i, s)` where `d` is the data element, `i` is the index, `s` is the series of the data
`onClick`|*Function* handler for a click event on the data series

### Time

TODO: Explain string use and intervals like `utcDecade`;

TODO: `timeMultiFormat`

TODO: Discuss `timeMultiFormat` and `tickCountIndex` with relation to UTC
