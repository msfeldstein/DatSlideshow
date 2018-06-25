import React, { Component } from 'react'
import { connect } from 'react-redux'
import { colors } from 'style-constants'
import {Sortable} from 'react-sortable'

class TimelineEntry extends Component {
  render() {
    const style = {
      margin: 10
    }
    const imgStyle = {
      width: 128,
      height: 128,
      borderRadius: 10,
      border: '2px solid white'
    }
    console.log("EL", this.props.element.thumb)
    return (<li {...this.props} style={style}>
      <img style={imgStyle} src={this.props.element.thumb} />
    </li>)
  }
}

export default Sortable(TimelineEntry)