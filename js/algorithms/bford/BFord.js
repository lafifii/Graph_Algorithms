var inf = 10000000000000;

function BellmanFord(n, rd, w_min, w_max, frame_rate, show_w=1){
  this.parent = [];
  this.start = -1;
  this.frame_rate = frame_rate;

  this.lim = 1;
  this.t = 0;
  this.last_edge = [-1, -1];

  this.on_queue = [];
  this.neg_cycle = 0;
  this.cycle = [];
  this.graph = new Graph(n, rd, w_min, w_max, show_w, 0, 1, 0);
  this.show_all

  this.cal_bellman_ford = function(){
    if(this.start == -1) return;

    this.parent = new Array(this.graph.n);
    this.on_queue = [];
    for(var i = 0; i < this.graph.n; ++i){
      this.graph.discovered[i] = new Set();
      this.parent[i] = -1;
    }

    this.bellman_ford();
  }

  this.bellman_ford = function(){

    var edges = this.graph.get_edges();
    var x = 0, a, b, c;
    for(var i = 0; i < this.graph.n; ++i){
      x = -1;
      for(var j = 0; j < edges.length; ++j){
        [a, b, c] = edges[j];
        var relaxed = 0;
        if(this.graph.pts[a].dis < inf){
          if(this.graph.pts[b].dis > this.graph.pts[a].dis + c){
            this.graph.pts[b].dis = max(-inf, this.graph.pts[a].dis + c);
            this.parent[b] = a;
            x = b;
            relaxed = 1;
          }
        }
        this.on_queue.push([a, b, c, relaxed]);
      }
    }

    this.cycle = [];
    if(x != -1){
      var y = x;
      for(i = 0; i < this.graph.n; ++i) y = this.parent[y];

      for(var cur = y; ; cur = this.parent[cur]){
        this.cycle.push(cur);
        if(cur == y && this.cycle.length > 1) break;
      }
      this.cycle = this.cycle.reverse();

      this.neg_cycle = 1;
    }
    else this.neg_cycle = 0;

    this.lim = this.on_queue.length;
    this.t = 0;
    console.log(this.cycle);
  }

  this.init_bellman_ford = function(){

    this.t = 0;
    this.last_edge = [-1, -1];
    this.cycle = 0;
    this.neg_cycle = 0;
    this.graph.discovered = new Array(this.graph.n);
    this.start = -1;
    this.lim = 1;

    for(var i = 0; i < this.graph.n; ++i){
      this.graph.pts[i].vis = 0;
      this.graph.pts[i].dis = inf;
      this.graph.pts[i].on_q = 0;
      this.graph.discovered[i] = new Set();
      this.graph.pts[i].starting_node = 0;
    }

    this.parent = new Array(this.graph.n);
    this.on_queue = [];

  }

  this.show = function(){

    this.graph.show(this.on_queue.length > 0);

    var a, b, c, d;
    [a, b] = this.last_edge;
    if(a != -1){
      this.graph.discovered[a].delete(b);
      this.last_edge = [-1, -1];
    }

    textSize(25);
    fill(0);
    text("Bellman Ford Algorithm", 25, 40);
    textSize(20);

    if(this.on_queue.length == 0 || mouseIsPressed){

      if(this.t == this.lim){
        if(this.cycle.length > 0){
          var prev = -1;
          for(let item of this.cycle){
            console.log(prev, item);
            if(prev != -1) this.graph.discovered[prev].add(item);
            this.graph.pts[item].vis = 1;
            prev = item;
          }
          this.cycle.length = [];
        }

        draw_box('#d1495b', "Done! ", 40);
        draw_box('#00798c', this.neg_cycle ? "Negative Cycle!" : "No Negative Cycle", 80);

        if(!this.neg_cycle){
          for(var i = 0; i < this.graph.n; ++i){
            if(this.graph.pts[i].on == 1){


              var txt = "distance : ";
              txt+= (this.graph.pts[i].dis == inf) ? " x": Math.round(this.graph.pts[i].dis * 10) / 10;

              draw_box('#00798c', txt, 80);
              break;
            }
          }
        }
      }
      frameRate(30);
      return;
    }

    frameRate(this.frame_rate);
    [a, b, c, d] = this.on_queue[this.t];

    this.graph.discovered[a].add(b);
    this.last_edge = [a, b];
    if(this.t - 1 >= 0){
      [a, b, c, d] = this.on_queue[this.t - 1];
      if(d) draw_box('#00798c', 'relaxed (' + a + ', ' + b + ')', 40);
    }

    if(this.t < this.lim) this.t++;
    if(this.t == this.lim){
      this.on_queue = [];
      for(var i = 0; i < this.graph.n; ++i){
        if(this.graph.pts[i].dis < inf) this.graph.pts[i].vis = 1;
        this.graph.discovered[i] = new Set();
      }
    }
  }

  this.add_start = function(node){
    if(node < 0  || node >= this.graph.n) return;
    this.init_bellman_ford();

    if(this.graph.pts[node].dis == inf){
      this.graph.pts[node].dis = 0;
      this.graph.pts[node].vis = 0;
      this.graph.pts[node].on_q = 0;
      this.start =  node;
      this.graph.pts[node].starting_node = 1;
    }
  }

  this.finish_animation = function(){
    this.t = max(this.t, this.lim - 1);
  }

}
