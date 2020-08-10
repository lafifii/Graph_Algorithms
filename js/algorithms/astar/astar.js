
var colors = ['#8d96a3', '#2e4060', '#66a182', '#d1495b', '#edae49', '#00798c', '#d1495b'];
var inf = 10000000000000;

function AStar(rows, columns, width_, height_, frame_rate){

  this.create_matrix = function(){
    var mx = new Array(this.rows);
    var vis = new Array(this.rows);
    var md = new Array(this.rows);
    var md2 = new Array(this.rows);
    var pr = new Array(this.rows);

    for(var i = 0; i < this.rows; ++i){
      mx[i] = new Array(this.columns);
      vis[i] = new Array(this.columns);
      md[i] = new Array(this.columns);
      md2[i] = new Array(this.columns);
      pr[i] = new Array(this.columns);

      for(var j = 0; j < this.columns; ++j){
        mx[i][j] = 0;
        vis[i][j] = 0;
        md[i][j] = inf;
        md2[i][j] = inf;
        pr[i][j] = [-1, -1];
      }
    }

    mx[this.start[0]][this.start[1]] = 2;
    mx[this.end[0]][this.end[1]] = 3;

    this.obstacles = Math.round(random(0, max(this.rows, this.columns)));
    return [mx, vis, md, md2, pr];

  }

  this.rows = rows;
  this.columns = columns;
  this.d_x = [-1, 0, 0, 1];
  this.d_y = [0, 1, -1, 0];
  this.start = [0, 0];
  this.end = [this.rows - 1, this.columns - 1];
  this.open_set = new PriorityQueue((a, b) => a[1] < b[1]);

  this.width_ = width_;
  this.height_ = height_;
  this.animation = 0;
  this.option_h = 0;

  this.obstacles = Math.round(random(1, this.rows*this.columns/10));
  this.iterations = Math.round(random(1, 10));
  this.y = Math.floor(random(0, this.rows));
  this.x = Math.floor(random(0, this.columns));
  this.frame_rate = frame_rate;

  [this.matrix, this.vis , this.f_score, this.g_score, this.parent] = this.create_matrix();

  this.change_matrix = function(){

    if(this.matrix[this.y][this.x] == 0) this.matrix[this.y][this.x] = 1;
    var id = Math.floor(random(0, this.d_x.length));
    if(this.x + this.d_x[id] >= 0 && this.x + this.d_x[id] < this.columns)
      this.x+= this.d_x[id];

    if(this.y + this.d_y[id] >= 0 && this.y + this.d_y[id] < this.rows)
      this.y+= this.d_y[id];

    if(this.matrix[this.y][this.x] == 0) this.matrix[this.y][this.x] = 1;
    this.iterations--;

    if(this.iterations <= 0){
      this.obstacles--;
      this.iterations = Math.round(random(1, 10));
      this.y = Math.floor(random(0, this.rows));
      this.x = Math.floor(random(0, this.columns));

    }

  }

  this.show = function(){

    if(this.obstacles > 0){
      frameRate(60);
      this.change_matrix();
    }

    if(this.animation){
      frameRate(this.frame_rate);
      this.astar();
    }

    var w = this.width_/this.columns;
    var h = this.height_/this.rows;

    for(var i = 0; i < this.rows; ++i){
      for(var j = 0; j < this.columns; ++j){
        stroke('black');
        fill(colors[this.matrix[i][j]]);
        rect(j*w, i*h, w, h);

      }
    }

  }

  this.heuristic = function(y, x){
    if(this.option_h) return abs(this.end[0] - y) + abs(this.end[1] - x);
    return sqrt((this.end[0] - y)*(this.end[0] - y) + (this.end[1] - x)*(this.end[1] - x) );
  }

  this.d = function(a, b){
    if(this.option_h) return abs(a[0] - b[0]) +  abs(a[1] - b[1]);
    return sqrt((a[0] - b[0])*(a[0] - b[0]) + (a[1] - b[1])*(a[1] - b[1]));
  }

  this.astar = function(){

    if(this.open_set.size() > 0){

      var top = this.open_set.top()[0];
      this.open_set.pop();

      if(top[0] == this.end[0] && top[1] == this.end[1]){
        while(this.open_set.size() > 0) this.open_set.pop();
        return;
      }


      if(this.vis[top[0]][top[1]]) return;
      this.vis[top[0]][top[1]] = 1;
      this.matrix[top[0]][top[1]] = 4;


      for(var i = 0; i < this.d_x.length; ++i){
        var y = top[0] + this.d_y[i];
        var x = top[1] + this.d_x[i];
        if( this.valid(y,x) ) continue;
        if( this.matrix[y][x] == 0 || this.matrix[y][x] == 3){
          var dis = this.g_score[top[0]][top[1]] + this.d(top, [y, x]);
          if(dis  < this.g_score[y][x]){
            this.g_score[y][x] = dis;
            this.f_score[y][x] = dis + this.heuristic(y, x);
            this.parent[y][x] = top;
            this.open_set.push([[y, x], this.f_score[y][x]]);
            this.matrix[y][x] = 5;
          }
        }
      }
    }
    else{
      console.log(this.end);
      for( ; this.end[0] != -1; ){
        console.log(this.end);
        this.matrix[this.end[0]][this.end[1]] = 6;
        this.end = this.parent[this.end[0]][this.end[1]];
      }
    }
  }

  this.start_animation = function(op){
    if(this.obstacles > 0 || this.animation) return;

    var y, x;
    [y, x] = this.start;

    this.option_h = op;
    this.f_score[y][x] = this.heuristic(y, x);
    this.g_score[y][x] = 0;
    this.open_set.push([[y, x], this.f_score[y][x]]);
    this.animation = 1;
  }

  this.init = function(){

    this.start = [0, 0];
    this.end = [this.rows - 1, this.columns - 1];
    this.open_set = new PriorityQueue((a, b) => a[1] < b[1]);

    this.width_ = width_;
    this.height_ = height_;
    this.animation = 0;
    this.option_h = 0;

    this.obstacles = Math.round(random(1, this.rows*this.columns/10));
    this.iterations = Math.round(random(1, 10));
    this.y = Math.floor(random(0, this.rows));
    this.x = Math.floor(random(0, this.columns));

    [this.matrix, this.vis , this.f_score, this.g_score, this.parent] = this.create_matrix();
  }

  this.change_obstacle = function(y, x){

    [y, x] = this.get_pos(y, x);

    if(this.valid(y, x)) return;
    if(this.matrix[y][x] == 0) this.matrix[y][x] = 1;
    else if(this.matrix[y][x] == 1) this.matrix[y][x] = 0;

  }

  this.change_start = function(y, x){
    if(this.obstacles > 0 || this.animation) return;
    if(x < 0 || y < 0 || x >= this.columns || y >= this.rows) return;
    if(this.matrix[y][x] == 3) return;

    this.matrix[this.start[0]][this.start[1]] = 0;
    this.start = [y, x];
    this.matrix[this.start[0]][this.start[1]] = 2;
  }

  this.change_end = function(y, x){
    if(this.obstacles > 0 || this.animation) return;
    if(x < 0 || y < 0 || x >= this.columns || y >= this.rows) return;
    if(this.matrix[y][x] == 2) return;

    this.matrix[this.end[0]][this.end[1]] = 0;
    this.end = [y, x];
    this.matrix[this.end[0]][this.end[1]] = 3;
  }

  this.change_dimensions = function(rows, columns){

    var ok = 0;
    if(rows > 1){
      this.rows = rows;
      ok = 1;
    }

    if(columns > 1){
      this.columns = columns;
      ok = 1;
    }

    if(ok) this.init();
  }

  this.get_pos = function(y, x){
    var w = this.width_/this.columns;
    var h = this.height_/this.rows;

    var y = Math.floor( y/ h);
    var x = Math.floor( x/ w);

    return [y, x];

  }

  this.valid = function(y, x){
      return (y < 0  || y >= this.rows || x < 0 || x >= this.columns);
  }
}
