export default class PlaybackManager {
  constructor() {
    this.items = []
    this.time = 0
    this.listeners = []
    this._frame = this._frame.bind(this)
    this.state = {
      time: 0,
      duration: 0
    }
  }
  setItems(items) {
    this.items = items
  }

  duration() {
    return this.items.length * 2000
  }

  currentTime() {
    return this.time
  }

  play() {
    this.playing = true
    this.lastFrameTime = Date.now()
    this._frame()
  }

  playPause() {
    if (!this.playing) {
      this.play()
    } else {
      this.playing = false
    }
  }

  _frame(dt) {
    const now = Date.now()
    if (this.playing) {
      this.time += now - this.lastFrameTime  
    }
    
    this.lastFrameTime = now
    if (this.time > this.duration()) {
      this.time = 0
      this.playing = false
    } else {
      requestAnimationFrame(this._frame)  
    }
    this.state.time = this.time
    this.state.duration = this.duration()
    this.listeners.forEach(cb => cb(this.state))
  }

  // Listeners are callbacks accepting an object with time and duration
  addFrameListener(cb) {
    this.listeners.push(cb)
  }

  removeFrameListener(cb) {
    this.listeners = this.listeners.filter(o => o != cb)
  }
}