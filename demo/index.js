import * as THREE from "three"
import OPTICAL from "./../src/index.js"

var renderer = new THREE.WebGLRenderer({alpha : false});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var optical = new OPTICAL(renderer);

var camera = new THREE.Camera();
var scene = new THREE.Scene();
var colormap = new THREE.Object3D();
colormap.add(new THREE.Mesh(
  new THREE.PlaneGeometry(2.0, 2.0),
  new THREE.MeshBasicMaterial({ map : optical.getTexture() })
));


scene.add(colormap);

for(var y = -8; y <= 8 ; y++) {
  for(var x = -8; x <= 8 ; x++) {
    var object = new THREE.Object3D();
    object.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 2.0),
      new THREE.ShaderMaterial({
        uniforms : { unif_force : { type : "t" ,value : optical.getTexture()}},
        fragmentShader : `
        varying vec2 vtex;
        void main(void) {
          gl_FragColor = vec4(vtex, 0.0, 1.0);
        }
        `,
        vertexShader : `
        uniform sampler2D unif_force;
        varying vec2 vtex;

        mat4 scale(float val) {
          mat4 m;
          m[0] = vec4(val, 0.0, 0.0, 0.0);
          m[1] = vec4(0.0, val, 0.0, 0.0);
          m[2] = vec4(0.0, 0.0, val, 0.0);
          m[3] = vec4(0.0, 0.0, 0.0, 1.0);

          return m;
        }


        void main(void) {
          vtex = uv;

          vec4 pos = projectionMatrix * modelMatrix * viewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
          vec4 foc = texture2D(unif_force, (pos.xy * 0.5 + 0.5)) * 2.0 - 1.0;

          gl_Position = projectionMatrix * modelMatrix * viewMatrix * scale(length(foc.rg) * 0.1) * vec4(position, 1.0);

        }
        `,
        transparent : true
      })
    ));
    scene.add(object);
    object.position.x = 1 / 8 * x;
    object.position.y = 1 / 8 * y;
  }
}

var oldtime = new Date() * 0.001;
var newtime = new Date() * 0.001;

(function update() {
  oldtime = newtime;
  newtime = new Date() * 0.001;

  optical.update(newtime - oldtime);

  if(optical.isReady()) renderer.render(scene, camera);
  // console.log("h");

  requestAnimationFrame(update);
}).call(this);
