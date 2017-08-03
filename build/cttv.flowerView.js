(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require("./index.js");

},{"./index.js":2}],2:[function(require,module,exports){
module.exports = flowerView = require("./src/flowerView.js");

},{"./src/flowerView.js":3}],3:[function(require,module,exports){
var flowerView = function () {
   "use strict";
    var conf = {
        diagonal : 100,
    	values : [],
    	fontsize : 12,
    	max : 1
    };

    var radius = conf.width / 2;
    var radii = conf.values.length;
    var radians = 2 * Math.PI / radii;
    // var color = d3.scale.category20c();
    var render = function (div) {

    	var container = d3.select(div);
    	container.selectAll("*").remove();
    	radius = conf.diagonal / 2;

    	var sizeScale = d3.scale.sqrt()
    	    .domain([0,conf.max])
    	    .range([0, radius]);

    	var colorScale = d3.scale.linear()
    	    .domain([0,d3.extent(conf.values, function(d){
        		return d.value;
    	    })[1]])
    	    //.domain([0, d3.extent(conf.values)[1]])
    	    //.range(["#3e8bad", "#975269"]);
    	    .range(["#3e8bad", "#3e8bad"]);
    	var backgroundColor = "#f1f1f1";

    	var origin = [~~(conf.width/2), ~~(conf.height/2)];
    	var svg = container.append("svg")
    	    .attr("width", conf.diagonal)
    	    .attr("height", conf.diagonal)
    	    .append("g")
    	    .attr("transform", "translate(" + radius + "," + radius + ")");

    	var label = function (r, currLabel, hasData) {
        	    var rads = r * 180 / Math.PI;
        	    var offset = 15;
        	    svg.append("text")
                .attr("class", "cttv_petal_label")
        		.attr("x", origin[0])
        		.attr("y", origin[1])
        		.attr("font-size", conf.fontsize)
        		.attr("font-weight", "bold")
        		.attr("fill", function () {
        		    if (hasData) {
            			return "#000";
        		    }
        		    return "#ccc";
        		})
        		.attr("text-anchor", (!isReversed(rads)? "start" : "end"))
        		.attr("transform", "translate(" + (0+Math.cos(r)*offset) + "," + (0+Math.sin(r)*offset) + ")rotate(" + (rads) + ")rotate(" + (!isReversed(rads)?0:180) + ")")
        		.text(currLabel);

        	    function isReversed (d) {
            		return (d>90 && d<270);
        	    }

    	};

    	var petal = function (l, r, d, color) {
    	    var x = l * Math.cos(r);
    	    var y = l * Math.sin(r);
    	    //var rads = Math.atan2(0-x, 0-y) * 180 / Math.PI;

    	    var realx = d * Math.cos(r);
    	    var realy = d * Math.sin(r);

    	    var rx = l * 0.8 * Math.cos(r+(radians/2));
    	    var ry = l * 0.8 * Math.sin(r+(radians/2));
    	    var realrx = d * 0.8 * Math.cos(r+(radians/2));
    	    var realry = d * 0.8 * Math.sin(r+(radians/2));

    	    var lx = l * 0.8 * Math.cos(r-(radians/2));
    	    var ly = l * 0.8 * Math.sin(r-(radians/2));
    	    var reallx = d * 0.8 * Math.cos(r-(radians/2));
    	    var really = d * 0.8 * Math.sin(r-(radians/2));

    	    // svg.append ("line")
    	    // 	.attr("class", "stitches")
    	    // 	.attr("x1", origin[0])
    	    // 	.attr("y1", origin[1])
    	    // 	.attr("x2", origin[0] + x)
    	    // 	.attr("y2", origin[1] + y)

    	    // svg.append("line")
    	    // 	.attr("class", "stitches")
    	    // 	.attr("x1", origin[0])
    	    // 	.attr("y1", origin[1])
    	    // 	.attr("x2", origin[0] + rx)
    	    // 	.attr("y2", origin[1] + ry)

    	    // svg.append("line")
    	    // 	.attr("class", "stitches")
    	    // 	.attr("x1", origin[0] + rx)
    	    // 	.attr("y1", origin[1] + ry)
    	    // 	.attr("x2", origin[0] + x)
    	    // 	.attr("y2", origin[1] + y);

    	    // svg.append("line")
    	    // 	.attr("class", "stitches")
    	    // 	.attr("x1", origin[0])
    	    // 	.attr("y1", origin[1])
    	    // 	.attr("x2", origin[0] + lx)
    	    // 	.attr("y2", origin[1] + ly)

    	    // svg.append("line")
    	    // 	.attr("class", "stitches")
    	    // 	.attr("x1", origin[0] + lx)
    	    // 	.attr("y1", origin[1] + ly)
    	    // 	.attr("x2", origin[0] + x)
    	    // 	.attr("y2", origin[1] + y);

    	    var line = d3.svg.line()
        		.x(function (d) {return d.x;})
        		.y(function (d) {return d.y;})
        		.interpolate("basis");

    	    // max petal size (dotted)
    	    var data = [
        		{x:origin[0],  y:origin[1]},
        		{x:origin[0]+rx, y:origin[1]+ry},
        		{x:origin[0]+x, y:origin[0]+y},
        		{x:origin[0]+lx, y:origin[0]+ly},
        		{x:origin[0],  y:origin[1]}
    	    ];

    	    // real petal size
    	    var realData = [
        		{x:origin[0],  y:origin[1]},
        		{x:origin[0]+realrx, y:origin[1]+realry},
        		{x:origin[0]+realx, y:origin[1]+realy},
        		{x:origin[0]+reallx, y:origin[1]+really},
        		{x:origin[0],  y:origin[1]}
    	    ];
    	    svg.append("path")
        		.attr("class", "stitches")
        		.attr("d", line(data))
        		.style("stroke", function () {
        		    if (d>0) {
            			return "#3e8bad";
        		    }
            		return "#ccc";
        		})
        		.style("stroke-width", function () {
        		    if (d>0) {
            			return "0.5px";
        		    }
            		return "0.25px";
        		});

    	    svg.append("path")
        		.attr("class", "petal")
        		.attr("d", line(realData))
        		.attr("fill", function () {
                    return color;
                });
    	};

    	var petals = function () {
    	    var r = 0;
    	    conf.values.forEach (function (d, i) {
        		if (d.active) {
        		    var l = radius;
        		    petal (l, r, sizeScale(d.value), colorScale(d.value));
        		}
        		r += radians;

    	    });
    	    r = 0;
    	    conf.values.forEach (function (d, i) {
        		if (d.active) {
        		    var l = radius;
        		    label (r, d.label, d.value>0);
        		}
        		r += radians;
    	    });
    	};

        petals();
    };

    render.values = function (vals) {
    	if (!arguments.length) {
    	    return conf.values;
    	}
    	conf.values = vals;
    	radii = vals.length;
    	radians = 2 * Math.PI / radii;
    	return this;
    };

    render.diagonal = function (d) {
    	if (!arguments.length) {
    	    return conf.diagonal;
    	}
    	conf.diagonal = d;
    	return this;
    };

    render.fontsize = function (f) {
    	if (!arguments.length) {
    	    return conf.fontsize;
    	}
    	conf.fontsize = f;
    	return this;
    };

    return render;
};

module.exports = exports = flowerView;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ncGVhdC9vcGVudGFyZ2V0cy9mbG93ZXJWaWV3L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZ3BlYXQvb3BlbnRhcmdldHMvZmxvd2VyVmlldy9mYWtlXzQ3NmFhODJkLmpzIiwiL1VzZXJzL2dwZWF0L29wZW50YXJnZXRzL2Zsb3dlclZpZXcvaW5kZXguanMiLCIvVXNlcnMvZ3BlYXQvb3BlbnRhcmdldHMvZmxvd2VyVmlldy9zcmMvZmxvd2VyVmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2luZGV4LmpzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmbG93ZXJWaWV3ID0gcmVxdWlyZShcIi4vc3JjL2Zsb3dlclZpZXcuanNcIik7XG4iLCJ2YXIgZmxvd2VyVmlldyA9IGZ1bmN0aW9uICgpIHtcbiAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBjb25mID0ge1xuICAgICAgICBkaWFnb25hbCA6IDEwMCxcbiAgICBcdHZhbHVlcyA6IFtdLFxuICAgIFx0Zm9udHNpemUgOiAxMixcbiAgICBcdG1heCA6IDFcbiAgICB9O1xuXG4gICAgdmFyIHJhZGl1cyA9IGNvbmYud2lkdGggLyAyO1xuICAgIHZhciByYWRpaSA9IGNvbmYudmFsdWVzLmxlbmd0aDtcbiAgICB2YXIgcmFkaWFucyA9IDIgKiBNYXRoLlBJIC8gcmFkaWk7XG4gICAgLy8gdmFyIGNvbG9yID0gZDMuc2NhbGUuY2F0ZWdvcnkyMGMoKTtcbiAgICB2YXIgcmVuZGVyID0gZnVuY3Rpb24gKGRpdikge1xuXG4gICAgXHR2YXIgY29udGFpbmVyID0gZDMuc2VsZWN0KGRpdik7XG4gICAgXHRjb250YWluZXIuc2VsZWN0QWxsKFwiKlwiKS5yZW1vdmUoKTtcbiAgICBcdHJhZGl1cyA9IGNvbmYuZGlhZ29uYWwgLyAyO1xuXG4gICAgXHR2YXIgc2l6ZVNjYWxlID0gZDMuc2NhbGUuc3FydCgpXG4gICAgXHQgICAgLmRvbWFpbihbMCxjb25mLm1heF0pXG4gICAgXHQgICAgLnJhbmdlKFswLCByYWRpdXNdKTtcblxuICAgIFx0dmFyIGNvbG9yU2NhbGUgPSBkMy5zY2FsZS5saW5lYXIoKVxuICAgIFx0ICAgIC5kb21haW4oWzAsZDMuZXh0ZW50KGNvbmYudmFsdWVzLCBmdW5jdGlvbihkKXtcbiAgICAgICAgXHRcdHJldHVybiBkLnZhbHVlO1xuICAgIFx0ICAgIH0pWzFdXSlcbiAgICBcdCAgICAvLy5kb21haW4oWzAsIGQzLmV4dGVudChjb25mLnZhbHVlcylbMV1dKVxuICAgIFx0ICAgIC8vLnJhbmdlKFtcIiMzZThiYWRcIiwgXCIjOTc1MjY5XCJdKTtcbiAgICBcdCAgICAucmFuZ2UoW1wiIzNlOGJhZFwiLCBcIiMzZThiYWRcIl0pO1xuICAgIFx0dmFyIGJhY2tncm91bmRDb2xvciA9IFwiI2YxZjFmMVwiO1xuXG4gICAgXHR2YXIgb3JpZ2luID0gW35+KGNvbmYud2lkdGgvMiksIH5+KGNvbmYuaGVpZ2h0LzIpXTtcbiAgICBcdHZhciBzdmcgPSBjb250YWluZXIuYXBwZW5kKFwic3ZnXCIpXG4gICAgXHQgICAgLmF0dHIoXCJ3aWR0aFwiLCBjb25mLmRpYWdvbmFsKVxuICAgIFx0ICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGNvbmYuZGlhZ29uYWwpXG4gICAgXHQgICAgLmFwcGVuZChcImdcIilcbiAgICBcdCAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHJhZGl1cyArIFwiLFwiICsgcmFkaXVzICsgXCIpXCIpO1xuXG4gICAgXHR2YXIgbGFiZWwgPSBmdW5jdGlvbiAociwgY3VyckxhYmVsLCBoYXNEYXRhKSB7XG4gICAgICAgIFx0ICAgIHZhciByYWRzID0gciAqIDE4MCAvIE1hdGguUEk7XG4gICAgICAgIFx0ICAgIHZhciBvZmZzZXQgPSAxNTtcbiAgICAgICAgXHQgICAgc3ZnLmFwcGVuZChcInRleHRcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiY3R0dl9wZXRhbF9sYWJlbFwiKVxuICAgICAgICBcdFx0LmF0dHIoXCJ4XCIsIG9yaWdpblswXSlcbiAgICAgICAgXHRcdC5hdHRyKFwieVwiLCBvcmlnaW5bMV0pXG4gICAgICAgIFx0XHQuYXR0cihcImZvbnQtc2l6ZVwiLCBjb25mLmZvbnRzaXplKVxuICAgICAgICBcdFx0LmF0dHIoXCJmb250LXdlaWdodFwiLCBcImJvbGRcIilcbiAgICAgICAgXHRcdC5hdHRyKFwiZmlsbFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFx0XHQgICAgaWYgKGhhc0RhdGEpIHtcbiAgICAgICAgICAgIFx0XHRcdHJldHVybiBcIiMwMDBcIjtcbiAgICAgICAgXHRcdCAgICB9XG4gICAgICAgIFx0XHQgICAgcmV0dXJuIFwiI2NjY1wiO1xuICAgICAgICBcdFx0fSlcbiAgICAgICAgXHRcdC5hdHRyKFwidGV4dC1hbmNob3JcIiwgKCFpc1JldmVyc2VkKHJhZHMpPyBcInN0YXJ0XCIgOiBcImVuZFwiKSlcbiAgICAgICAgXHRcdC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgKDArTWF0aC5jb3Mocikqb2Zmc2V0KSArIFwiLFwiICsgKDArTWF0aC5zaW4ocikqb2Zmc2V0KSArIFwiKXJvdGF0ZShcIiArIChyYWRzKSArIFwiKXJvdGF0ZShcIiArICghaXNSZXZlcnNlZChyYWRzKT8wOjE4MCkgKyBcIilcIilcbiAgICAgICAgXHRcdC50ZXh0KGN1cnJMYWJlbCk7XG5cbiAgICAgICAgXHQgICAgZnVuY3Rpb24gaXNSZXZlcnNlZCAoZCkge1xuICAgICAgICAgICAgXHRcdHJldHVybiAoZD45MCAmJiBkPDI3MCk7XG4gICAgICAgIFx0ICAgIH1cblxuICAgIFx0fTtcblxuICAgIFx0dmFyIHBldGFsID0gZnVuY3Rpb24gKGwsIHIsIGQsIGNvbG9yKSB7XG4gICAgXHQgICAgdmFyIHggPSBsICogTWF0aC5jb3Mocik7XG4gICAgXHQgICAgdmFyIHkgPSBsICogTWF0aC5zaW4ocik7XG4gICAgXHQgICAgLy92YXIgcmFkcyA9IE1hdGguYXRhbjIoMC14LCAwLXkpICogMTgwIC8gTWF0aC5QSTtcblxuICAgIFx0ICAgIHZhciByZWFseCA9IGQgKiBNYXRoLmNvcyhyKTtcbiAgICBcdCAgICB2YXIgcmVhbHkgPSBkICogTWF0aC5zaW4ocik7XG5cbiAgICBcdCAgICB2YXIgcnggPSBsICogMC44ICogTWF0aC5jb3MocisocmFkaWFucy8yKSk7XG4gICAgXHQgICAgdmFyIHJ5ID0gbCAqIDAuOCAqIE1hdGguc2luKHIrKHJhZGlhbnMvMikpO1xuICAgIFx0ICAgIHZhciByZWFscnggPSBkICogMC44ICogTWF0aC5jb3MocisocmFkaWFucy8yKSk7XG4gICAgXHQgICAgdmFyIHJlYWxyeSA9IGQgKiAwLjggKiBNYXRoLnNpbihyKyhyYWRpYW5zLzIpKTtcblxuICAgIFx0ICAgIHZhciBseCA9IGwgKiAwLjggKiBNYXRoLmNvcyhyLShyYWRpYW5zLzIpKTtcbiAgICBcdCAgICB2YXIgbHkgPSBsICogMC44ICogTWF0aC5zaW4oci0ocmFkaWFucy8yKSk7XG4gICAgXHQgICAgdmFyIHJlYWxseCA9IGQgKiAwLjggKiBNYXRoLmNvcyhyLShyYWRpYW5zLzIpKTtcbiAgICBcdCAgICB2YXIgcmVhbGx5ID0gZCAqIDAuOCAqIE1hdGguc2luKHItKHJhZGlhbnMvMikpO1xuXG4gICAgXHQgICAgLy8gc3ZnLmFwcGVuZCAoXCJsaW5lXCIpXG4gICAgXHQgICAgLy8gXHQuYXR0cihcImNsYXNzXCIsIFwic3RpdGNoZXNcIilcbiAgICBcdCAgICAvLyBcdC5hdHRyKFwieDFcIiwgb3JpZ2luWzBdKVxuICAgIFx0ICAgIC8vIFx0LmF0dHIoXCJ5MVwiLCBvcmlnaW5bMV0pXG4gICAgXHQgICAgLy8gXHQuYXR0cihcIngyXCIsIG9yaWdpblswXSArIHgpXG4gICAgXHQgICAgLy8gXHQuYXR0cihcInkyXCIsIG9yaWdpblsxXSArIHkpXG5cbiAgICBcdCAgICAvLyBzdmcuYXBwZW5kKFwibGluZVwiKVxuICAgIFx0ICAgIC8vIFx0LmF0dHIoXCJjbGFzc1wiLCBcInN0aXRjaGVzXCIpXG4gICAgXHQgICAgLy8gXHQuYXR0cihcIngxXCIsIG9yaWdpblswXSlcbiAgICBcdCAgICAvLyBcdC5hdHRyKFwieTFcIiwgb3JpZ2luWzFdKVxuICAgIFx0ICAgIC8vIFx0LmF0dHIoXCJ4MlwiLCBvcmlnaW5bMF0gKyByeClcbiAgICBcdCAgICAvLyBcdC5hdHRyKFwieTJcIiwgb3JpZ2luWzFdICsgcnkpXG5cbiAgICBcdCAgICAvLyBzdmcuYXBwZW5kKFwibGluZVwiKVxuICAgIFx0ICAgIC8vIFx0LmF0dHIoXCJjbGFzc1wiLCBcInN0aXRjaGVzXCIpXG4gICAgXHQgICAgLy8gXHQuYXR0cihcIngxXCIsIG9yaWdpblswXSArIHJ4KVxuICAgIFx0ICAgIC8vIFx0LmF0dHIoXCJ5MVwiLCBvcmlnaW5bMV0gKyByeSlcbiAgICBcdCAgICAvLyBcdC5hdHRyKFwieDJcIiwgb3JpZ2luWzBdICsgeClcbiAgICBcdCAgICAvLyBcdC5hdHRyKFwieTJcIiwgb3JpZ2luWzFdICsgeSk7XG5cbiAgICBcdCAgICAvLyBzdmcuYXBwZW5kKFwibGluZVwiKVxuICAgIFx0ICAgIC8vIFx0LmF0dHIoXCJjbGFzc1wiLCBcInN0aXRjaGVzXCIpXG4gICAgXHQgICAgLy8gXHQuYXR0cihcIngxXCIsIG9yaWdpblswXSlcbiAgICBcdCAgICAvLyBcdC5hdHRyKFwieTFcIiwgb3JpZ2luWzFdKVxuICAgIFx0ICAgIC8vIFx0LmF0dHIoXCJ4MlwiLCBvcmlnaW5bMF0gKyBseClcbiAgICBcdCAgICAvLyBcdC5hdHRyKFwieTJcIiwgb3JpZ2luWzFdICsgbHkpXG5cbiAgICBcdCAgICAvLyBzdmcuYXBwZW5kKFwibGluZVwiKVxuICAgIFx0ICAgIC8vIFx0LmF0dHIoXCJjbGFzc1wiLCBcInN0aXRjaGVzXCIpXG4gICAgXHQgICAgLy8gXHQuYXR0cihcIngxXCIsIG9yaWdpblswXSArIGx4KVxuICAgIFx0ICAgIC8vIFx0LmF0dHIoXCJ5MVwiLCBvcmlnaW5bMV0gKyBseSlcbiAgICBcdCAgICAvLyBcdC5hdHRyKFwieDJcIiwgb3JpZ2luWzBdICsgeClcbiAgICBcdCAgICAvLyBcdC5hdHRyKFwieTJcIiwgb3JpZ2luWzFdICsgeSk7XG5cbiAgICBcdCAgICB2YXIgbGluZSA9IGQzLnN2Zy5saW5lKClcbiAgICAgICAgXHRcdC54KGZ1bmN0aW9uIChkKSB7cmV0dXJuIGQueDt9KVxuICAgICAgICBcdFx0LnkoZnVuY3Rpb24gKGQpIHtyZXR1cm4gZC55O30pXG4gICAgICAgIFx0XHQuaW50ZXJwb2xhdGUoXCJiYXNpc1wiKTtcblxuICAgIFx0ICAgIC8vIG1heCBwZXRhbCBzaXplIChkb3R0ZWQpXG4gICAgXHQgICAgdmFyIGRhdGEgPSBbXG4gICAgICAgIFx0XHR7eDpvcmlnaW5bMF0sICB5Om9yaWdpblsxXX0sXG4gICAgICAgIFx0XHR7eDpvcmlnaW5bMF0rcngsIHk6b3JpZ2luWzFdK3J5fSxcbiAgICAgICAgXHRcdHt4Om9yaWdpblswXSt4LCB5Om9yaWdpblswXSt5fSxcbiAgICAgICAgXHRcdHt4Om9yaWdpblswXStseCwgeTpvcmlnaW5bMF0rbHl9LFxuICAgICAgICBcdFx0e3g6b3JpZ2luWzBdLCAgeTpvcmlnaW5bMV19XG4gICAgXHQgICAgXTtcblxuICAgIFx0ICAgIC8vIHJlYWwgcGV0YWwgc2l6ZVxuICAgIFx0ICAgIHZhciByZWFsRGF0YSA9IFtcbiAgICAgICAgXHRcdHt4Om9yaWdpblswXSwgIHk6b3JpZ2luWzFdfSxcbiAgICAgICAgXHRcdHt4Om9yaWdpblswXStyZWFscngsIHk6b3JpZ2luWzFdK3JlYWxyeX0sXG4gICAgICAgIFx0XHR7eDpvcmlnaW5bMF0rcmVhbHgsIHk6b3JpZ2luWzFdK3JlYWx5fSxcbiAgICAgICAgXHRcdHt4Om9yaWdpblswXStyZWFsbHgsIHk6b3JpZ2luWzFdK3JlYWxseX0sXG4gICAgICAgIFx0XHR7eDpvcmlnaW5bMF0sICB5Om9yaWdpblsxXX1cbiAgICBcdCAgICBdO1xuICAgIFx0ICAgIHN2Zy5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgIFx0XHQuYXR0cihcImNsYXNzXCIsIFwic3RpdGNoZXNcIilcbiAgICAgICAgXHRcdC5hdHRyKFwiZFwiLCBsaW5lKGRhdGEpKVxuICAgICAgICBcdFx0LnN0eWxlKFwic3Ryb2tlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXHRcdCAgICBpZiAoZD4wKSB7XG4gICAgICAgICAgICBcdFx0XHRyZXR1cm4gXCIjM2U4YmFkXCI7XG4gICAgICAgIFx0XHQgICAgfVxuICAgICAgICAgICAgXHRcdHJldHVybiBcIiNjY2NcIjtcbiAgICAgICAgXHRcdH0pXG4gICAgICAgIFx0XHQuc3R5bGUoXCJzdHJva2Utd2lkdGhcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBcdFx0ICAgIGlmIChkPjApIHtcbiAgICAgICAgICAgIFx0XHRcdHJldHVybiBcIjAuNXB4XCI7XG4gICAgICAgIFx0XHQgICAgfVxuICAgICAgICAgICAgXHRcdHJldHVybiBcIjAuMjVweFwiO1xuICAgICAgICBcdFx0fSk7XG5cbiAgICBcdCAgICBzdmcuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICBcdFx0LmF0dHIoXCJjbGFzc1wiLCBcInBldGFsXCIpXG4gICAgICAgIFx0XHQuYXR0cihcImRcIiwgbGluZShyZWFsRGF0YSkpXG4gICAgICAgIFx0XHQuYXR0cihcImZpbGxcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29sb3I7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgXHR9O1xuXG4gICAgXHR2YXIgcGV0YWxzID0gZnVuY3Rpb24gKCkge1xuICAgIFx0ICAgIHZhciByID0gMDtcbiAgICBcdCAgICBjb25mLnZhbHVlcy5mb3JFYWNoIChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICBcdFx0aWYgKGQuYWN0aXZlKSB7XG4gICAgICAgIFx0XHQgICAgdmFyIGwgPSByYWRpdXM7XG4gICAgICAgIFx0XHQgICAgcGV0YWwgKGwsIHIsIHNpemVTY2FsZShkLnZhbHVlKSwgY29sb3JTY2FsZShkLnZhbHVlKSk7XG4gICAgICAgIFx0XHR9XG4gICAgICAgIFx0XHRyICs9IHJhZGlhbnM7XG5cbiAgICBcdCAgICB9KTtcbiAgICBcdCAgICByID0gMDtcbiAgICBcdCAgICBjb25mLnZhbHVlcy5mb3JFYWNoIChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICBcdFx0aWYgKGQuYWN0aXZlKSB7XG4gICAgICAgIFx0XHQgICAgdmFyIGwgPSByYWRpdXM7XG4gICAgICAgIFx0XHQgICAgbGFiZWwgKHIsIGQubGFiZWwsIGQudmFsdWU+MCk7XG4gICAgICAgIFx0XHR9XG4gICAgICAgIFx0XHRyICs9IHJhZGlhbnM7XG4gICAgXHQgICAgfSk7XG4gICAgXHR9O1xuXG4gICAgICAgIHBldGFscygpO1xuICAgIH07XG5cbiAgICByZW5kZXIudmFsdWVzID0gZnVuY3Rpb24gKHZhbHMpIHtcbiAgICBcdGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIFx0ICAgIHJldHVybiBjb25mLnZhbHVlcztcbiAgICBcdH1cbiAgICBcdGNvbmYudmFsdWVzID0gdmFscztcbiAgICBcdHJhZGlpID0gdmFscy5sZW5ndGg7XG4gICAgXHRyYWRpYW5zID0gMiAqIE1hdGguUEkgLyByYWRpaTtcbiAgICBcdHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICByZW5kZXIuZGlhZ29uYWwgPSBmdW5jdGlvbiAoZCkge1xuICAgIFx0aWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgXHQgICAgcmV0dXJuIGNvbmYuZGlhZ29uYWw7XG4gICAgXHR9XG4gICAgXHRjb25mLmRpYWdvbmFsID0gZDtcbiAgICBcdHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICByZW5kZXIuZm9udHNpemUgPSBmdW5jdGlvbiAoZikge1xuICAgIFx0aWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgXHQgICAgcmV0dXJuIGNvbmYuZm9udHNpemU7XG4gICAgXHR9XG4gICAgXHRjb25mLmZvbnRzaXplID0gZjtcbiAgICBcdHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICByZXR1cm4gcmVuZGVyO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmxvd2VyVmlldztcbiJdfQ==
