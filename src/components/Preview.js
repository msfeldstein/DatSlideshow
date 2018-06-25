import React, { Component } from 'react'
import { connect } from 'react-redux'
import { colors } from 'style-constants'
import { save } from 'dat-api'
import Regl from 'regl'
import resl from 'resl'

class Preview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      texturesLoaded: false,
      images: {}
    }
    this.textureCache = {}
    this.onFrame = this.onFrame.bind(this)
    this.updateRegl = this.updateRegl.bind(this)
    this.containerRef = React.createRef()
  }

  componentDidMount() {
    this.updatePlaybackManager(this.props, {})
    this.regl = Regl(this.containerRef.current)
    this.regl.frame(this.updateRegl)
  }

  updatePlaybackManager(nextProps, props) {
    if (nextProps.playbackManager != props.playbackManager) {
      if (this.props.playbackManager) {
        this.props.playbackManager.removeFrameListener(this.onFrame)
      }
      if (nextProps.playbackManager) {
        nextProps.playbackManager.addFrameListener(this.onFrame)
      }
    }
  }

  textureForImage(img) {
    if (!img) {
      if (!this.emptyTexture)
        this.emptyTexture = this.regl.texture({shape: [1,1]})
      return this.emptyTexture
    }
    if (!this.textureCache[img.src]) {
      console.log("Load texture")
      this.textureCache[img.src] = this.regl.texture(img)  
    }
    return this.textureCache[img.src]
  }

  updateRegl() {
    let tex;
    let imageResolution = [1, 1]
    let canvasResolution = [1,2]
    const i = this.props.playbackManager.currentFrameIndex()
    const img = this.state.images[i]
    if (this.state.texturesLoaded && img) {
      tex = this.textureForImage(img)
      imageResolution = [ img.width, img.height ]
    }
    else {
      tex = this.textureForImage(null)
    }
    this.regl({
      // In a draw call, we can pass the shader source code to regl
      frag: `
      precision mediump float;
      uniform sampler2D texture;
      uniform vec2 imageResolution;
      uniform vec2 canvasResolution;
      varying vec2 vUV;
      void main () {
        vec4 col = texture2D(texture, vUV);
        // col = vec4(vUV, 0.0, 1.0);
        gl_FragColor = col;
      }`,

      vert: `
      precision mediump float; 
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUV;
      void main () {
        vUV = uv;
        gl_Position = vec4(position, 0, 1);
      }`,

      attributes: {
        position: [
          [-1, -1],
          [-1, 1],
          [1, 1],
          [-1, -1],
          [1, 1],
          [1, -1],
        ],
        uv: [
          [0, 1],
          [0, 0],
          [1, 0],
          [0, 1],
          [1, 0],
          [1, 1]
        ]
      },

      uniforms: {
        imageResolution,
        canvasResolution,
        texture: tex,
      },

      count: 6
    })()

  }

  onFrame(t) {
    this.updateRegl()
  }

  componentWillReceiveProps(nextProps) {
    const manifest = {}
    nextProps.entries.forEach((e, i) => {
      manifest[i] = {
        type: 'image',
        src: e.scaled
      }
    })
    resl({
      manifest: manifest,
      onDone: (assets) => {
        console.log(assets, assets.length, "len")
        this.setState({
          texturesLoaded: true,
          images: assets
        })
      },
      onError: (err) => {
        console.error(err)
      }
    })
  }

  componentDidUpdate(nextProps) {
    this.updateRegl()
  }

  render() {
    return (<div ref={this.containerRef} className="preview-container">

    </div>)
  }
}

export default connect(state => {
  return {
    entries: state.images.entries || [],
    playbackManager: state.playbackManager.manager
  }
})(Preview)