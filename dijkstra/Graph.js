var inf = 10000000000000;

function Graph(n, rd){
  this.n = n;
  this.lad = new Array(this.n);
  this.discovered = new Array(this.n);
  this.pts = [];
  this.rd = rd;
  this.t = 0;
  this.path = [];
  this.let_h = 0;
  this.pq = new PriorityQueue((a, b) => a[1] < b[1]);
  this.lim = 1;
  this.on_q = 0;
  
  this.create_random = function(){
    this.n = Math.round(Math.random() * 60);
    this.lad = new Array(this.n);
    this.discovered = new Array(this.n);
    this.pts = [];
 
    for(var i = 0; i < this.n; ++i){
      this.lad[i] = [];
      this.discovered = new Set();
      this.pts.push(new Node(i, this.rd));
      
      for(var j = 0; j < this.n; ++j){
        var pr = Math.random();
        if(pr < 0.02){ 
          var w = Math.floor(Math.random() * 6000)/100;
          this.lad[i].push([j, w]);
        }
      }
    }
    
     this.init_dijkstra();
  }

  this.add_edge = function(a, b, w){
    if(w < 0 || a < 0 || a >= this.n || b < 0 || b >= this.n) 
      return;
    this.init_dijkstra();
    this.lad[a].push([b, w]);
  }
  
  
  this.delete_edge = function(a, b){

    if(a < 0 || a >= this.n || b < 0 || b >= this.n) return;
    
    this.init_dijkstra();
    for(var i = this.lad[a].length - 1; i >= 0; --i){
      if(this.lad[a][i][0] == b){
        this.lad[a].splice(i, 1);
      }
    }
  }
  
  this.delete_node = function(id){
    for(var i = 0; i < this.n; ++i){
      for(var j = this.lad[i].length - 1; j >= 0; --j){
        if(this.lad[i][j][0] == id){
           this.lad[i].splice(j, 1);
        }
      }
    }
  }
  this.draw_edges = function(){
    fill('white');
      for(var i = 0; i < this.n; ++i){
        for(var j = 0; j < this.lad[i].length; ++j){
          var item = this.lad[i][j][0];
          
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
  
  }
  
  this.draw_arrows = function(){
    for(var i = 0; i < this.n; ++i){
        for(var j = 0; j < this.lad[i].length; ++j){
          var item = this.lad[i][j][0];
          if(i == item) continue;
          this.draw_arrow(this.pts[i], this.pts[item]);
        }
    }
  }
  
  this.show = function(){
    
    if(this.n != 0){
      this.let_h = this.pts[0].w;

      this.draw_edges();
      this.draw_arrows();

      for(var i = 0; i < this.n; ++i){
        for(var j = 0; j < this.lad[i].length; ++j){
          var item = this.lad[i][j][0], txt_x, txt_y;
          if(i == item){
            txt_x = this.pts[i].x;
            txt_y = this.pts[i].y - this.rd/1.5;
          }
          else{
            txt_x = (this.pts[i].x + this.pts[item].x)/2;
            txt_y = (this.pts[i].y + this.pts[item].y)/2;
          } 
          
          fill('white');
          textSize(15);
          text(this.lad[i][j][1], txt_x, txt_y);
        }
      }
      
      var ok = false;
      for(i = 0; i < this.n; ++i){
        ok|=this.pts[i].clicked(ok);
        this.pts[i].show(this.let_h);
      }

      if(ok) cursor(HAND);
      else cursor(ARROW);
    }
    
    textSize(30);!
    fill('white');
    text("Dijkstra Algorithm", 25, 40);


    this.draw_box('grey', "N: " + this.n, width - 100, 0);
    
    this.dijkstra_animation();
    
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
        this.lad.push([]);
        this.discovered.push(new Set());
        this.pts.push(new Node(i, this.rd));
      } 
    }
    
    this.init_dijkstra();
    
  }
  
  this.visited_edge = function(u, v){
    this.discovered[u].add(v);
  }
  
  this.cal_dijkstra = function(){
    if(this.pq.size() == 0) return;
       
    this.t = this.pq.size() - 1;
    this.path = [];
    this.on_queue = [];
    for(var i = 0; i < this.n; ++i) this.discovered[i] = new Set();
    
     this.dijkstra();
  }
  
  this.dijkstra = function(){
    
    while(this.pq.size() > 0){
      var x = this.pq.top()[0]; 
      var px = this.pq.top()[2];
      this.pq.pop(); 
      
      if(this.pts[x].vis) continue;
      this.pts[x].vis = 1;
      this.path.push([px, x]);  
      
      
      for(var i = 0; i < this.lad[x].length; ++i){
        var u = this.lad[x][i][0];
        var w = this.lad[x][i][1];
        if(this.pts[x].dis + w < this.pts[u].dis){
          this.pts[u].dis = this.pts[x].dis + w;
          this.pq.push([u, this.pts[u].dis, x]);
        }
        
      }
      this.on_queue.push(this.pq.cola());
    }
    
    this.lim = this.path.length;
    for(var i = 0; i < this.n; ++i){
      if(this.pts[i].starting_node) continue;
      this.pts[i].vis = 0;
    }
    
  }
  
  this.init_dijkstra = function(){
    
    this.t = 0;
    this.discovered = new Array(this.n);
    this.pq = new PriorityQueue();
    this.starting_nodes = new Set();
    this.lim = 1;
    
    for(var i = 0; i < this.n; ++i){ 
      this.pts[i].vis = 0;
      this.pts[i].dis = inf;
      this.pts[i].on_q = 0;
      this.discovered[i] = new Set();
      this.pts[i].starting_node = 0;
    }
    
    this.path = [];
    this.on_queue = [];
  
  }
  
  this.dijkstra_animation = function(){

    if(this.path.length == 0 || mouseIsPressed){ 
      
      if(this.t == this.lim){
        this.draw_box('magenta', "Done! ",  width - 100, 40)
        for(var i = 0; i < this.n; ++i){
          if(this.pts[i].on == 1){
            
            var txt = "distance : ";
            txt+= (this.pts[i].dis == inf) ? " x": Math.round(this.pts[i].dis * 10) / 10;
            
            this.draw_box('cyan', txt,  width - 130, 80);
            break;
          }
        }
      }
      frameRate(30);
      return;
    }

    frameRate(2); 
    
    
    for(var i = 0; i <= this.t; ++i){ 
      
      let p = this.path[i][0];
      let u = this.path[i][1];
      
      this.pts[u].vis = 1;
      if( p != -1) this.discovered[p].add(u);
      
    }
    
    var t2 = min(this.t, this.on_queue.length - 1);
    for(i = 0; i < this.on_queue[t2].length; ++i){
      var it = this.on_queue[t2][i];
      this.pts[it].on_q = 1;
    }
    
    this.draw_box('cyan', "visited: " + this.path[this.t][1], width - 115, 40);
    this.draw_box('yellow', 'on queue',  width - 110, 80);
    if(this.t < this.lim) this.t++;
    if(this.t == this.lim) this.path = [];    
  
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
  
    if(this.pts[node].dis == inf){
      this.pts[node].dis = 0;
      this.pts[node].vis = 0;
      this.pts[node].on_q = 0;
      this.pq.push([node, 0, -1]); 
      this.pts[node].starting_node = 1;
    }
  }
  
}