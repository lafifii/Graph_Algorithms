
function BFS(n, rd, w_min, w_max, show_w){
  this.t = 0;
  this.bfs_tree = [];
  this.on_queue = [];
  this.t = 0;
  this.q = new Queue();
  this.lim = 1;
  this.graph = new Graph(n, rd, w_min, w_max, show_w);
  
  this.cal_bfs = function(){
    if(this.q.size() == 0) return;
       
    this.t = 0;
    this.bfs_tree = [];
    this.on_queue = [];
    
    for(var i = 0; i < this.graph.n; ++i) this.graph.discovered[i] = new Set();

    for(i = 0; i < this.graph.n; ++i){
      this.graph.pts[i].vis = 0;
      this.graph.pts[i].on_q = 0;
      if(this.graph.pts[i].dis == 0) this.graph.pts[i].vis = 1;
      else this.graph.pts[i].vis = 0;
    }
    
     this.bfs();
  }
  
  this.bfs = function(){
    
    while(this.q.size() > 0){
      var x = this.q.dequeue(); 
      
      for(let item of this.graph.lad[x].values()){
        var v = item[0];
        if(this.graph.pts[v].dis == -1){
          this.graph.pts[v].dis = this.graph.pts[x].dis + 1;
          this.q.enqueue(v);
          this.bfs_tree.push([x, v]);
        }
      }
      this.on_queue.push(this.q.cola());
    }
    
    this.lim = this.bfs_tree.length;
    
  }
  
  this.init_bfs = function(){
    
    this.t = 0;
    this.graph.discovered = new Array(this.graph.n);
    this.q = new Queue();
    this.lim = 1;
    
    for(var i = 0; i < this.graph.n; ++i){ 
      this.graph.pts[i].vis = 0;
      this.graph.pts[i].on_q = 0;
      this.graph.pts[i].dis = -1;
      this.graph.discovered[i] = new Set();
    }
    
    this.bfs_tree = [];
    this.on_queue = [];
  }
  
  this.show = function(){
    
    this.graph.show();

    textSize(30);!
    fill('white');
    text("Breadth-First Search Algorithm", 25, 40);
    textSize(20);

    if(this.bfs_tree.length == 0 || mouseIsPressed){ 
      
      if(this.t == this.lim){
        draw_box('magenta', "Done! ",  width - 100, 40)
        for(var i = 0; i < this.graph.n; ++i){
          if(this.graph.pts[i].on == 1){
            var d = this.graph.pts[i].dis == -1 ? 'x' : this.graph.pts[i].dis;
            draw_box('cyan', "distance : " + d,  width - 110, 80);
            break;
          }
        }
      }
      
      frameRate(30);
      return;
    }

    frameRate(2); 
    for(var i = 0; i <= this.t; ++i){ 
      
      let p = this.bfs_tree[i][0];
      let u = this.bfs_tree[i][1];
      
      this.graph.pts[u].vis = 1;
      if( p != -1) this.graph.discovered[p].add(u);
    }
    
    var t2 = min(this.t, this.on_queue.length - 1); 
    for(i = 0; i < this.on_queue[t2].length; ++i){ 
      var x = this.on_queue[t2][i];
      this.graph.pts[x].on_q = 1;
    }
    
    draw_box('#09FBD3', "visited: " + this.bfs_tree[this.t][1], width - 115, 40);
    draw_box('yellow', "on queue",  width - 110, 80);
    
    if(this.t < this.lim) this.t++;
    if(this.t == this.lim){ 
      this.bfs_tree = [];    
      this.on_queue = [];
    } 
  }
  
  this.add_start = function(node){
  
    if(node < 0  || node >= this.graph.n) return;
    if(this.q.size() == 0) this.init_bfs();
    
    if(this.graph.pts[node].dis == -1){
      this.graph.pts[node].dis = 0;
      this.graph.pts[node].vis = 1;
      this.q.enqueue(node); 
    }
  }
}