function Option(txt, n_input){

   this.create_design = function(){
    this.button.style('background-color', '#8d96a3')
    this.button.style('border-radius','20px');
    this.button.style('border','none');
    this.button.style('font-family','arial');
    this.button.style('font-size','15px');
    this.button.style('margin-left', '10px');
    this.button.style('margin-bottom', '10px');
  }

  this.create_input = function(){
    this.inputs = new Array(this.n);
    for(var i = 0; i < this.n; ++i){
      this.inputs[i] = createInput();
      this.inputs[i].size(40);
      this.inputs[i].value(0);
    }

  }


  this.n = n_input;
  this.inputs = [];
  this.txt = txt;
  this.id = 0;

  this.create_input();
  this.button = createButton(this.txt[this.id]);
  this.create_design();


  this.change_text = function(){
    this.id = (this.id + 1)%this.txt.length;
    this.button.html(this.txt[this.id]);
  }

}

function draw_box(col, txt, y){

    fill(col);
    textSize(20);

    noStroke();
    rect(width - 160, y, 160, 40);
    fill(0);
    text(txt, width - 75 - textWidth(txt)/2 , y + 30);
    strokeWeight(1);
}

function first_d(n){
  var sign = n < 0 ? -1 : 1;
  n = abs(n);
  if (String(n).length > 2) {
      var d = Math.pow(10, String(n).length-2);
      n = Math.ceil(n/d);
  }
  return n*sign;

}
