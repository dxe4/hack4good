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

function send_request_by_contry(country, cb) {
    $.get( "/get-data/"+ country +"/"+ year, function( data ) {
        // draw(data);
        console.log(data);
        if(cb){
          cb();
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
