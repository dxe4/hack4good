// $£"$"£$"s"

(function(d){d.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(f,e){d.fx.step[e]=function(g){if(!g.colorInit){g.start=c(g.elem,e);g.end=b(g.end);g.colorInit=true}g.elem.style[e]="rgb("+[Math.max(Math.min(parseInt((g.pos*(g.end[0]-g.start[0]))+g.start[0]),255),0),Math.max(Math.min(parseInt((g.pos*(g.end[1]-g.start[1]))+g.start[1]),255),0),Math.max(Math.min(parseInt((g.pos*(g.end[2]-g.start[2]))+g.start[2]),255),0)].join(",")+")"}});function b(f){var e;if(f&&f.constructor==Array&&f.length==3){return f}if(e=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)){return[parseInt(e[1]),parseInt(e[2]),parseInt(e[3])]}if(e=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)){return[parseFloat(e[1])*2.55,parseFloat(e[2])*2.55,parseFloat(e[3])*2.55]}if(e=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}if(e=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}if(e=/rgba\(0, 0, 0, 0\)/.exec(f)){return a.transparent}return a[d.trim(f).toLowerCase()]}function c(g,e){var f;do{f=d.css(g,e);if(f!=""&&f!="transparent"||d.nodeName(g,"body")){break}e="backgroundColor"}while(g=g.parentNode);return b(f)}var a={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]}})(jQuery);

var fname = "data-per-capita";
var year = "2010";

var bad_dict = {
  "data-per-capita": "CO2",
  "land-under-cereal-production": "Land Under Cereal Production",
  'poverty-headcount-ratio-at-rural-poverty-line': 'Poverty headcount ratio at rural poverty line',
  'agricultural-land': 'Agricultural Land',
  'cereal-yield': 'Cereal yield (kg per hectare)',
  'agriculture-value-added': 'Agriculture, value added (% of GDP)',
  'inflation-consumer-prices': 'Inflation, consumer prices (annual %)',
  'inflation-gdp-deflator': 'Inflation, GDP deflator (annual %)',
  'employees-agriculture-male': 'Employees, agriculture, male (% of male employment)',
  'employees-agriculture-female': 'Employees, agriculture, female (% of female employment)',
  'plant-species-threatened': 'Plant species (higher), threatened',
};


function send_request(cb){
    $.get( "/get-data/"+ fname +"/"+ year, function( data ) {
        draw(data);
        if(cb){
          cb();
        }

    });
}


   var w = 20,
       h = 100;

  var x = d3.scale.linear()
      .domain([0, 1])
      .range([0, w]);

  var y = d3.scale.linear()
     .domain([0, 50])
     .rangeRound([h, 0]);

  var color = d3.scale.linear()
     .domain([0, 50])
     .rangeRound([150, 250]);

  var colorGroup = d3.scale.ordinal()
     .range(['rgb(60, 150, 150)', '#0FD495', '#2EFC79', '#2EFCED']);

if(!window.datas) window.datas = [];

function draw_by_country(dataset){
  $("svg").remove();
  $('#thechart span').remove();

  window.datas.push(dataset);

 var chart = d3.select("#thechart")
     .style('width', w * dataset.length - 1 + 'px')
     .append("svg:svg")
     .attr("class", "chart")
     .attr("width", w * dataset.length - 1)
     .attr("height", h);

     chart.selectAll("rect")
     .data(dataset)
     .enter().append("svg:rect")
     .attr("x", function(d, i) { return x(i) - 0.5; })
     .attr("y", function(d) { return d * 3; })
     .attr("width", w)
     .attr("height", function(d) { return h - d; })
     .style("fill", function(d) { return 'rgb(60, 150, ' + color(d) + ')'; });

    
  d3.select('#thechart')
       .selectAll('span')
       .data([dataset.country])
       .enter().append('span')
       .style('position', 'absolute')
       .style('display', 'block')
       .style('width', '10px')
       .style('height', '10px')
       .style('left', '70px')
       .style('top', function(d, i) { return (i+1) * -16 - 10 + 'px' })
       .style('border-radius', '50%')
       .style('background', function(d, i) { return color(50) })
       .style('text-indent', '20px')
       .text(function(d) {
           return d
       });
}

