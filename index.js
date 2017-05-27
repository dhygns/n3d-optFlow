import THREE from 'n3d-threejs'
import WebCam from './src/webcam.js'
import Prevpipe from './src/pipelines/Prevpipe.js'
import Diffpipe from './src/pipelines/Diffpipe.js'


class OptFlow {
  constructor(rdrr) {
    if(rdrr == undefined) {
      this.rdrr = new THREE.WebGLRenderer({alpha : false});
      this.rdrr.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this.rdrr.domElement);
    } else {
      this.rdrr = rdrr;
    }
    // console.log(THREE);

    this.webcam = new WebCam(this.rdrr);
    
    this.pipeline_prev = new Prevpipe(this.rdrr,
      this.webcam.getTexture());

    this.pipeline_diff = new Diffpipe(this.rdrr,
      this.pipeline_prev.getTexture(),
      this.webcam.getTexture()
    );
    // console.log(this.pipeline_prev);

    this.camera = new THREE.Camera();
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 2.0),
      new THREE.MeshBasicMaterial({ map : this.pipeline_diff.getTexture() })
    ));
  }

  update(dt) {
    this.pipeline_prev.update();
    this.webcam.update();
    this.pipeline_diff.update();
  }

  render() {
    if(this.pipeline_diff.isReady() == true) this.rdrr.render(this.scene, this.camera);
  }
}

export default OptFlow
