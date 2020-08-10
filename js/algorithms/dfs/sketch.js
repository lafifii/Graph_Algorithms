var dfs;

function setup() {

  dfs = new DFS(0, 30, 0, 0, slider.value());
  textFont('Oswald', 20);
  createCanvas(windowWidth,windowHeight);

}

function draw() {
  background('#8d96a3');
  dfs.frame_rate = slider.value();
  dfs.show();
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

  // run dfs
  ops.push(new Option(['run DFS'], 0));
  ops[4].button.mousePressed(cal_dfs);

  // restart
  ops.push(new Option(['restart'], 0));
  ops[5].button.mousePressed(restart);

  // show all or not
  ops.push(new Option([ 'show forward edges', 'show all edges'], 0));
  ops[6].button.mousePressed(change_state);

  // finish
  ops.push(new Option(['finish'], 0));
  ops[7].button.mousePressed(finish_animation);
}

function finish_animation(){
  dfs.finish_animation();
}

function valid(input_val){
  if(input_val == "" || isNaN(input_val)) return -1;
  return parseFloat(input_val);
}

function add_edge(){

  var a = valid(ops[0].inputs[0].value());
  var b = valid(ops[0].inputs[1].value());
  var c = 0;

  dfs.graph.add_edge(a, b, c);
  dfs.init_dfs();
}

function delete_edge(){

  var a = valid(ops[1].inputs[0].value());
  var b = valid(ops[1].inputs[1].value());

  dfs.graph.delete_edge(a, b);
  dfs.init_dfs();
}

function change_n(){

  var a = valid(ops[2].inputs[0].value());
  dfs.graph.change_n(a);
  dfs.init_dfs();

}

function create_random(){
  dfs.graph.create_random();
  dfs.init_dfs();
}

function cal_dfs(){
  dfs.cal_dfs();
}


function restart(){
  dfs.init_dfs();
}

function change_state(){
  ops[6].change_text();
  dfs.graph.show_all_edges();
}