function compare() {
    var flag = 1;
    var args = Array.prototype.slice.call(arguments);
    
    var dataset = [];
    
    var biggest = d3.max(args).length;
    for(var i = 0, len = biggest; i < len; i++) {
        args.forEach(function(e) {
            dataset.push(e[i] || 0);
        })
    }
        
     $("svg").remove();
     $('#thechart span').remove();
 var cg = colorGroup.copy().range( colorGroup.range().slice(0, args.length) );
 var chart = d3.select("#thechart")
     .style('position', 'relative')
     .style('width', w * dataset.length - 1 + 'px')
     .append("svg:svg")
     .attr("class", "chart")
     .attr("width", w * dataset.length - 1)
     .attr("height", h);

     chart.selectAll("rect")
     .data(dataset)
     .enter().append("svg:rect")
     .attr("x", function(d, i) { return x(i) - 0.5; })
     .attr("y", function(d) { return d * 3; })
     .attr("width", w)
     .attr("height", function(d) { return h - d;})
     .style("fill", function(d, i) { return cg(i); });
    
 d3.select('#thechart')
       .selectAll('span')
       .data(args)
       .enter().append('span')
       .style('position', 'absolute')
       .style('display', 'block')
       .style('width', '10px')
       .style('height', '10px')
       .style('left', function(d, i) { return Math.round( (i+1) / 2) * 70 + 'px' })
       .style('top', function(d, i) { if(i >= 2) i -= 2; return (i+1) * -16 - 10 + 'px' })
       .style('border-radius', '50%')
       .style('background', function(d, i) { return cg(i) })
       .style('text-indent', '20px')
       .text(function(d) {
           return d.country
       });
 
}

function send_request_by_contry(country, cb) {
    $.get( "/get-data/" + fname + "/"+country, function( data ) {
        // draw(data);
        if(cb){
          cb(data);
        }
        data.country = country;
        draw_by_country(data);
        if(selected.length > 1) compare.apply(this, selected);
    });

}


function registerListeners(){
  // WHHAAAAAT £"!$£"$£"$"£
  $(".data-dropdown li").click(function() {
      var type = $(this).data("type");
      var val = $(this).data(type);

      if(type === "year"){
          year = val;
      }  else if(type === "fname") {
          fname = val;
      }
  });
  $("#search").click(function() {
      send_request(function(){
         $("#title").text(bad_dict[fname]);
         $("#year").text(year);
      });
  });
}

var selected = [];

function draw(jsonData){

    var path_dict = {};

    var stage = new Kinetic.Stage({
        container: 'container',
        width: 1200,
        height: 1200
    });
    var mapLayer = new Kinetic.Layer({
        y: 20,
        scale: 1
    });
    var topLayer = new Kinetic.Layer({
        y: 20,
        scale: 1
    });
    /*
    * loop through country data stroed in the worldMap
    * variable defined in the worldMap.js asset
    */
    for(var key in window.world_map.shapes) {

        var country_color = jsonData[key];
        console.log(country_color);
        if(!country_color){
          country_color = "#993399";
        } else {
           quadruplet = [parseInt(country_color.slice(1, 3), 16), parseInt(country_color.slice(3, 5), 16), parseInt(country_color.slice(5), 16), 1];
           country_code = country_code == '#993399' ? '#993399' : 'rgb(' + (quadruplet[0] - 100) + ',' + (quadruplet[1] - 70) + ', ' + quadruplet[2] + ')';
        }
        var path = new Kinetic.Path({
            data: worldMap.shapes[key],
              fill: country_code,
              stroke: '#555',
              strokeWidth: 1
            }
        );

        path.country_key = key;

        path.on('mouseover', function() {
          this.setFill('#409EEF');
          this.moveTo(topLayer);
          topLayer.drawScene();
        });

        path.on('mouseout', function() {
          this.setFill('#eee');
          this.moveTo(mapLayer);
          topLayer.draw();
        });

        path.on('click', function(e) {
            if(e.shiftKey) {
                if(selected.length >= 4) return;
                send_request_by_contry(this.country_key, function(d) {
                    selected.push(d);
                })
            }
            else {   
               send_request_by_contry(this.country_key, function(d) {
                   selected = [d];
               });
            }
        });

        mapLayer.add(path);
    }
    stage.add(mapLayer);
    stage.add(topLayer);
}


$(document).ready(function() {
  registerListeners();
  send_request();
});

/*
Exception: missing ) after argument list
@Scratchpad/1:211
*/