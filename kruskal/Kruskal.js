function Kruskal(n, rd, w_min, w_max, frame_rate, show_w=1){
  this.frame_rate = frame_rate;
  this.mst = [];
  this.cost_mst = 0;
  this.cost_fixed = 0;
  this.dsu = new DSU(n);
  this.t = 0;
  this.lim = 1;
  this.comp = 0;
  this.graph = new Graph(n, rd, w_min, w_max, show_w, 1);
  this.fixed = 0;

  this.cal_kruskal = function(){
    if(this.mst.length > 0) return;

    this.count_components();
    this.t = 0;
    this.mst = [];
    this.kruskal();
  }

  this.count_components = function(){
    this.comp = 0;
    var vis = new Array(this.graph.n);

    for(var i = 0; i < this.graph.n; ++i) vis[i] = 0;

    for(var i = 0; i < this.graph.n; ++i){
      if(vis[i]) continue;
      this.dfs(i, vis);
      this.comp++;
    }

  }

  this.dfs = function(u, vis){
    if(vis[u]) return;
    vis[u] = 1;
    for(let item of this.graph.lad[u].values()) this.dfs(item[0], vis);
  }

  this.kruskal = function(){

    this.cost_mst = this.cost_fixed;

    var cn = 0;
    var edges = this.graph.get_edges();

    for(var i = 0; i < edges.length; ++i){
      if(cn == this.graph.n - this.comp) break;
      if(this.dsu.union(edges[i][0], edges[i][1])){
        cn++;
        this.mst.push(edges[i]);
      }
    }


    this.lim = this.mst.length;

  }

  this.init_kruskal = function(){

    this.t = 0;
    this.lim = 1;
    this.cost_mst = 0;
    this.dsu = new DSU(this.graph.n);
    this.mst = [];
    this.comp = 0;
    this.graph.discovered = new Array(this.graph.n);

    for(var i = 0; i < this.graph.n; ++i){
      this.graph.discovered[i] = new Set();
      this.graph.pts[i].vis = 0;
    }

    this.fixed = 0;
    this.cost_fixed = 0;

  }

  this.show = function(){

    this.graph.show(this.mst.length > 0 || this.t == this.lim);

    textSize(25);
    fill(0);
    text("Kruskal's Algorithm", 25, 40);
    textSize(20);

    var val = this.cost_mst + this.cost_fixed;
    draw_box('#00798c', "MST cost: " + Math.round(val*10)/10, 40);

    if(this.mst.length == 0 || mouseIsPressed){

      if(this.t == this.lim){
        draw_box('#d1495b', "Done! ", 80);
      }
      frameRate(30);
      return;
    }

    frameRate(this.frame_rate);

    this.cost_mst = 0;
    for(var i = 0; i <= this.t; ++i){
      let p = this.mst[i][0];
      let u = this.mst[i][1];
      this.graph.discovered[p].add(u);
      this.graph.discovered[u].add(p);
      this.graph.pts[p].vis = 1;
      this.graph.pts[u].vis = 1;
      this.cost_mst+= this.mst[i][2];
    }

    if(this.t < this.lim) this.t++;
    if(this.t == this.lim) this.mst = [];

  }

  this.fix_edge = function(a, b){
    if(a < 0 || a >= this.graph.n) return;
    if(b < 0 || b >= this.graph.n) return;
    if(this.fixed == 0) this.init_kruskal();

    var edge = this.graph.get_edge(a, b);

    if(edge[0] == -1) return;

    if( !this.dsu.union(edge[0], edge[1]) ) return;

    this.graph.discovered[edge[0]].add(edge[1]);
    this.graph.discovered[edge[1]].add(edge[0]);

    this.cost_fixed += edge[2];
    this.fixed++;

  }

  this.finish_animation = function(){
    this.t = max(this.t, this.lim - 1);
  }
}
