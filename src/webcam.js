import THREE from "n3d-threejs"
import INFO from "./information.js"

class WebCam {
  constructor(rdrr) {
    // this.isReady = false;
    this.rdrr = rdrr;

    this.video = document.createElement("video");
    this.video.width = INFO.webcamWidth;
    this.video.height = INFO.webcamHeight;
    this.video.autoplay = true;

    // console.log(navigator.webkitGetUserMedia);
    // this.context = this.video.getContext('2d');
    navigator.webkitGetUserMedia({video : true}, this._gotStream.bind(this), this._noStream.bind(this));

    this.videotexture = new THREE.Texture(this.video);
    this.videotexture.minFilter = THREE.LinearFilter;
    this.videotexture.magFilter = THREE.LinearFilter;

    this.texture = new THREE.WebGLRenderTarget(
      INFO.textureWidth, INFO.textureHeight, {
          minFilter : THREE.LinearFilter,
          magFilter : THREE.LinaerFilter,
      }
    );
    this.texture.isready = false;

    this.camera = new THREE.Camera();
    this.canvas = new THREE.Object3D();
    this.canvas.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 2.0),
      new THREE.MeshBasicMaterial({map : this.videotexture})
    ));
    this.scene = new THREE.Scene();
    this.scene.add(this.canvas);

  }

  _gotStream(stream) {
      if (window.URL)
      {
          this.video.src = window.URL.createObjectURL(stream);
      } else // Opera
      {
          this.video.src = stream;
      }
      this.video.onerror = function (e)
      {
          stream.stop();
      };
      stream.onended = this._noStream.bind(this);
      // this.isReady = true;
  }

  _noStream(e) {
    var msg = 'No camera available.';
    if (e.code == 1)
    {
        msg = 'User denied access to use camera.';
    }
    document.getElementById('errorMessage').textContent = msg;
  }

  update() {
    this.texture.isready = this.videotexture.needsUpdate = !this.video.paused;
    if(this.texture.isready)
      this.rdrr.render(this.scene, this.camera, this.texture);
  }


  getTexture() { return this.texture; }

  isReady() { return !this.video.paused; }
}


export default WebCam
