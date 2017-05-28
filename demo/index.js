import OPTICAL from "./../index.js"


var optical = new OPTICAL();

var oldtime = new Date() * 0.001;
var newtime = new Date() * 0.001;

(function update() {
  oldtime = newtime;
  newtime = new Date() * 0.001;

  optical.update(newtime - oldtime);
  optical.render();
  // console.log("h");

  requestAnimationFrame(update);
}).call(this);
