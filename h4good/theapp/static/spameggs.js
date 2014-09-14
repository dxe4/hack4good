// $£"$"£$"s"
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

}


function send_request(cb){
    $.get( "/get-data/"+ fname +"/"+ year, function( data ) {
        draw(data);
        if(cb){
          cb();
        }
      
    });
}


function draw_by_country(dataset){
  console.log(dataset);
   var w = 20,
       h = 80;
  
  var x = d3.scale.linear()
      .domain([0, 1])
      .range([0, w]);
  
  var y = d3.scale.linear()
     .domain([0, 100])
     .rangeRound([0, h]);

 var chart = d3.select("body")
     .append("svg:svg")
     .attr("class", "chart")
     .attr("width", w * dataset.length - 1)
     .attr("height", h);

     chart.selectAll("rect")
     .data(dataset)
     .enter().append("svg:rect")
     .attr("x", function(d, i) { return x(i) - .5; })
     .attr("y", function(d) { return h - d; })
     .attr("width", w)
     .attr("height", function(d) { return d * 15; });



}

function send_request_by_contry(country, cb) {
    $.get( "/get-data/" + fname + "/"+country, function( data ) {
        // draw(data);
        draw_by_country(data);
        if(cb){
          cb(data);
        }
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
        if(!country_color){
          country_color = "#993399";
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
          this.setFill('#111');
          this.moveTo(topLayer);
          topLayer.drawScene();
        });
        
        path.on('mouseout', function() {
          this.setFill('#eee');
          this.moveTo(mapLayer);
          topLayer.draw();
        });

        path.on('click', function() {
            send_request_by_contry(this.country_key);
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
