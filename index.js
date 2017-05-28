import THREE from 'n3d-threejs'
import WebCam from './src/pipelines/Webcampipe.js'
import Prevpipe from './src/pipelines/Prevpipe.js'
import Diffpipe from './src/pipelines/Diffpipe.js'
import Decaypipe from './src/pipelines/Decaypipe.js'


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

    this.pipeline_decay = new Decaypipe(this.rdrr,
      this.pipeline_diff.getTexture())
    // console.log(this.pipeline_prev);

    this.camera = new THREE.Camera();
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 2.0),
      new THREE.MeshBasicMaterial({ map : this.pipeline_decay.getTexture() })
    ));
  }

  update(dt) {
    this.pipeline_prev.update();
    this.webcam.update();
    this.pipeline_diff.update();
    this.pipeline_decay.update(dt);
  }

  render() {
    if(this.pipeline_decay.isReady() == true) this.rdrr.render(this.scene, this.camera);
  }
}

export default OptFlow
