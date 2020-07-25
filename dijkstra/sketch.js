var graph;
var ops = [];

function setup() {
  
  graph = new Graph(0, 30);
  textFont('Oswald', 20);
  create_interaction();
  createCanvas(windowWidth,windowHeight);
}

function draw() {
  background(0);
  graph.show();
}

function create_interaction(){
  
  // edge to add
  ops.push(new Option('add edge', 3));
  ops[0].button.mousePressed(add_edge);
  
  // edge to delete
  ops.push(new Option('delete edge', 2));
  ops[1].button.mousePressed(delete_edge);
    
  // change n
  ops.push(new Option('change N', 1));
  ops[2].button.mousePressed(change_n);
  
  // random graph
  ops.push(new Option('random graph', 0));
  ops[3].button.mousePressed(create_random);
  
  // add start dijkstra
  ops.push(new Option('add start', 1));
  ops[4].button.mousePressed(add_start);
  
  // run dijkstra
  ops.push(new Option('run Dijkstra', 0));
  ops[5].button.mousePressed(cal_dijkstra);

  // restart
  ops.push(new Option('restart', 0));
  ops[6].button.mousePressed(restart);
  
}


function valid(input_val){
  if(input_val == "" || isNaN(input_val)) return -1;
  return parseFloat(input_val);
}

function add_edge(){
  
  var a = valid(ops[0].inputs[0].value());
  var b = valid(ops[0].inputs[1].value());
  var c = valid(ops[0].inputs[2].value());
  
  graph.add_edge(a, b, c);
}

function delete_edge(){
  
  var a = valid(ops[1].inputs[0].value());
  var b = valid(ops[1].inputs[1].value());
  
  graph.delete_edge(a, b);
}

function change_n(){
  
  var a = valid(ops[2].inputs[0].value());
  graph.change_n(a);
  
}

function create_random(){
  graph.create_random();
}

function cal_dijkstra(){
  graph.cal_dijkstra();
}

function add_start(){
  var a = valid(ops[4].inputs[0].value());
  graph.add_start(a);
}

function restart(){
  graph.init_dijkstra();
}