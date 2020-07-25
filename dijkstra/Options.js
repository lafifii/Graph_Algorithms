function Option(txt, n_input){
  
   this.create_design = function(){
    this.button.style('background-color', '#27E7EA')
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
      this.inputs[i] .size(40);
      this.inputs[i] .value(0);
    }    
  
  }
  
  
  this.n = n_input;
  this.inputs = [];
  
  this.create_input();
  this.button = createButton(txt);
  this.create_design();
  
}