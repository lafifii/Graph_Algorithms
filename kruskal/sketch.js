var kruskal;
var ops = [];

function setup() {

  kruskal = new Kruskal(0, 30, -1000000, 30, 1);
  textFont('Oswald', 20);
  create_interaction();
  createCanvas(windowWidth,windowHeight);
}

function draw() {
  background(0);
  kruskal.show();
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

  // add start kruskal
  ops.push(new Option(['fix edge'], 2));
  ops[4].button.mousePressed(fix_edge);

  // run kruskal
  ops.push(new Option(['run Kruskal'], 0));
  ops[5].button.mousePressed(cal_kruskal);

  // restart
  ops.push(new Option(['restart'], 0));
  ops[6].button.mousePressed(restart);

  // show all or not
  ops.push(new Option(['show all edges', 'show MST only'], 0));
  ops[7].button.mousePressed(change_state);
}

function valid(input_val){
  if(input_val == "" || isNaN(input_val)) return -1;
  return parseFloat(input_val);
}

function add_edge(){

  var a = valid(ops[0].inputs[0].value());
  var b = valid(ops[0].inputs[1].value());
  var c = valid(ops[0].inputs[2].value());

  kruskal.graph.add_edge(a, b, c);
  kruskal.init_kruskal();
}

function delete_edge(){

  var a = valid(ops[1].inputs[0].value());
  var b = valid(ops[1].inputs[1].value());

  kruskal.graph.delete_edge(a, b);
  kruskal.init_kruskal();
}

function change_n(){

  var a = valid(ops[2].inputs[0].value());
  kruskal.graph.change_n(a);
  kruskal.init_kruskal();

}

function create_random(){
  kruskal.graph.create_random();
  kruskal.init_kruskal();
}

function cal_kruskal(){
  kruskal.cal_kruskal();
}

function fix_edge(){
  var a = valid(ops[4].inputs[0].value());
  var b = valid(ops[4].inputs[1].value());
  kruskal.fix_edge(a, b);
}

function restart(){
  kruskal.init_kruskal();
}

function change_state(){
  ops[7].change_text();
  kruskal.graph.show_all_edges();
}
