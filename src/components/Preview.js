import React, { Component } from 'react'
import { connect } from 'react-redux'
import { colors } from 'style-constants'
import { save } from 'dat-api'

class Preview extends Component {
  render() {
    return (<div className="preview-container">
      PREVIEW
    </div>)
  }
}

export default connect(state => {
  return {
    entries: state.images.entries
  }
})(Preview)