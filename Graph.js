

function Graph(n, rd, w_min, w_max, show_w){
  this.n = n;
  this.lad = new Array(this.n);
  this.discovered = new Array(this.n);
  this.pts = [];
  this.rd = rd;
  this.let_h = 0;
  this.w_min = w_min;
  this.w_max = w_max;
  this.show_w = show_w;
  
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
          var w = random(this.w_min, this.w_max);
          this.lad[i].push([j, w]);
        }
      }
    }
    
  }

  this.add_edge = function(a, b, w){
    if(w < 0 || a < 0 || a >= this.n || b < 0 || b >= this.n) 
      return;
    this.lad[a].push([b, w]);
  }
  
  
  this.delete_edge = function(a, b){

    if(a < 0 || a >= this.n || b < 0 || b >= this.n) return;
    
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
  
  this.draw_edges = function(flag){
    fill('white');
      for(var i = 0; i < this.n; ++i){
        for(var j = 0; j < this.lad[i].length; ++j){
          var item = this.lad[i][j][0];
          
          if(this.discovered.length == this.n && this.discovered[i].has(item) ){
             stroke('magenta');          
          }
          else{ 
            if(flag) noStroke();
            else stroke('grey');
          }
          
          if(i == item)
            this.draw_self(this.pts[i].x, this.pts[i].y);
          else
            line(this.pts[i].x, this.pts[i].y, this.pts[item].x, this.pts[item].y); 
        }
      }
  
  }
  
  this.draw_arrows = function(flag){
    for(var i = 0; i < this.n; ++i){
        for(var j = 0; j < this.lad[i].length; ++j){
          var item = this.lad[i][j][0];
          if(i == item) continue;
          
          if(this.discovered.length == this.n && !this.discovered[i].has(item) ){
             if(flag) continue;          
          }
          
          this.draw_arrow(this.pts[i], this.pts[item]);
        }
    }
  }
  
  this.show = function(flag=0){
    
    if(this.n != 0){
      this.let_h = this.pts[0].w;

      this.draw_edges(flag);
      this.draw_arrows(flag);

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
          if(this.show_w){ 
            text(Math.round(this.lad[i][j][1]*10)/10, txt_x, txt_y);
          }
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


    draw_box('grey', "N: " + this.n, width - 100, 0);
    
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
  
}