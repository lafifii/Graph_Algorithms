var bfs;



function setup() {

  bfs = new BFS(0, 30, 0, 0, slider.value());
  textFont('Oswald', 20);
  createCanvas(windowWidth,windowHeight);
}

function draw() {
  background('#8d96a3');
  bfs.frame_rate = slider.value();
  bfs.show();
}

function create_interaction(){

  // edge to add
  ops.push(new Option(['add edge'], 2));
  ops[0].button.mousePressed(add_edge);

  // edge to delete
  ops.push(new Option(['delete edge'], 2));
  ops[1].button.mousePressed(delete_edge);

  // change n
  ops.push(new Option(['change N'], 1));
  ops[2].button.mousePressed(change_n);

  // random graph
  ops.push(new Option(['random graph'], 0));
  ops[3].button.mousePressed(create_random);

  // add start
  ops.push(new Option(['add start'], 1));
  ops[4].button.mousePressed(add_start);

  // run bfs
  ops.push(new Option(['run BFS'], 0));
  ops[5].button.mousePressed(cal_bfs);

  // restart
  ops.push(new Option(['restart'], 0));
  ops[6].button.mousePressed(restart);

  // show all or not
  ops.push(new Option(['show path', 'show all edges'], 0));
  ops[7].button.mousePressed(change_state);

  // finish
  ops.push(new Option(['finish'], 0));
  ops[8].button.mousePressed(finish_animation);
}

function finish_animation(){
  bfs.finish_animation();
}

function valid(input_val){
  if(input_val == "" || isNaN(input_val)) return -1;
  return parseFloat(input_val);
}

function add_edge(){

  var a = valid(ops[0].inputs[0].value());
  var b = valid(ops[0].inputs[1].value());
  var c = 0;

  bfs.graph.add_edge(a, b, c);
  bfs.init_bfs();
}

function delete_edge(){

  var a = valid(ops[1].inputs[0].value());
  var b = valid(ops[1].inputs[1].value());

  bfs.graph.delete_edge(a, b);
  bfs.init_bfs();
}

function change_n(){

  var a = valid(ops[2].inputs[0].value());
  bfs.graph.change_n(a);
  bfs.init_bfs();

}

function create_random(){
  bfs.graph.create_random();
  bfs.init_bfs();
}

function cal_bfs(){
  bfs.cal_bfs();
}

function add_start(){
  var a = valid(ops[4].inputs[0].value());
  bfs.add_start(a);
}

function restart(){
  bfs.init_bfs();
}

function change_state(){
  ops[7].change_text();
  bfs.graph.show_all_edges();
}
