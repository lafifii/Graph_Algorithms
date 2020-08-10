var ops = [];
var slider;

function preload(){
  create_interaction();
  var frame_rate = 2;
  slider = createSlider(1, 20, frame_rate);
}
