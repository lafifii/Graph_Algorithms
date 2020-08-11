var astar ;
var w_screen;
var h_screen;

var w = window.innerWidth;
var h = window.innerHeight;

window.onresize = function() {

  w = window.innerWidth;
  h = window.innerHeight;
  resizeCanvas(w, h);

  w_screen = width/2;
  h_screen = w_screen*0.8;

  astar.width_ = w_screen;
  astar.height_ = h_screen;
}

function setup() {
  createCanvas(w, h);
  textFont('Montserrat', 20);
  w_screen = width/2;
  h_screen = w_screen*0.8;

  var rows = parseInt(w_screen/18);
  var cols = parseInt(h_screen/18);
  astar = new AStar(rows, cols, w_screen, h_screen, slider.value());
}

function draw() {
  background('#8d96a3');

  astar.frame_rate = slider.value()*3;
  astar.show();

  textSize(30);
  fill(0);
  stroke(0);
  text("A* Search", width*0.75 - textWidth('A* Search')/2, h_screen/2 - 25);
  text("Algorithm", width*0.75 - textWidth('Algorithm')/2, h_screen/2);

  textSize(20);
  var txt = astar.option_h ? "Manhattan Distance" : "Euclidean Distance";
  text(txt, width*0.75 - textWidth(txt)/2, h_screen/2 + 25);


  if(mouseX <= w_screen && mouseY <= h_screen) cursor(HAND);
  else cursor(ARROW);

}

function valid(input_val){
  if(input_val == "" || isNaN(input_val)) return -1;
  return parseFloat(input_val);
}


function change_start(){
  var a = valid(ops[1].inputs[0].value());
  var b = valid(ops[1].inputs[1].value());
  astar.change_start(a, b);
}

function change_end(){
  var a = valid(ops[2].inputs[0].value());
  var b = valid(ops[2].inputs[1].value());
  astar.change_end(a, b);
}

function init(){
    astar.init();
}

function change_distance(){
  ops[4].change_text();
  astar.option_h = ops[4].id;
}

function start_animation(){
    astar.start_animation(ops[4].id);
}

function mouseClicked(){
  astar.change_obstacle(mouseY, mouseX);
}

function change_dimensions(){
  var a = valid(ops[0].inputs[0].value());
  var b = valid(ops[0].inputs[1].value());
  astar.change_dimensions(a, b);
}

function create_interaction(){

  ops.push(new Option(['change dimensions ( rxc )'], 2));
  ops[0].button.mousePressed(change_dimensions);

  ops.push(new Option(['change start'], 2));
  ops[1].button.mousePressed(change_start);

  ops.push(new Option(['change end'], 2));
  ops[2].button.mousePressed(change_end);

  ops.push(new Option(['run a*'], 0));
  ops[3].button.mousePressed(start_animation);

  ops.push(new Option(['change heuristic', 'change heuristic'], 0));
  ops[4].button.mousePressed(change_distance);

  ops.push(new Option(['restart'], 0));
  ops[5].button.mousePressed(init);
}
