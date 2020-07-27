function Node(value, rd){

  this.x = 50 + Math.round(Math.random() * (width - 150));
  this.y = 100 + Math.round(Math.random() * (height - 200));
  this.val = value;
  this.on = 0;
  this.w = textWidth(this.val);
  this.vis = 0;
  this.rd = rd;
  this.dis = -1;
  this.on_q = 0;
  this.starting_node = 0;

  this.clicked = function(first){
    var dis = sqrt((mouseX - this.x)*(mouseX - this.x) + (mouseY - this.y)*(mouseY - this.y) );
    if(dis <= this.rd && first == false) this.on = 1;
    else this.on = 0;

    return this.on;
  }

  this.show = function(let_h){
    if(this.on == 1 && mouseIsPressed){
      noStroke();
      this.x = mouseX;
      this.y = mouseY;
    }
    else noStroke();

    if(this.vis || this.starting_node) fill('#edae49');
    else{
      if(this.on_q == 1) fill('#d1495b');
      else fill('#00798c');
    }


    circle(this.x, this.y, this.rd, this.rd);
    strokeWeight(1);

    fill('black');
    textSize(20);
    text(this.val, this.x - this.w/2, this.y + let_h);

  }

}
