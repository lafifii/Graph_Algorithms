var boxes = [];
var r = 190;

function setup() {
  createCanvas(windowWidth,windowHeight);

  textFont('Montserrat', 25);

  for(var i = 0; i < 6; i++){
    var ang = 2 * PI * i / 6;
    boxes.push(new Box(width/3 + r*cos(ang), height/2 + r*sin(ang), 55));
  }
  add_information();

}

function draw() {
  background('#8d96a3');

  var ok = 0;

  draw_title();
  for(i = 0; i < boxes.length; ++i){
    boxes[i].update();
    boxes[i].show();
    ok|= boxes[i].on;
  }
  if(ok) cursor(HAND);
  else cursor(ARROW);

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
  text("Graph", width/3 - textWidth('Graph')/2, height/2);
  text("Algorithms", width/3 - textWidth('Algorithms')/2, height/2 + 20);
  textSize(15);
  text("@lafifii", 5, 20);
}

function  mousePressed(){
  for(var i = 0; i < boxes.length; ++i)
    if(boxes[i].clicked()) return;
}

function add_information(){
  boxes[0].txt = ['DFS'];
  boxes[0].add_txt(width*0.75, height*0.5,
                   'The Depth first search (DFS) is a Graph Traversal Algorithm. ' +
                   'It\'s aim is to traverse the graph in ' +
                   'such a way that it tries to go far from the root node.' ,
                   'dfs/index.html');


  boxes[1].txt = ['BFS'];
  boxes[1].add_txt(width*0.75, height*0.5,
                   'The Breadth first search (BFS) is a Graph ' +
                   'Traversal Algorithm. It\'s aim is to traverse ' +
                   'the graph as close as possible to the root node.',
                   'bfs/index.html');


  boxes[2].txt = ['Dijkstra'];
  boxes[2].add_txt(width*0.75, height*0.5,
                   'Dijkstra\'s algorithm is an algorithm for finding' +
                   ' the shortest paths between nodes in a graph. ' +
                   'For a given source node in the graph, the ' +
                   'algorithm finds the shortest path ' +
                   'between that node and every other.',
                   'dijkstra/index.html');


  boxes[3].txt = ['Kruskal'];
  boxes[3].add_txt(width*0.75, height*0.5,
                   'Kruskal\s algorithm is a minimum-spanning-tree greedy '+
                   'algorithm which finds an edge of the least possible ' +
                   'weight that connects any two trees in the forest.',
                   'kruskal/index.html');

  boxes[4].txt = ['Bellman', 'Ford'];
  boxes[4].add_txt(width*0.75, height*0.5,
                  'Bellman-Ford algorithm allows you to check whether ' +
                  'there exists a cycle of negative weight in the ' +
                  'graph, and if it does, find one of these cycles.',
                  'bford/index.html');

  boxes[5].txt = ['Euler', 'Path'];
  boxes[5].add_txt(width*0.75, height*0.5,
                  'A Eulerian path is a path in a graph that passes ' +
                  'through all of its edges exactly once. ' +
                  'The problem is to find the ' +
                  'Eulerian path in an undirected multigraph with loops.',
                  'euler/index.html');

}
