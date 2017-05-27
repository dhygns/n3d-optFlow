import OPTICAL from "./../index.js"


var optical = new OPTICAL();


(function update() {
  optical.update(0.001);
  optical.render();
  // console.log("h");
  requestAnimationFrame(update);
}).call(this);
