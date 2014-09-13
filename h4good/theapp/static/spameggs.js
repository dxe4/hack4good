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
    console.log(jsonData);
    for(var key in window.world_map.shapes) {

        var path = new Kinetic.Path({
            data: worldMap.shapes[key],
              fill: jsonData[key],//'#eee',
              stroke: '#555',
              strokeWidth: 1
            }
        );

        path.country_key = key;

        path.on('mouseover', function() {
          console.log(this.country_key);
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
console.log("b");
$(document).ready(function() {

	console.log("a");

  $.get( "/get_data", function( data ) {
  	console.log("b");
      draw(data);
    });

});
