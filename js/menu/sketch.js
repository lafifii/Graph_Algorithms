var boxes;
var r = 150;
var info = [];

var w = window.innerWidth; 
var h = window.innerHeight;

window.onresize = function() {

  w = window.innerWidth;
  h = window.innerHeight;
  resizeCanvas(w, h);
  create_boxes();
}

function create_boxes(){
  boxes = new Array(7);
  for(var i = 0; i < 7; i++){
    var ang = 2 * PI * i / 7;
    boxes[i] = new Box(w/3 + r*cos(ang), h/2 + r*sin(ang), 45);
  }
  add_information();
}

function setup() {
  createCanvas(w, h);
  textFont('Montserrat', 25);
  create_boxes();
}

function draw() {
  background('#8d96a3');

  var ok = 0;
  strokeWeight(3);
  draw_title();
  for(i = 0; i < boxes.length; ++i){
    boxes[i].update();
    boxes[i].show();
    ok|= boxes[i].on;
  }
  if(ok) cursor(HAND);
  else{
    show_info(info, 15, w*0.75, h*0.5);
    cursor(ARROW);
  }

}

function draw_title(){

  fill('#8d96a3');
  stroke('#00798c')
  beginShape();
  for(i = 0; i < boxes.length; ++i){
    vertex(boxes[i].x, boxes[i].y);
  }
  endShape(CLOSE);

  strokeWeight(1);
  stroke(0);
  fill(0);
  textSize(25);
  text("Graph", w/3 - textWidth('Graph')/2, h/2);
  text("Algorithms", w/3 - textWidth('Algorithms')/2, h/2 + 20);
  textSize(15);
  text("@lafifii", 5, 20);
}

function  mouseReleased(){
  for(var i = 0; i < boxes.length; ++i)
    if(boxes[i].clicked()) return;
}

function add_information(){

  info = split_info('Hi, here you will find interactive animations of some ' +
                    'main Graph Algorithms. Click in any of the nodes from the graph ' +
                    'in the left to try. For a better experience check this in a computer!');

  boxes[0].txt = ['DFS'];
  boxes[0].add_txt(w*0.75, h*0.5,
                   'The Depth first search (DFS) is a Graph Traversal Algorithm. ' +
                   'It\'s aim is to traverse the graph in ' +
                   'such a way that it tries to go far from the root node.' ,
                   'dfs.html');


  boxes[1].txt = ['BFS'];
  boxes[1].add_txt(w*0.75, h*0.5,
                   'The Breadth first search (BFS) is a Graph ' +
                   'Traversal Algorithm. It\'s aim is to traverse ' +
                   'the graph as close as possible to the root node.',
                   'bfs.html');


  boxes[2].txt = ['Dijkstra'];
  boxes[2].add_txt(w*0.75, h*0.5,
                   'Dijkstra\'s algorithm is an algorithm for finding' +
                   ' the shortest paths between nodes in a graph. ' +
                   'For a given source node in the graph, the ' +
                   'algorithm finds the shortest path ' +
                   'between that node and every other.',
                   'dijkstra.html');


  boxes[3].txt = ['Kruskal'];
  boxes[3].add_txt(w*0.75, h*0.5,
                   'Kruskal\s algorithm is a minimum-spanning-tree greedy '+
                   'algorithm which finds an edge of the least possible ' +
                   'weight that connects any two trees in the forest.',
                   'kruskal.html');

  boxes[4].txt = ['Bellman', 'Ford'];
  boxes[4].add_txt(w*0.75, h*0.5,
                  'Bellman-Ford algorithm allows you to check whether ' +
                  'there exists a cycle of negative weight in the ' +
                  'graph, and if it does, find one of these cycles.',
                  'bford.html');

  boxes[5].txt = ['Korasaju'];
  boxes[5].add_txt(w*0.75, h*0.5,
                  'Korasaju\'s Algorithm finds the Strongly ' +
                  'Connected Components (SCC) of an undirected graph.',
                  'korasaju.html');

  boxes[6].txt = ['A*', 'Search'];
  boxes[6].add_txt(w*0.75, h*0.5,
                  'A* is a graph traversal and path search informed algorithm. ' +
                  'In every step A* selects the path that minimizes a function ' +
                  'that works with a heuristic. ',
                  'astar.html');

}

function show_info(info, txt_sz, x, y){
  push();
  stroke(0);
  fill(0);
  textSize(txt_sz);
  strokeWeight(1);
  var space = info.length*txt_sz/2;
  for(var i = 0; i < info.length; ++i)
    text(info[i], x - textWidth(info[i])/2, y + i*txt_sz - space);
  pop();
}

function split_info(txt, width_txt=15){
  var aux = txt.split(' ');
  var line = '';
  var arr = [];

  for(var i = 0; i < aux.length; ++i){

    line+= aux[i] + " ";
    if(line.length >= width_txt){
      arr.push(line);
      line = '';
    }
  }

  if(line.length != 0) arr.push(line);

  return arr;

}
