import THREE from 'n3d-threejs'
import PIPE from './Pipeline.js'
import INFO from './../information.js'

class Diffpipe extends PIPE{
  constructor(rdrr, prevtex, currtex) {
    super(rdrr);
    this.prevtex = prevtex;
    this.currtex = currtex;

    this.canvas.add(new THREE.Mesh( this.geometry,
      new THREE.ShaderMaterial({
        uniforms : {
          unif_prev : { type : "t", value : this.prevtex},
          unif_curr : { type : "t", value : this.currtex},
          unif_reso : { type : "2f",value : [INFO.textureWidth, INFO.textureHeight]}
        },
        fragmentShader : `
        uniform sampler2D unif_prev;
        uniform sampler2D unif_curr;
        uniform vec2 unif_reso;

        varying vec2 vtex;

        void main(void) {
          vec2 offset_x = vec2(1.0, 0.0) / unif_reso.x;
          vec2 offset_y = vec2(0.0, 1.0) / unif_reso.y;

          //현재의 색깔
          vec3 currcol = texture2D(unif_curr, vtex).rgb;
          vec3 prevcol = texture2D(unif_prev, vtex).rgb;
          vec3 diffcol = prevcol - currcol;

          float power = smoothstep(0.0, 1.0, length(diffcol));

          float mdiff = length(vec3(1.0));
          vec3 diffr = texture2D(unif_prev, vtex + offset_x).rgb - currcol;
          vec3 diffl = texture2D(unif_prev, vtex - offset_x).rgb - currcol;
          vec3 difft = texture2D(unif_prev, vtex + offset_y).rgb - currcol;
          vec3 diffb = texture2D(unif_prev, vtex - offset_y).rgb - currcol;

          vec2 dir = vec2(0.0);
          dir.x += mdiff - length(diffr);
          dir.x -= mdiff - length(diffl);
          dir.y += mdiff - length(difft);
          dir.y -= mdiff - length(diffb);

          vec2 force = power * normalize(dir);

          if(length(dir) < 0.01) force = vec2(0.0, 0.0);
          gl_FragColor = vec4(force * 0.5 + 0.5 , 0.0, 1.0);
        }

        `,
        vertexShader : `
        varying vec2 vtex;
        void main(void) {
          vtex = uv;
          gl_Position = vec4(position, 1.0);
        }
        `
      })
    ));
  }

  update() {
    if(this.prevtex.isready && this.currtex.isready) {
      this.render();
    }
  }
}

export default Diffpipe
