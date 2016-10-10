# d3-rs-lines

[![Circle CI](https://img.shields.io/circleci/project/redsift/d3-rs-lines.svg?style=flat-square)](https://circleci.com/gh/redsift/d3-rs-lines)
[![npm](https://img.shields.io/npm/v/@redsift/d3-rs-lines.svg?style=flat-square)](https://www.npmjs.com/package/@redsift/d3-rs-lines)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/redsift/d3-rs-lines/master/LICENSE)

`d3-rs-lines` generate a range of line charts via the D3 reusable chart convention. Supports area fills, hovers and highlights.

## Example

[View @redsift/d3-rs-lines on Codepen](http://codepen.io/collection/DgkEpa/)

### Line chart

![Sample bars with a bottom orientation](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,200,3100,1000]&orientation=bottom)

### Multiple series

![Sample bars with a left orientation](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[[1,2,4],[0,1]])

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
- Datum includes parameters, **Index** and **Value** which form `[{ "l": 1,"v":1},{"l": 4,"v":6}]`, `l` representing the Index and `v` the Value. The simple datum generate a line starting at (1,1) and ending at (4,6). [View Datum result on Bricks.](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[{%20%22l%22:%201,%22v%22:1},{%22l%22:%204,%22v%22:6}])
- A set of line charts that can be achieved using different **Value** data `[{"l":1,"v":[1,2,3]},{"l":2,"v":[3,2,1]},{"l":3,"v":[2,1,3]}]`. [View Datum result on Bricks.](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[{%22l%22:1,%22v%22:[1,2,3]},{%22l%22:2,%22v%22:[3,2,1]},{%22l%22:3,%22v%22:[2,1,3]}])
- Else generating each line separately in a datum array `[[{"l":1,"v":3},{"l":2,"v":5}],[{"l":1,"v":1},{"l":6,"v":7}]]`. [View Datum result on Bricks.](https://bricks.redsift.io/reusable/d3-rs-lines.svg?_datum=[[{%22l%22:1,%22v%22:3},{%22l%22:2,%22v%22:5}],[{%22l%22:1,%22v%22:1},{%22l%22:6,%22v%22:7}]]) 
- Datum supports unix timestamp data-set 

### Parameters

This section gives an overview of all the properties available and how they can be used. Examples provided are linked to Codepens that can be easily edited.


Property|Description|Transition|Preview
--------|-----------|----------|-------
`classed`|*String* Customise SVG by adding, removing and toggling of CSS classes.|N |
`background` | *String, Number* Change the background colour of the chart. |Y | [![Preview of background property](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&orientation=bottom&background=grey)](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&orientation=bottom&background=grey)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&orientation=bottom&background=grey) / [CodePen](http://codepen.io/geervesh/pen/ZOrLOa)
`theme` | *String* Change the chart theme which includes `'light'`(default) and `'dark'`. |Y | [<img src="https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&theme=dark">](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&orientation=bottom&theme=dark)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&theme=dark) / [CodePen](http://codepen.io/geervesh/pen/PzBvdA) 
`height`, `width` | *Integer* Resize the height and width of chart. `Default width: 420 pixels`. |Y | [<img src="https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&width=500&height=500">](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&width=500&height=200)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&width=500&height=500) / [CodePen](http://codepen.io/geervesh/pen/grjgap)
`size` | *Integer* Resize the chart to a certain size changing both the width and height maintaining the default aspect ratio. |Y | [<img src="https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&size=400">](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&size=400)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&size=400) / [CodePen](http://codepen.io/geervesh/pen/grdQgY)
`scale` | *Number* Scale the entire chart by the scaling value. Used to zoom the chart or compensate for high DPI displays when rasterized. `Default scale: 1.0`. |Y| Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&scale=0.5) / [CodePen](http://codepen.io/geervesh/pen/BzPzZw)
`margin` | *Number* Resize the chart margin inside of the SVG container. `Default margin: 26 pixels`. |Y | [<img src="https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&margin=10">](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&margin=10)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&margin=10) / [CodePen](http://codepen.io/geervesh/pen/qNyZmb)
`inset` | *Number* Resize the space inside the chart margin for the main chart element. This excludes items like legends. | Y| [<img src="https://static.redsift.io/assets/d3-rs-lines/inset.png" height="100" width="400">](http://codepen.io/geervesh/pen/EyOZgZ)<br>Examples: [CodePen](http://codepen.io/geervesh/pen/EyOZgZ)
`style`| *String* Custom CSS to inject into chart|N |
`trim`| *Integer* Trim the datum array, use for slicing the data on the chart. | N | [<img src="https://static.redsift.io/assets/d3-rs-lines/trim.png" height="100" width="320">](http://codepen.io/geervesh/pen/rrWaRg)<br>Examples: [CodePen](http://codepen.io/geervesh/pen/rrWaRg)
`minValue`,`maxValue`| *Number* Sets the minimum and maximum Value range. Note that for log scales, `minValue` must be > 0.|Y | [<img src="https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&minValue=1.0&maxValue=5.0">](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&minValue=1.0&maxValue=5.0)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&minValue=1.0&maxValue=5.0) / [CodePen](http://codepen.io/geervesh/pen/bZjprd)
`minIndex` ,`maxIndex`  | *Number* Sets the minimum and maximum Index range. Note that for log scales, `minIndex` must be > 0. |Y | [<img src="https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&minIndex=0.5&maxIndex=3.0">](hhttps://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&minIndex=0.5&maxIndex=3.0)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&minIndex=0.5&maxIndex=3.0) / [CodePen](http://codepen.io/geervesh/pen/qNybzX)
`tickCountIndex`,`tickCountValue`|*Number, String, Interval Function* Hints at the number of ticks to set in the corresponding axis. Supports strings for example split [time intervals](https://github.com/d3/d3-time#intervals) when using Unix timestamp(or epoch time) Index values. `Default tickCountIndex: 6` | N | [<img src="https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&tickCountIndex=2&tickCountValue=4">](ttps://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&tickCountIndex=2&tickCountValue=4)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&tickCountIndex=2&tickCountValue=4) / [CodePen](http://codepen.io/geervesh/pen/QEVPJk)
`tickMinorIndex`, `tickMinorValue`|*Number, String, Interval Function* Hints at the number of minor ticks to set in the corresponding axis. | N | [<img src="https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&tickMinorIndex=50&tickMinorValue=10">](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&tickMinorIndex=50&tickMinorValue=10)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&tickMinorIndex=50&tickMinorValue=10) / [CodePen](http://codepen.io/geervesh/pen/XKPGBY)
`tickFormatIndex`, `tickFormatValue`|*String, Function* Sets the formatting string or function for the ticks. | N| [<img src="https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&tickFormatIndex=.2f&tickFormatValue=($.1s">](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&tickFormatIndex=.2f&tickFormatValue=($.1s))<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&tickFormatIndex=.2f&tickFormatValue=($.1s)) / [CodePen](http://codepen.io/geervesh/pen/wWEQXz)
`tickDisplayIndex`, `tickDisplayValue`|*String, Integer* Customise all tick presentation logic with this function. | N | [<img src="https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&tickDisplayIndex='Red'&tickDisplayValue=6">](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&tickDisplayIndex='Red'&tickDisplayValue=6)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&tickDisplayIndex='Red'&tickDisplayValue=6) / [CodePen](http://codepen.io/geervesh/pen/YWOgqB)
`curve`|*String, Function*, Interpolation function for the line. [Standard functions](https://github.com/d3/d3-shape#curves) excluding closed and open curves are usable by name e.g. 'curveStep'. If a function is supplied, it should implement [custom curves](https://github.com/d3/d3-shape#custom-curves). `Default curve: 'curveCatmullRom'` | Y | [<img src="https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&curve=curveStep">](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&curve=curveStep)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&curve=curveStep) / [CodePen](http://codepen.io/geervesh/pen/vKVKpw)
`symbol`|*(Array of) String, Function* Change the points connecting the lines into [customised symbols](https://github.com/d3/d3-shape#symbolCircle) or [custom symbol types](https://github.com/d3/d3-shape#custom-symbol-types) | N | [<img src="https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&symbol=symbolSquare">](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&symbol=symbolSquare)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&symbol=symbolSquare) / [CodePen](http://codepen.io/geervesh/pen/zBmagk)
`symbolSize` | *Number* Resize the symbol to a specific size. `Default size: 32` | Y| [<img src="https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&symbol=symbolSquare&symbolSize=100" height="120" width="320">](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&symbol=symbolSquare&symbolSize=100)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&symbol=symbolSquare&symbolSize=100) / [CodePen](http://codepen.io/geervesh/pen/zBmagk)
`fill`|*String, Array, Function* If function, in addition to usual *data*, *index* parameters, a 3rd string parameter indicates the context - one of `area`, `stroke`, `symbol`, `legend` | Y | [<img src="https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&fill=rgb(0,0,259)">](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&fill=rgb(0,0,259))<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&fill=rgb(0,0,259)) / [CodePen](http://codepen.io/geervesh/pen/JKkAQx)
`fillAreaOpacity` | *Unit Number* Fill the area of the graph to a certain opacity |N| [<img src="https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&fillAreaOpacity=1.0">](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&fillAreaOpacity=1.0)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&fillAreaOpacity=1.0) / [CodePen](http://codepen.io/geervesh/pen/oLybEG)
`fillArea`|*Boolean, (Array of) Boolean* Set the lines fill. | N |[<img src="https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&fillArea=false">](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&fillArea=false)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&fillArea=false) / [CodePen](http://codepen.io/geervesh/pen/EyRXYO)
`fillStroke`|*Boolean, (Array of) Boolean* Set the lines stroke. | N |[<img src="https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&fillStroke=false">](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&fillStroke=false)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&fillStroke=false) / [CodePen](http://codepen.io/geervesh/pen/zBazvr)
`stacked` | *Boolean* Enable stacking. `Default value: false` | Y|[<img src='https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[{"l":1,"v":[1,4,5]},{"l":3,"v":[4,3,1]},{"l":6,"v":[5,6,6]}]&stacked=true'>](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[{"l":1,"v":[1,4,5]},{"l":3,"v":[4,3,1]},{"l":6,"v":[5,6,6]}]&stacked=true)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[{"l":1,"v":[1,4,5]},{"l":3,"v":[4,3,1]},{"l":6,"v":[5,6,6]}]&stacked=true) / [CodePen](http://codepen.io/geervesh/pen/oLaYXB)
`stackOffset` | *String, Function* Shift the baseline of the chart to give more emphasis on the changing values using different [offset properties.](https://github.com/d3/d3-shape#stack-offsets) |Y | [<img src='https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[{"l":1,"v":[1,4,5]},{"l":3,"v":[4,3,1]},{"l":6,"v":[5,6,6]}]&stacked=true&stackOffset=stackOffsetSilhouette'>](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[{"l":1,"v":[1,4,5]},{"l":3,"v":[4,3,1]},{"l":6,"v":[5,6,6]}]&stacked=true&stackOffset=stackOffsetSilhouette)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[{"l":1,"v":[1,4,5]},{"l":3,"v":[4,3,1]},{"l":6,"v":[5,6,6]}]&stacked=true&stackOffset=stackOffsetSilhouette) / [CodePen](http://codepen.io/geervesh/pen/akPqqz)
`stackOrder` | *String, Function* Stack the chart using different stack [ordering properties](https://github.com/d3/d3-shape#stack-orders). |Y | [<img src='https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[{"l":1,"v":[1,4,5]},{"l":3,"v":[4,3,1]},{"l":6,"v":[5,6,6]}]&stacked=true&stackOrder=stackOrderInsideOut'>](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[{"l":1,"v":[1,4,5]},{"l":3,"v":[4,3,1]},{"l":6,"v":[5,6,6]}]&stacked=true&stackOrder=stackOrderInsideOut)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[{"l":1,"v":[1,4,5]},{"l":3,"v":[4,3,1]},{"l":6,"v":[5,6,6]}]&stacked=true&stackOrder=stackOrderInsideOut) / [CodePen](http://codepen.io/geervesh/pen/akPqqz)
`animation`|*String* Change the animation interpolating between points. Parameters: `reveal`, `value`, `default`.| Y| [Codepen Example](http://codepen.io/geervesh/pen/pbQNam)
`tipHtml`|*String, Function* Add information to the tip of the chart. Parameters of the function are `(d, i, s)` where `d` is the data element, `i` is the index, `s` is the series of the data. | Y |[<img src="https://static.redsift.io/assets/d3-rs-lines/tipHtml.png" height="100" width="200">](http://codepen.io/geervesh/pen/QEkjzv)<br>Examples: [CodePen](http://codepen.io/geervesh/pen/ZOrLOa)
`animateAxis`, `animateLabels` | *Boolean* Set the animation of the axis and label. `Default value: true`. | N |[Codepen Example](http://codepen.io/geervesh/pen/pbQNam)
`axisDisplayIndex`,`axisDisplayValue` | *Boolean* Set the axes to display. `Default axisDisplayIndex: true`, `axisDisplayValue: false`. |N | [<img src="https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&axisDisplayValue=true&axisDisplayIndex=false">](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&axisDisplayValue=true&axisDisplayIndex=false)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&axisDisplayValue=true&axisDisplayIndex=false) / [CodePen](http://codepen.io/geervesh/pen/kXpWEx)
`axisPaddingValue`,`axisPaddingIndex` | *Number* Set the padding size of the axis. `Default axisPaddingValue: 8`, `axisPaddingIndex: 8`.|N | [<img src="https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&axisPaddingIndex=35&axisPaddingValue=25">](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&axisPaddingIndex=35&axisPaddingValue=25)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&axisPaddingIndex=35&axisPaddingValue=25) / [CodePen](http://codepen.io/geervesh/pen/kXprNp)
`axisValue` | *String* Changes the axis label of value (on the y-axis) to the left or right. `Default value: 'left'`.| N | [<img src="https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&axisValue=right">](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&axisValue=right)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&axisValue=right) / [CodePen](http://codepen.io/geervesh/pen/kXprvz)
`highlightIndex` | *(Array of)Number, Function* Highlight a particular or an array of Index|Y | [<img src="https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&highlightIndex=2">](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&highlightIndex=2)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&highlightIndex=2) / [CodePen](http://codepen.io/geervesh/pen/qNKdgv)
`legend` | *(Array of)String, Number* Add a legend for the lines in the chart. |N| [<img src='https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[{"l":1,"v":[1,5]},{"l":3,"v":[4,1]},{"l":6,"v":[5,6]}]&legend=Green&legend=Purple'>](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[{"l":1,"v":[1,5]},{"l":3,"v":[4,1]},{"l":6,"v":[5,6]}]&legend=Green&legend=Purple)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[{"l":1,"v":[1,5]},{"l":3,"v":[4,1]},{"l":6,"v":[5,6]}]&legend=Green&legend=Purple) / [CodePen](http://codepen.io/geervesh/pen/rLKgQz)
`legendOrientation` | *String* Position the legend, positions include top, bottom, left, right or voronoi. `Default orientation: 'bottom'` | Y | [<img src='https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[{"l":1,"v":[1,5]},{"l":3,"v":[4,1]},{"l":6,"v":[5,6]}]&legend=Green&legend=Purple&legendOrientation=top'>](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[{"l":1,"v":[1,5]},{"l":3,"v":[4,1]},{"l":6,"v":[5,6]}]&legend=Green&legend=Purple&legendOrientation=top)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[{"l":1,"v":[1,5]},{"l":3,"v":[4,1]},{"l":6,"v":[5,6]}]&legend=Green&legend=Purple&legendOrientation=top) / [CodePen](http://codepen.io/geervesh/pen/LkAVjg)
`legendOrientation('voronoi')` | *String* Position the legend in an area containing the least number of intersecting lines. |N | [<img src='https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[{"l":1,"v":[1,5]},{"l":3,"v":[4,1]},{"l":6,"v":[5,6]}]&legend=Green&legend=Purple&legendOrientation=voronoi'>](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[{"l":1,"v":[1,5]},{"l":3,"v":[4,1]},{"l":6,"v":[5,6]}]&legend=Green&legend=Purple&legendOrientation=voronoi)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[{"l":1,"v":[1,5]},{"l":3,"v":[4,1]},{"l":6,"v":[5,6]}]&legend=Green&legend=Purple&legendOrientation=voronoi) / [CodePen](http://codepen.io/geervesh/pen/Lkqaxb)
`voronoiAttraction`|*Number -1...0...1* Use when legendOrientation set to voronoi. Specifies the attraction of the label to the data line. 0 implies no dragging, -1 pushes the labels away. `Default value: 0.33` | Y | [<img src='https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[{"l":1,"v":[1,5]},{"l":3,"v":[4,1]},{"l":6,"v":[5,6]}]&legend=Green&legend=Purple&legendOrientation=voronoi&voronoiAttraction=-5'>](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[{"l":1,"v":[1,5]},{"l":3,"v":[4,1]},{"l":6,"v":[5,6]}]&legend=Green&legend=Purple&legendOrientation=voronoi&voronoiAttraction=-5)<br>Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[{"l":1,"v":[1,5]},{"l":3,"v":[4,1]},{"l":6,"v":[5,6]}]&legend=Green&legend=Purple&legendOrientation=voronoi&voronoiAttraction=-5) / [CodePen](http://codepen.io/geervesh/pen/PGbgoN)
`gridIndex`, `gridValue` | *Boolean* Add guidelines for Index or Value. `Default gridIndex: false`, `gridValue: true`. | N| [<img src="https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&gridIndex=true&gridValue=false">](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&gridIndex=true&gridValue=false) Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[1,2,3,10,20]&gridIndex=true&gridValue=false) / [CodePen](http://codepen.io/geervesh/pen/ZORkKE)
`labelTime` | *String, Function* Interpret the Index value as a timestamp and format it using [string specifiers](https://github.com/d3/d3-time-format/blob/master/README.md#locale_format) or the supplied function. `'multi'` (string specifier) smartly displays the time.| N|[<img src='https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=%5B%7B%22l%22:%201461456000000,%22v%22:%5B%2012,3%5D%7D,%7B%22l%22:1461542400000,%22v%22:%5B%205,11%5D%7D%5D&labelTime=multi&tickCountIndex=3'>](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=%5B%7B%22l%22:%201461456000000,%22v%22:%5B%2012,3%5D%7D,%7B%22l%22:1461542400000,%22v%22:%5B%205,11%5D%7D%5D&labelTime=multi&tickCountIndex=3) Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=%5B%7B%22l%22:%201461456000000,%22v%22:%5B%2012,3%5D%7D,%7B%22l%22:1461542400000,%22v%22:%5B%205,11%5D%7D%5D&labelTime=multi&tickCountIndex=3) / [CodePen](http://codepen.io/geervesh/pen/GqYdoo)
`language` | *String* Change the language format of the chart affecting digit, currency and time formats. |N | Examples: [Bricks](https://bricks.redsift.cloud/reusable/d3-rs-lines.svg?_datum=[30,40,100,70,50]&tickFormatValue=($.1s&language=fr))/ [CodePen](http://codepen.io/geervesh/pen/vXywyJ)
`onClick`|*Function*  Handler for a click event on a data series. |N | Examples:

### Time

TODO: Discuss `timeMultiFormat` and `tickCountIndex` with relation to UTC