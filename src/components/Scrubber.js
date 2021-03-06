import React from 'react'
import FileDrop from 'react-file-drop'
import { connect } from 'react-redux'
import { togglePlayPause } from 'modules/playback'

class Scrubber extends React.Component {
  constructor(props) {
    super(props)
    this.onFrame = this.onFrame.bind(this)
    this.sliderRef = React.createRef()
  }

  componentDidMount() {
    this.updatePlaybackManager(this.props, {})
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
  onFrame(playState) {
    const percent = playState.time / playState.duration
    this.sliderRef.current.style.left = `${percent * 100}%`
  }

  playPause() {
    this.props.togglePlayPause()
  }
  
  render() {
    let durationSeconds = this.props.entries.length * 2
    const durationMinutes = Math.floor(durationSeconds / 60)
    durationSeconds = durationSeconds - durationMinutes * 60
    if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`
    const playState = this.props.playbackManager.playing ? 'Playing' : 'Paused'
    return (
      <div className="Scrubber">
        <div 
          onClick={this.playPause.bind(this)}
          className={`Scrubber-PlayPause ${playState}`}></div>
        <div className="Scrubber-SliderTrack">
          <div ref={this.sliderRef} className="Scrubber-Slider"></div>
        </div>
        <div className="Scrubber-Time">0:00 / {durationMinutes}:{durationSeconds}</div>
      </div>
    )
  }
}

export default connect(state => {
  return {
    entries: state.images.entries || [],
    playbackManager: state.playbackManager.manager,
    playing: state.playbackManager && state.playbackManager.playing
  }
}, dispatch => {
  return {
    togglePlayPause: _ => dispatch(togglePlayPause())  
  }
})(Scrubber)