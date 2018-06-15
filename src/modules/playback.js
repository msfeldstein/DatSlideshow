const SET_MANAGER = 'playback/SET_MANAGER'

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

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case SET_MANAGER:
      return {
        ...state,
        manager: action.manager
      }
    default: return state
  }
}