const SET_MANAGER = 'playback/SET_MANAGER'
const TOGGLE_PLAY_PAUSE = 'playback/TOGGLE_PLAY_PAUSE'
const SET_ITEMS = 'playback/SET_ITEMS'
/*
Items are {
  path: url to image
  duration: milliseconds, defaults to 2000 if not exists
}
*/
export function setPlaybackManager(manager) {
  return {
    type: SET_MANAGER,
    manager: manager
  }
}

export function togglePlayPause() {
  return {
    type: TOGGLE_PLAY_PAUSE
  }
}

export default function reducer(state = {
  playing: false,
  manager: null
}, action = {}) {
  switch (action.type) {
    case SET_MANAGER:
      return {
        ...state,
        manager: action.manager
      }
    case TOGGLE_PLAY_PAUSE:
      state.manager.playPause()
      return {
        ...state,
        playing: state.manager.playing
      }
    default: return state
  }
}