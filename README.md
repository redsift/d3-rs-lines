# d3-rs-lines

`d3-rs-lines` generate a range of line charts. Supports area fills, hovers and highlights.

## Builds

[![Circle CI](https://circleci.com/gh/Redsift/d3-rs-lines.svg?style=svg)](https://circleci.com/gh/Redsift/d3-rs-lines)

## Example

[View @redsift/d3-rs-lines on Codepen](http:...)

### Line chart

![Sample bars with a bottom orientation](https://bricks.redsift.io/reusable/d3-rs-bars.svg?_datum=[1,200,3100,1000]&orientation=bottom)

### Area chart

![Sample bars with a left orientation](https://bricks.redsift.io/reusable/d3-rs-bars.svg?_datum=[1,200,3100,1000]&orientation=left&fill=global)

### Combination

![Sample bars with a top orientation and time label](https://bricks.redsift.io/reusable/d3-rs-bars.svg?_datum=[{%22v%22:1,%22l%22:1466424812000},{%22v%22:2,%22l%22:1466511212000},{%22v%22:3,%22l%22:1466597612000},{%22v%22:300.5,%22l%22:1466684012000},{%22v%22:4000,%22l%22:1466770412000},{%22v%22:40000,%22l%22:1466856812000}]&orientation=top&labelTime=%25a%20%25d)

## Usage

### Browser
	
	<script src="//static.redsift.io/reusable/d3-rs-lines/latest/d3-rs-lines.umd-es2015.min.js"></script>
	<script>
		var chart = d3_rs_lines.html();
		d3.select('body').datum([ 1, 2, 3, 10, 100 ]).call(chart);
	</script>

### ES6

	import { chart } from "@redsift/d3-rs-lines";
	let eml = chart.html();
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
`width`, `height`, `size`, `scale`|*Integer* SVG container sizes|Y
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