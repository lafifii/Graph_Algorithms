function Graph(n, rd){
  this.n = n;
  this.lad = new Array(this.n);
  this.discovered = new Array(this.n);
  this.pts = [];
  this.rd = rd;
  this.t = 0;
  this.bfs_tree = [];
  this.on_queue = [];
  this.let_h = 0;
  this.q = new Queue();
  this.lim = 1;

  
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
    
     this.init_bfs();
  }

  this.add_edge = function(a, b){
    if(a < 0 || a >= this.n || b < 0 || b >= this.n) return;
    this.init_bfs();
    this.lad[a].add(b);
  }
  
  this.delete_edge = function(a, b){
    if(a < 0 || a >= this.n || b < 0 || b >= this.n) return;
    this.init_bfs();
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
          else stroke('gray');
          
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
    text("Breadth-first Search Algorithm", 25, 40);


    this.draw_box('grey', "N: " + this.n, width - 100, 0);
    
    this.bfs_animation();
    
  }
  
  this.change_n = function(n){
    if(n < 0 ) return;
    
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
    
    this.init_bfs();
    
  }
  
  this.visited_edge = function(u, v){
    this.discovered[u].add(v);
  }
  
  this.cal_bfs = function(){
    if(this.q.size() == 0) return;
       
    this.t = 0;
    this.bfs_tree = [];
    this.on_queue = [];
    
    for(var i = 0; i < this.n; ++i) this.discovered[i] = new Set();

    for(i = 0; i < this.n; ++i){
      this.pts[i].vis = 0;
      this.pts[i].on_q = 0;
      if(this.pts[i].dis == 0) this.pts[i].vis = 1;
      else this.pts[i].vis = 0;
    }
    
     this.bfs();
  }
  
  this.bfs = function(){
    
    while(this.q.size() > 0){
      var x = this.q.dequeue(); 
      
      for(let item of this.lad[x].values()){
        if(this.pts[item].dis == -1){
          this.pts[item].dis = this.pts[x].dis + 1;
          this.q.enqueue(item);
          this.bfs_tree.push([x, item]);
        }
      }
      this.on_queue.push(this.q.cola());
    }
    
    this.lim = this.bfs_tree.length;
    
  }
  
  this.init_bfs = function(){
    
    this.t = 0;
    this.discovered = new Array(this.n);
    this.q = new Queue();
    this.lim = 1;
    
    for(var i = 0; i < this.n; ++i){ 
      this.pts[i].vis = 0;
      this.pts[i].on_q = 0;
      this.pts[i].dis = -1;
      this.discovered[i] = new Set();
    }
    
    this.bfs_tree = [];
    this.on_queue = [];
  }
  
  this.bfs_animation = function(){

    if(this.bfs_tree.length == 0 || mouseIsPressed){ 
      
      if(this.t == this.lim){
        this.draw_box('magenta', "Done! ",  width - 100, 40)
        for(var i = 0; i < this.n; ++i){
          if(this.pts[i].on == 1){
            var d = this.pts[i].dis == -1 ? 'x' : this.pts[i].dis;
            this.draw_box('cyan', "distance : " + d,  width - 110, 80);
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
      
      this.pts[u].vis = 1;
      if( p != -1) this.discovered[p].add(u);
    }
    
    var t2 = min(this.t, this.on_queue.length - 1); 
    for(i = 0; i < this.on_queue[t2].length; ++i){ 
      var x = this.on_queue[t2][i];
      this.pts[x].on_q = 1;
    }
    
    this.draw_box('#09FBD3', "visited: " + this.bfs_tree[this.t][1], width - 115, 40);
    this.draw_box('yellow', "on queue",  width - 110, 80);
    
    if(this.t < this.lim) this.t++;
    if(this.t == this.lim){ 
      this.bfs_tree = [];    
      this.on_queue = [];
    } 
  }
  
  this.draw_box = function(col, txt, x, y){
    
    fill(col);
    rect(width - 150, y, 150, 40);

    fill('black');
    textSize(20);
    text(txt, x, y + 30);
  
  }
  
  this.draw_arrow = function(x1, x2) {
  
    push();
    stroke('grey');
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
  
  this.add_start = function(node){
    if(node < 0  || node >= this.n) return;
    if(this.t > 0) return;
  
    if(this.pts[node].dis == -1){
      this.pts[node].dis = 0;
      this.pts[node].vis = 1;
      this.q.enqueue(node); 
    }
  }
  
}