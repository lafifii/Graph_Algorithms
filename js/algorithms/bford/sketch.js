var bford;

function setup() {

  bford = new BellmanFord(0, 30, -100000, 30, slider.value());
  textFont('Oswald', 20);
  createCanvas(windowWidth,windowHeight);
}

function draw() {
  background('#8d96a3');
  bford.frame_rate = slider.value();
  bford.show();
}

function create_interaction(){

  // edge to add
  ops.push(new Option(['add edge'], 3));
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

  // add start bford
  ops.push(new Option(['add start'], 1));
  ops[4].button.mousePressed(add_start);

  // run bford
  ops.push(new Option(['run Bellman Ford'], 0));
  ops[5].button.mousePressed(cal_bellman_ford);

  // restart
  ops.push(new Option(['restart'], 0));
  ops[6].button.mousePressed(restart);

  // show all or not
  ops.push(new Option(['show evaluated edge', 'show all edges'], 0));
  ops[7].button.mousePressed(change_state);

  // finish
  ops.push(new Option(['finish'], 0));
  ops[8].button.mousePressed(finish_animation);


}

function finish_animation(){
  bford.finish_animation();
}

function valid(input_val){
  if(input_val == "" || isNaN(input_val)) return -1;
  return parseFloat(input_val);
}

function add_edge(){

  var a = valid(ops[0].inputs[0].value());
  var b = valid(ops[0].inputs[1].value());
  var c = valid(ops[0].inputs[2].value());

  bford.graph.add_edge(a, b, c);
  bford.init_bellman_ford();
}

function delete_edge(){

  var a = valid(ops[1].inputs[0].value());
  var b = valid(ops[1].inputs[1].value());

  bford.graph.delete_edge(a, b);
  bford.init_bellman_ford();
}

function change_n(){

  var a = valid(ops[2].inputs[0].value());
  bford.graph.change_n(a);
  bford.init_bellman_ford();

}

function create_random(){
  bford.graph.create_random();
  bford.init_bellman_ford();
}

function cal_bellman_ford(){
  bford.cal_bellman_ford();
}

function add_start(){
  var a = valid(ops[4].inputs[0].value());
  bford.add_start(a);
}

function restart(){
  bford.init_bellman_ford();
}

function change_state(){
  ops[7].change_text();
  bford.graph.show_all_edges();
}
