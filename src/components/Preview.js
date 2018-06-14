import React, { Component } from 'react'
import { connect } from 'react-redux'
import { colors } from 'style-constants'
import { save } from 'dat-api'
import Regl from 'regl'

class Preview extends Component {
  constructor(props) {
    super(props)
    this.containerRef = React.createRef()
  }
  componentDidMount() {
    this.regl = Regl(this.containerRef.current)
    this.regl({
      // In a draw call, we can pass the shader source code to regl
      frag: `
      precision mediump float;
      uniform vec4 color;
      void main () {
        gl_FragColor = color;
      }`,

      vert: `
      precision mediump float;
      attribute vec2 position;
      void main () {
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
          
        ]
      },

      uniforms: {
        color: [1, 0, 0, 1]
      },

      count: 6
    })()

  }
  render() {
    return (<div ref={this.containerRef} className="preview-container">

    </div>)
  }
}

export default connect(state => {
  return {
    entries: state.images.entries
  }
})(Preview)