var w = window.innerWidth;
var h = window.innerHeight;

window.onresize = function() {

  w = max(w, window.innerWidth);
  h = max(h, window.innerHeight);
  resizeCanvas(w, h);
}
