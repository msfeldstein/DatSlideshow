import React, { Component } from 'react'
import { connect } from 'react-redux'
import { colors } from 'style-constants'
import Sortable from 'react-sortable'
import TimelineEntry from './TimelineEntry'

class Timeline extends Component {
  onSortItems() {
    console.log("SORT", arguments)
  }
  
  render() {
    const style = {
      background: colors.GRAY,
      display: 'flex',
      flexOrient: 'row',
      listStyleType: 'none',
      margin: 0,
      padding: 0,
      overflowX: 'scroll'
    }
    let elements = this.props.entries.map((e, i) => {
      return <TimelineEntry
        element={e}
        sortId={i}
        onSortItems={this.onSortItems.bind(this)}
        items={this.props.entries}
        key={i} />
    })
    return (
      <ul className='sortable-list' style={style}>
        {elements}
      </ul>
    )
  }
}

export default connect(state => {
  return {
    entries: state.images.entries || []
  }
})(Timeline)