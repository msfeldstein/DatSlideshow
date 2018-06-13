import React, { Component } from 'react'
import { connect } from 'react-redux'
import { colors } from 'style-constants'
import Reorder from 'react-reorder'

class TimelineEntry extends Component {
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
    return (<div>
      ${this.props.name}
    </div>)
  }
}

export default TimelineEntry connect(state => {
  return {
    entries: state.images.entries
  }
})(TimelineEntry)