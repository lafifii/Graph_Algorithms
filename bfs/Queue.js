function Queue(){
  this.items = {};
  this.head = 0;
  this.tail = 0;
  
  this.enqueue = function(element){
    this.items[this.tail] = element;
    this.tail++;
  }
  
  this.size = function(){
    return this.tail - this.head;
  }

  this.dequeue = function(){
  
    let item = this.items[this.head];
    
    delete this.items[this.head];

	this.head++;
    
    if (this.head == this.tail){
		this.head = 0;
		this.tail = 0;
	}
    		
	return item;
  }
  
  this.cola = function(){
    var q = [];
    for(var i = this.head; i < this.tail; ++i){ 
      q.push(this.items[i]);
    }
    return q;
  }
}