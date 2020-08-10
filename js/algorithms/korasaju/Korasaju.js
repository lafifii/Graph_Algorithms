
function Korasaju(n, rd, w_min, w_max, frame_rate, show_w=0){
  this.frame_rate = frame_rate;
  this.components = [];
  this.t = 0;
  this.lim = 1;
  this.n_components = 0;
  this.graph = new Graph(n, rd, w_min, w_max, show_w);

  this.cal_korasaju = function(){

    var order = [];
    this.t = 0;
    this.components = [];
    for(var i = 0; i < this.graph.n; ++i){
      this.graph.discovered[i] = new Set();
      this.graph.pts[i].vis = 0
    }


    for(i = 0; i < this.graph.n; ++i){
      if(!this.graph.pts[i].vis)
        this.dfs1(i, order);
    }

    for(i = 0; i < this.graph.n; ++i) this.graph.pts[i].vis = 0;

    var transpose = this.graph.get_transpose();

    this.n_components = 0;
    for(i = 0; i < this.graph.n; ++i){
      var v = order[this.graph.n - 1 - i];
      if(!this.graph.pts[v].vis){
        var comp = [];
        this.dfs2(v, -1, comp, transpose);
        comp = comp.reverse();
        for(let item of comp)
          this.components.push(item);

        this.n_components++;
      }
    }

    for(i = 0; i < this.graph.n; ++i) this.graph.pts[i].vis = 0;
    this.lim = this.components.length;

  }

  this.dfs1 = function(u, order){
    if(this.graph.pts[u].vis == 1) return;
    this.graph.pts[u].vis = 1;

    for(let item of this.graph.lad[u].values())
      this.dfs1(item[0], order);

    order.push(u);
  }

  this.dfs2 = function(u, p, comp, transpose){
    if(this.graph.pts[u].vis == 1) return;
    this.graph.pts[u].vis = 1;

    comp.push([u, p]);
    for(let item of transpose[u].values())
      this.dfs2(item[0], u, comp, transpose);

  }

  this.init_korasaju = function(){
    this.t = 0;
    this.n_components = 0;
    this.graph.discovered = new Array(this.n);
    for(var i = 0; i < this.graph.n; ++i){
      this.graph.pts[i].vis = 0;
      this.graph.discovered[i] = new Set();
    }

    this.components = [];

  }

  this.show = function(){

    this.graph.show(this.components.length > 0 || this.t == this.lim);

    textSize(25);
    fill(0);
    text("Korasaju\'s Algorithm", 25, 40);
    textSize(20);

    if(this.components.length == 0 || mouseIsPressed){

      if(this.t == this.lim){
        draw_box('#d1495b', "Done! ", 40);
        draw_box('#00798c', "SCC : " + this.n_components, 80);
      }

      frameRate(30);
      return;
    }

    frameRate(this.frame_rate);
    for(var i = 0; i <= this.t; ++i){
      var u = this.components[i][0];
      var v = this.components[i][1];

      this.graph.pts[u].vis = 1;
      if(v == -1) continue;
      this.graph.pts[v].vis = 1;
      this.graph.discovered[u].add(v);

    }


    draw_box('#00798c', "visited: " + this.components[this.t][0], 40)

    if(this.t < this.lim) this.t++;
    if(this.t == this.lim) this.components = [];

  }

  this.finish_animation = function(){
    this.t = max(this.t, this.lim - 1);
  }

}
