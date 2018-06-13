import React, { Component } from 'react'
import { connect } from 'react-redux'
import { colors } from 'style-constants'
import { save } from 'dat-api'

class Header extends Component {
  save() {
    save(this.props.entries)
  }
  render() {
    const style = {
      background: colors.GRAY
    }
    return (<div style={style}>
      Slideshow <button onClick={this.save.bind(this)}>Save</button>
    </div>)
  }
}

export default connect(state => {
  return {
    entries: state.images.entries
  }
})(Header)