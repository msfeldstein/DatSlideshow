import React from 'react'
import FileDrop from 'react-file-drop'
import { connect } from 'react-redux'
import { addImage } from 'modules/images'

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

class Dropper extends React.Component {
  onDrop(files) {
    const file = files[0]
    const reader = new FileReader()
    reader.onload = () => {
      const buffer = reader.result
      this.props.dispatch(addImage(buffer))
    }
    reader.readAsArrayBuffer(file)
  }
  render() {
    return (
      <FileDrop onDrop={this.onDrop.bind(this)}>Upload an image</FileDrop>
    )
  }
}

export default connect()(Dropper)