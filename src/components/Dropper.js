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
  constructor(props) {
    super(props)
    this.state = {
      dragOver: false
    }
  }
  componentDidMount() {
    window.addEventListener('dragenter', () => {
      this.setState({
        dragOver: true
      })
    })

    // todo This doesn't work but we need it to, dragleave seemsto constnantly fire
    window.addEventListener('dragexit', () => {
      this.setState({
        dragOver: false
      })
    })
  }
  onDrop(files) {
    this.setState({
        dragOver: false
      })
    const file = files[0]
    this.props.dispatch(addImage(file))
  }
  render() {
    const style = {
      display: this.state.dragOver ? 'inherit' : 'none'
    }

    return (
      <div style={style} className="file-drop-container">
        <FileDrop onDrop={this.onDrop.bind(this)}>Upload an image</FileDrop>
      </div>
    )
  }
}

export default connect()(Dropper)