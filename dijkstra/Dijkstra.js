var inf = 10000000000000;

function Dijkstra(n, rd, w_min, w_max, frame_rate, show_w=1){
  this.frame_rate = frame_rate;
  this.path = [];
  this.pq = new PriorityQueue((a, b) => a[1] < b[1]);
  this.lim = 1;
  this.t = 0;
  this.on_queue = [];
  this.graph = new Graph(n, rd, w_min, w_max, show_w);

  this.cal_dijkstra = function(){
    if(this.pq.size() == 0) return;

    this.t = this.pq.size() - 1;
    this.path = [];
    this.on_queue = [];
    for(var i = 0; i < this.graph.n; ++i) this.graph.discovered[i] = new Set();

    this.dijkstra();
  }

  this.dijkstra = function(){

    while(this.pq.size() > 0){
      var x = this.pq.top()[0];
      var px = this.pq.top()[2];
      this.pq.pop();

      if(this.graph.pts[x].vis) continue;
      this.graph.pts[x].vis = 1;
      this.path.push([px, x]);


      for(var i = 0; i < this.graph.lad[x].length; ++i){
        var u = this.graph.lad[x][i][0];
        var w = this.graph.lad[x][i][1];
        if(this.graph.pts[x].dis + w < this.graph.pts[u].dis){
          this.graph.pts[u].dis = this.graph.pts[x].dis + w;
          this.pq.push([u, this.graph.pts[u].dis, x]);
        }

      }
      this.on_queue.push(this.pq.cola());
    }

    this.lim = this.path.length;
    for(var i = 0; i < this.graph.n; ++i){
      if(this.graph.pts[i].starting_node) continue;
      this.graph.pts[i].vis = 0;
    }

  }

  this.init_dijkstra = function(){

    this.t = 0;
    this.graph.discovered = new Array(this.graph.n);
    this.pq = new PriorityQueue((a, b) => a[1] < b[1]);
    this.starting_nodes = new Set();
    this.lim = 1;

    for(var i = 0; i < this.graph.n; ++i){
      this.graph.pts[i].vis = 0;
      this.graph.pts[i].dis = inf;
      this.graph.pts[i].on_q = 0;
      this.graph.discovered[i] = new Set();
      this.graph.pts[i].starting_node = 0;
    }

    this.path = [];
    this.on_queue = [];

  }

  this.show = function(){

    this.graph.show(this.path.length > 0 || this.t == this.lim);

    textSize(25);
    fill(0);
    text("Dijkstra\'s Algorithm", 25, 40);
    textSize(20);

    if(this.path.length == 0 || mouseIsPressed){

      if(this.t == this.lim){
        draw_box('#d1495b', "Done! ", 40)
        for(var i = 0; i < this.graph.n; ++i){
          if(this.graph.pts[i].on == 1){

            var txt = "distance : ";
            txt+= (this.graph.pts[i].dis >= inf) ? " x": Math.round(this.graph.pts[i].dis * 10) / 10;

            draw_box('#00798c', txt, 80);
            break;
          }
        }
      }
      frameRate(30);
      return;
    }


    frameRate(this.frame_rate);


    for(var i = 0; i <= this.t; ++i){

      let p = this.path[i][0];
      let u = this.path[i][1];

      this.graph.pts[u].vis = 1;
      if( p != -1) this.graph.discovered[p].add(u);

    }

    var t2 = min(this.t, this.on_queue.length - 1);
    for(i = 0; i < this.on_queue[t2].length; ++i){
      var it = this.on_queue[t2][i];
      this.graph.pts[it].on_q = 1;
    }

    draw_box('#00798c', "visited: " + this.path[this.t][1], 40);
    draw_box('#d1495b', 'on queue', 80);
    if(this.t < this.lim) this.t++;
    if(this.t == this.lim) this.path = [];

  }

  this.add_start = function(node){
    if(node < 0  || node >= this.graph.n) return;
    if(this.pq.size() == 0) this.init_dijkstra();

    if(this.graph.pts[node].dis == inf){
      this.graph.pts[node].dis = 0;
      this.graph.pts[node].vis = 0;
      this.graph.pts[node].on_q = 0;
      this.pq.push([node, 0, -1]);
      this.graph.pts[node].starting_node = 1;
    }
  }

  this.finish_animation = function(){
    this.t = max(this.t, this.lim - 1);
  }

}
