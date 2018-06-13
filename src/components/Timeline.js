import React, { Component } from 'react'
import { connect } from 'react-redux'
import { colors } from 'style-constants'
import Reorder from 'react-reorder'

class Timeline extends Component {
  render() {
    const style = {
      background: colors.GRAY
    }
    const elements = this.props.entries.map(e => {
      return {
        name: e.path,
        path: e.path
      }
    })
    return <Reorder
      style={style}
      itemKey='name'
      lock='vertical'
      list={elements}
      template={TimelineEntry}
      />
  }
}

export default connect(state => {
  return {
    entries: state.images.entries
  }
})(Timeline)