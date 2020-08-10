
function DFS(n, rd, w_min, w_max, frame_rate, show_w=0){
  this.frame_rate = frame_rate;
  this.dfs_tree = [];
  this.t = 0;
  this.lim = 1;
  this.graph = new Graph(n, rd, w_min, w_max, show_w);

  this.cal_dfs = function(){
    this.t = 0;
    this.dfs_tree = [];
    for(var i = 0; i < this.graph.n; ++i) this.graph.discovered[i] = new Set();

    for(i = 0; i < this.graph.n; ++i) this.graph.pts[i].vis = 0;

    for(i = 0; i < this.graph.n; ++i){
      if(this.graph.pts[i].vis == 0) this.dfs(i, -1);
    }

    for(i = 0; i < this.graph.n; ++i) this.graph.pts[i].vis = 0;
    this.lim = this.dfs_tree.length;
  }

  this.dfs = function(u, p){
    if(this.graph.pts[u].vis == 1) return;
    this.graph.pts[u].vis = 1;
    this.dfs_tree.push([p, u]);

    for(let item of this.graph.lad[u].values()) this.dfs(item[0], u);

  }

  this.init_dfs = function(){
    this.t = 0;
    this.graph.discovered = new Array(this.n);
    for(var i = 0; i < this.graph.n; ++i){
      this.graph.pts[i].vis = 0;
      this.graph.discovered[i] = new Set();
    }

    this.dfs_tree = [];

  }

  this.show = function(){

    this.graph.show(this.dfs_tree.length > 0 || this.t == this.lim);

    textSize(25);
    fill(0);
    text("Depth-First Search Algorithm", 25, 40);
    textSize(20);

    if(this.dfs_tree.length == 0 || mouseIsPressed){

      if(this.t == this.lim)
        draw_box('#d1495b', "Done! ", 40)

      frameRate(30);
      return;
    }

    frameRate(this.frame_rate);
    for(var i = 0; i <= this.t; ++i){

      let p = this.dfs_tree[i][0];
      let u = this.dfs_tree[i][1];

      this.graph.pts[u].vis = 1;
      if( p != -1) this.graph.discovered[p].add(u);

    }
    draw_box('#00798c', "visited: " + this.dfs_tree[this.t][1], 40)
    if(this.t < this.lim) this.t++;
    if(this.t == this.lim) this.dfs_tree = [];

  }

  this.finish_animation = function(){
    this.t = max(this.t, this.lim - 1);
  }

}
