var boxes = [];
var r = 180;

function setup() {
  createCanvas(windowWidth,windowHeight);

  textFont('Montserrat', 25);

  for(var i = 1; i <= 4; ++i){
    var ang = 2 * PI * i / 4;
    boxes.push(new Box(width/2 + r*cos(ang), height/2 + r*sin(ang), 60));
  }
  add_information();

}

function draw() {
  background('#8d96a3');

  var ok = 0;

  strokeWeight(1);
  stroke('grey');

  for(var i = 0; i < boxes.length; ++i){
    var nxt = (i + 1)%boxes.length;
    line(boxes[i].x, boxes[i].y, boxes[nxt].x, boxes[nxt].y);
  }

  stroke('#00798c');
  line(width/2, 0, width/2, height);
  line(0, height/2, width, height/2);

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
  beginShape();
  for(i = 1; i <= 4; ++i){
    var ang = 2 * PI * i / 4;
    vertex(width/2 + r*cos(ang), height/2 + r*sin(ang));
  }
  endShape(CLOSE);

  strokeWeight(1);
  stroke(0);
  fill(0);
  textSize(25);
  text("Graph", width/2 - textWidth('Graph')/2, height/2);
  text("Algorithms", width/2 - textWidth('Algorithms')/2, height/2 + 20);
  textSize(15);
  text("@lafifii", 5, 20);
}

function  mousePressed(){
  for(var i = 0; i < boxes.length; ++i)
    if(boxes[i].clicked()) return;
}

function add_information(){
  boxes[0].txt = 'DFS';
  boxes[0].add_txt(width/4, height*0.75,
                   'The Depth first search (DFS) is a Graph Traversal Algorithm. ' +
                   'It\'s aim is to traverse the graph in ' +
                   'such a way that it tries to go far from the root node.' ,
                   'dfs/index.html');


  boxes[1].txt = 'BFS';
  boxes[1].add_txt(width/4, height/4,
                   'The Breadth first search (BFS) is a Graph ' +
                   'Traversal Algorithm. It\'s aim is to traverse ' +
                   'the graph as close as possible to the root node.',
                   'bfs/index.html');


  boxes[2].txt = 'Dijkstra';
  boxes[2].add_txt(width*0.75, height/4,
                   'Dijkstra\'s algorithm is an algorithm for finding' +
                   ' the shortest paths between nodes in a graph. ' +
                   'For a given source node in the graph, the ' +
                   'algorithm finds the shortest path ' +
                   'between that node and every other.',
                   'dijkstra/index.html');


  boxes[3].txt = 'Kruskal';
  boxes[3].add_txt(width*0.75, height*0.75,
                   'Kruskal\s algorithm is a minimum-spanning-tree greedy '+
                   'algorithm which finds an edge of the least possible ' +
                   'weight that connects any two trees in the forest.',
                   'kruskal/index.html');

}
