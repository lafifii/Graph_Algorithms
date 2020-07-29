function DSU(n){

  this.make_set = function(){
    for(var i = 0; i < this.n; ++i){
      this.parent[i] = i;
      this.rank[i] = 0;
    }
  }

  this.n = n;
  this.parent = new Array(this.n);
  this.rank = new Array(this.n);
  this.make_set();


  this.find = function(x){
    if(this.parent[x] == x) return x;
    return this.parent[x] = this.find(this.parent[x]);
  }

  this.union = function(a, b){
    a = this.find(a);
    b = this.find(b);

    if(a != b){

      if(this.rank[a] < this.rank[b]){
        [a, b] = [b, a];
      }

      this.parent[b] = a;
      if(this.rank[a] == this.rank[b]) this.rank[a]++;

      return 1;
    }
    return 0;
  }

}
