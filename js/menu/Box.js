function Box(x, y, r){
  this.x = x;
  this.y = y;
  this.r = r;
  this.x_txt = 0;
  this.y_txt = 0;
  this.n = 70;
  this.lines = [];
  this.on = 0;
  this.txt = [];
  this.info = [];
  this.txt_sz = 15;
  this.dir = '';

  this.show = function(){
    if(this.lines.length == 0) this.create_lines();

    strokeWeight(1);
    noStroke();
    fill('#8d96a3');
    circle(this.x, this.y, this.r*2);

    strokeWeight(1);
    stroke('#AFAFAF');
    fill('#AFAFAF');

    for(var i = 0; i < this.n; ++i){
      line(this.lines[i][0], this.lines[i][1], this.lines[i][2], this.lines[i][3]);
    }

    if(this.on){
      show_info(this.info, this.txt_sz, this.x_txt, this.y_txt);
    }

    if(this.on){
      stroke(0);
      fill(0);
    }
    else{
      stroke('#2e4057');
      fill('#2e4057');
    }
    strokeWeight(1.3);
    textSize(18);

    var h = 10 - (this.txt.length - 1)* 10;
    for(i = 0; i < this.txt.length; ++i){
      text(this.txt[i], this.x - textWidth(this.txt[i])/2 , this.y + h + i*20);
    }

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
    this.info = split_info(txt);

  }

  this.clicked = function(){
    if(this.on){
      window.open(this.dir);
    }
    return this.on;
  }

  this.resize = function(x, y){
    this.x = x;
    this.y = y;
    this.lines = [];
  }
}
