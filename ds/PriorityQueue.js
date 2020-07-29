function PriorityQueue(comparator = (a, b) => a < b){
  this.items = [];
  this.head = 0
  this._comparator = comparator;
  
  this.parent = function(i){
    return ( (i + 1) >> 1 ) - 1;
  }
  
  this.left = function(i){
    return ( i << 1) + 1;
  }
  
  this.right = function(i){
    return (i + 1) << 1;
  }
  
  this.size = function(){
    return this.items.length;
  }
  
  this.top = function(){
    return this.items[this.head];
  }
  
  this.push = function(element){
    this.items.push(element);
    this._up();
  }
  
  this.pop = function(){
    var tp = this.top();
    var bt = this.size() - 1;
    if(bt > this.head) 
      this.swap(this.head, bt);
    
    this.items.pop();
    this._down();
    return tp;
  }
  
  this.replace = function(val){
    var rep = this.top();
    this.items[this.head] = val;
    this._down();
    return rep;
  }
  
  this.swap = function(i, j){
    var aux = this.items[i];
    this.items[i] = this.items[j];
    this.items[j] = aux;
  }
  
  this._less = function(i, j) {
      return this._comparator(this.items[i], this.items[j]);
  }
  
  this._up = function(){
    var node = this.size() - 1;
    while(node > this.head && this._less(node, this.parent(node) ) ){
      this.swap(node, this.parent(node));
      node = this.parent(node);
    }
  }
  
  this._down = function(){
    var node = this.head;
    while ( ( this.left(node) < this.size() && this._less(this.left(node), node)) ||
      (this.right(node) < this.size() && this._less(this.right(node), node)) ) {
      
      var maxChild = (this.right(node) < this.size() && this._less(this.right(node), this.left(node))) ? this.right(node) : this.left(node);
      this.swap(node, maxChild);
      node = maxChild;
      
    }
    
  }
  
  this.cola = function(){
    var q =  [];
    for(var i = this.head; i < this.items.length; ++i) 
      q.push(this.items[i][0]);
    
    return q;
  
  }
  
}