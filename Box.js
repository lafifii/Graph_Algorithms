function Box(x, y, r){
  this.x = x;
  this.y = y;
  this.r = r;
  this.x_txt = 0;
  this.y_txt = 0;
  this.n = 50;
  this.lines = [];
  this.on = 0;
  this.txt = '';
  this.info = [];
  this.txt_sz = 15;
  this.dir = '';
  
  this.show = function(){
    if(this.lines.length == 0) this.create_lines();
    
    strokeWeight(1);
    stroke('grey');
    fill(0);
    circle(this.x, this.y, this.r*2);
    
    strokeWeight(1);
    stroke('magenta');
    fill('magenta');
    for(var i = 0; i < this.n; ++i){
      line(this.lines[i][0], this.lines[i][1], this.lines[i][2], this.lines[i][3]);
    }
    
    if(this.on){
      this.show_info()
    }
    
    strokeWeight(2);
    stroke(255);
    fill('white');
    textSize(25);
    text(this.txt, this.x - textWidth(this.txt)/2 , this.y + 10);
    
    
  }
  
  this.show_info = function(){
    push();
    stroke('white');
    fill('white');
    textSize(this.txt_sz);
    strokeWeight(1);
    var space = this.info.length*this.txt_sz/2;
    for(var i = 0; i < this.info.length; ++i)
      text(this.info[i], this.x_txt - textWidth(this.info[i])/2, this.y_txt + i*15 - space);
    pop(); 
  }
  
  this.create_lines = function(){
    for(var i = 0 ; i < this.n; ++i){
      var x1, y1, x2, y2, ang;

      ang = 2 * PI * random(1, 360) / 360;
      x1 = this.x + this.r*cos( ang );
      y1 = this.y + this.r*sin( ang );
      
      ang = 2 * PI * random(1, 360) / 360;
      x2 = this.x + this.r*cos( ang );
      y2 = this.y + this.r*sin( ang );
    
      this.lines.push([x1, y1, x2, y2]);
    }
  
  }
  
  this.update = function(){
    var d = dist(mouseX, mouseY, this.x, this.y);
    this.on = d <= this.r;
  }
  
  this.add_txt = function(x, y, txt, dir){
    
    this.dir = dir;
    this.x_txt = x;
    this.y_txt = y;
    var aux = txt.split(' ');
    var line = '';
    
    for(var i = 0; i < aux.length; ++i){
      
      line+= aux[i] + " ";
      if(line.length >= 15){ 
        this.info.push(line);
        line = '';
      }
    }
    
    if(line.length != 0) this.info.push(line);
    
  }
  
  this.clicked = function(){
    if(this.on){ 
      window.open(this.dir);
    }
    return this.on;
  }
}