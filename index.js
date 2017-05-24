import THREE from 'n3d-threejs'


class Perlin {
  constructor(rdrr, width, height) {
    if(rdrr == undefined) {
      this.rdrr = new THREE.WebGLRenderer({alpha : false});
      this.rdrr.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this.rdrr.domElement);
    } else { this.rdrr = rdrr; }
    // console.log(THREE);



    this.camera = new THREE.Camera();
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 2.0),
      new THREE.MeshBasicMaterial({ color : "red" })
    ));
  }

  update(dt) {
  }

  renderForDebug() {
    this.rdrr.render(this.scene, this.camera);
  }
}

export default Perlin
