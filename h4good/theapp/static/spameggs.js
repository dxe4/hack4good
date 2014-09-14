// $£"$"£$"s

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
        $('svg, #thechart span').remove();
        draw(data);
        if(cb){
          cb();
        }
<<<<<<< Updated upstream
        
//         if(selected.length == 1) return send_request_by_contry(selected[0].country, function(d) {
//             selected = [d];
//         });
//         var oldS = selected;
//         selected = [];
//         var requests = [];
//         oldS.forEach(function(i, index) {
//             requests.push($.get( "/get-data/" + fname + "/"+i.country, function( data ) {
//               data.country = i.country;
//               selected.push(data);
//             }));
//         })
        
//         $.when.apply($, requests).then(function() {
//             console.log(arguments);
//             compare.apply(window, selected);
//         })
//        $('#search').prop('disabled', false);
=======
        if(!selected.length) return $('svg, #thechart span').remove();
        if(selected.length == 1) return send_request_by_contry(selected[0].country, function(d) {
            selected = [d];
        });
        var oldS = selected;
        selected = [];
        var requests = [];
        oldS.forEach(function(i, index) {
            requests.push($.get( "/get-data/" + fname + "/"+i.country, function( data ) {
              data.country = i.country;
              selected.push(data);
            }));
        })
        
        $.when.apply($, requests).then(function() {
            console.log(arguments);
            compare.apply(window, selected);
        })
/*
Exception: return not in function
@Scratchpad/1:1
*/
>>>>>>> Stashed changes
    });
}


function draw_by_country(dataset){
  $("svg").remove();
  $('#thechart span').remove();

 var chart = d3.select("#thechart")
     //.style('width', w * dataset.length - 1 + 'px')
     .append("svg:svg")
     .attr("class", "chart")
     .attr("width", w * dataset.length - 1)
     .attr("height", h);

     chart.selectAll("rect")
     .data(dataset)
     .enter().append("svg:rect")
     .attr("x", function(d, i) { return x(i) - 0.5; })
     .attr('y', '100')
     .attr("width", w)
     .attr('height', '0')
<<<<<<< Updated upstream
     .style('fill', '#fff')
     .transition()
     .duration(2000)
     .attr("y", function(d) { return d * 3; })
=======
>>>>>>> Stashed changes
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
    
    $('#thechart').addClass('active');
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
     //.style('width', w * dataset.length - 1 + 'px')
     .append("svg:svg")
     .attr("class", "chart")
     .attr("width", w * dataset.length - 1)
     .attr("height", h);

     chart.selectAll("rect")
     .data(dataset)
     .enter().append("svg:rect")
     .attr("x", function(d, i) { return x(i) - 0.5; })
     .attr("width", w)
     .attr('y', '100')
     .attr('height', '0')
     .attr('fill', 'white')
     .transition()
     .duration(2000)
     .attr("y", function(d) { return d * 3; })
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
    
   $('#thechart').addClass('active');
 
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
<<<<<<< Updated upstream
        width: 1000,
=======
        width: 1200,
>>>>>>> Stashed changes
        height: 500
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

        var nodata = '#000'
        
        if(!country_color){
          country_color = nodata
        } else {
            quadruplet = [parseInt(country_color.slice(1, 3), 16), parseInt(country_color.slice(3, 5), 16), parseInt(country_color.slice(5), 16), 1];
           country_color = 'rgb(' + (quadruplet[0] - 100) + ',' + (quadruplet[1] - 70) + ', ' + quadruplet[2] + ')';
        }
        var path = new Kinetic.Path({
            data: worldMap.shapes[key],
              fill: country_color,
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
    
   window.w = 20;
   window.h = 100;

  window.x = d3.scale.linear()
      .domain([0, 1])
      .range([0, w]);

  window.y = d3.scale.linear()
     .domain([0, 50])
     .rangeRound([h, 0]);

  window.color = d3.scale.linear()
     .domain([0, 50])
     .rangeRound([150, 250]);

  window.colorGroup = d3.scale.ordinal()
     .range(['rgb(60, 150, 150)', '#0FD495', '#2EFC79', '#2EFCED']);
    
    $('#container').hover(function() {
        $('#thechart').removeClass('active');
    })
});
