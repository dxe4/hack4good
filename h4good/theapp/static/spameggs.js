// $£"$"£$"s"
var fname = "data-per-capita";
var year = "2010";


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

        var path = new Kinetic.Path({
            data: worldMap.shapes[key],
              fill: jsonData[key],
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
        
        mapLayer.add(path);
    }
    stage.add(mapLayer);
    stage.add(topLayer);
}

function send_request(){
    $.get( "/get-data/"+ fname +"/"+ year, function( data ) {
      draw(data);
    });
}


function registerListeners(){
  // WHHAAAAAT
  $(".data-dropdown li").click(function() {
      var type = $(this).data("type");
      var val = $(this).data(type);

      if(type === "year"){
          year = val;
      }  else if(type === "fname") {
          fname = val;
      } else{
         return;
      }
      send_request();
  });
}


$(document).ready(function() {
  registerListeners();
  send_request();
});
