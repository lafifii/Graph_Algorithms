function Graph(n, rd){
  this.n = n;
  this.lad = new Array(this.n);
  this.discovered = new Array(this.n);
  this.pts = [];
  this.rd = rd;
  this.t = 0;
  this.dfs_tree = [];
  this.let_h = 0;
  
  this.create_random = function(){
    this.n = Math.round(Math.random() * 60);
    this.lad = new Array(this.n);
    this.discovered = new Array(this.n);
    this.pts = [];
 
    for(var i = 0; i < this.n; ++i){
      this.lad[i] = new Set();
      this.discovered = new Set();
      this.pts.push(new Node(i, this.rd));
      
      for(var j = 0; j < this.n; ++j){
        var pr = Math.random();
        if(pr < 0.02) this.lad[i].add(j);
      }
    }
    
     this.init_dfs();
  }

  this.add_edge = function(a, b){
    if(a < 0 || a >= this.n || b < 0 || b >= this.n)
      return;
    
      this.init_dfs();
    this.lad[a].add(b);
  }
  
  this.delete_edge = function(a, b){
    if(a < 0 || a >= this.n || b < 0 || b >= this.n)
      return;
    
    this.init_dfs();
    this.lad[a].delete(b);
  }
  
  this.delete_node = function(id){
    for(var i = 0; i < this.n; ++i)
      this.lad[i].delete(id);
  }
  
  this.draw_edges = function(){
    fill('white');
      for(var i = 0; i < this.n; ++i){
        for(let item of this.lad[i].values()){

          if(this.discovered.length == this.n && this.discovered[i].has(item) ){
             stroke('magenta');          
          }
          else stroke('grey');
          
          if(i == item)
            this.draw_self(this.pts[i].x, this.pts[i].y);
          else
            line(this.pts[i].x, this.pts[i].y, this.pts[item].x, this.pts[item].y); 
        }
      }

      for(i = 0; i < this.n; ++i){
        for(let item of this.lad[i].values()){
          if(i == item) continue;
          this.draw_arrow(this.pts[i], this.pts[item]);
        }

      }
  
  }
  this.show = function(){
    
    if(this.n != 0){
      this.let_h = this.pts[0].w;

      this.draw_edges();
      var ok = false;
      for(var i = 0; i < this.n; ++i){
        ok|=this.pts[i].clicked(ok);
        this.pts[i].show(this.let_h);
      }

      if(ok) cursor(HAND);
      else cursor(ARROW);
    }
    
    textSize(30);!
    fill('white');
    text("Depth-First Search Algorithm", 25, 40);


    this.draw_box('grey', "N: " + this.n, width - 100, 0);
    
    this.dfs_animation();
    
  }
  
  this.change_n = function(n){
    if(n < 0) return;
    
    var old_n = this.n;
    this.n = n;

    if(this.n < old_n){
      for(var i = this.n; i < old_n; ++i){
        this.lad.pop();
        this.pts.pop();
        this.delete_node(i);
      }
    } 
    else {
      for(var i = old_n; i < this.n; ++i){
        this.lad.push(new Set());
        this.discovered.push(new Set());
        this.pts.push(new Node(i, this.rd));
      } 
    }
    
    this.init_dfs();
    
  }
  
  this.visited_edge = function(u, v){
    this.discovered[u].add(v);
  }
  
  this.cal_dfs = function(){
    this.t = 0;
    this.dfs_tree = [];
    for(var i = 0; i < this.n; ++i) this.discovered[i] = new Set();

    for(i = 0; i < this.n; ++i) this.pts[i].vis = 0;

    for(i = 0; i < this.n; ++i){
      if(this.pts[i].vis == 0) this.dfs(i, -1);
    }

    for(i = 0; i < this.n; ++i) this.pts[i].vis = 0;
  
  }
  
  this.dfs = function(u, p){
    if(this.pts[u].vis == 1) return;
    this.pts[u].vis = 1;
    this.dfs_tree.push([p, u]);

    for(let item of this.lad[u].values()) this.dfs(item, u);
  
  }
  
  this.init_dfs = function(){
    this.t = 0;
    this.discovered = new Array(this.n);
    for(var i = 0; i < this.n; ++i){ 
      this.pts[i].vis = 0;
      this.discovered[i] = new Set();
    }
    
    this.dfs_tree = [];
  
  }
  
  this.dfs_animation = function(){

    if(this.dfs_tree.length == 0 || mouseIsPressed){ 
      
      if(this.n > 0 && this.pts[this.n - 1].vis == 1) 
        this.draw_box('magenta', "Done! ",  width - 100, 40)

      frameRate(30);
      return;
    }

    frameRate(2); 
    for(var i = 0; i <= this.t; ++i){ 
      
      let p = this.dfs_tree[i][0];
      let u = this.dfs_tree[i][1];
      
      this.pts[u].vis = 1;
      if( p != -1) this.discovered[p].add(u);
      
    }
    this.draw_box('cyan', "visited: " + this.dfs_tree[this.t][1], width - 115, 40)
    if(this.t < this.n) this.t++;
    if(this.t == this.n) this.dfs_tree = [];    
  
  }
  
  this.draw_box = function(col, txt, x, y){
    
    fill(col);
    rect(width - 150, y, 150, 40);

    fill('black');
    textSize(20);
    text(txt, x, y + 30);
  
  }
  
  this.draw_arrow = function(x1, x2) {
  
    stroke('grey');
    push();
    var offset = this.rd/3;
    var angle = atan2(x1.y - x2.y, x1.x - x2.x); 

    translate(x2.x + this.rd/2*cos(angle), x2.y + this.rd/2*sin(angle) );
    rotate(angle-HALF_PI); 

    fill('black');
    triangle(-offset*0.5, offset, offset*0.5, offset, 0, -offset/2);
    pop();
    
  }
  
  this.get_n = function(){
    return this.n;
  }
  
  this.draw_self = function(x,y){
  
    push();
    noFill();
    translate(x + 0.5*this.rd*cos(1), y );
    ellipse(0,0,this.rd*1.5, this.rd/1.5);
    pop();
  }
  
}