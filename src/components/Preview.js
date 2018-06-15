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
      texturesLoaded: false
    }
    this.onFrame = this.onFrame.bind(this)
    this.containerRef = React.createRef()
  }

  componentDidMount() {
    this.updatePlaybackManager(this.props, {})
    this.regl = Regl(this.containerRef.current)
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

  updateRegl() {
    let tex;
    if (this.state.texturesLoaded) {
      tex = this.regl.texture(this.state.textures[0])
    }
    else {
      tex = this.regl.texture({shape: [16,16]})
    }
    this.regl({
      // In a draw call, we can pass the shader source code to regl
      frag: `
      precision mediump float;
      uniform sampler2D texture;
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
          [0, 0],
          [0, 1],
          [1, 1],
          [0, 0],
          [1, 1],
          [1, 0]
        ]
      },

      uniforms: {
        texture: tex,
      },

      count: 6
    })()

  }

  onFrame(t) {
    
  }

  componentWillReceiveProps(nextProps) {
    const manifest = {}
    nextProps.entries.forEach((e, i) => {
      console.log(e.path)
      manifest[i] = {
        type: 'image',
        src: e.path
      }
    })
    console.log("Manifest", manifest)
    resl({
      manifest: manifest,
      onDone: (assets) => {
        console.log("Assets", assets)
        this.setState({
          texturesLoaded: true,
          textures: assets
        })
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
  console.log(state,"Connect", state.images.entries)
  return {
    entries: state.images.entries || [],
    playbackManager: state.playbackManager.manager
  }
})(Preview)