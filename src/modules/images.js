import path from 'path'

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

const INITIALIZE = 'images/INITIALIZE'
const ADD_IMAGE = 'images/ADD_IMAGE'

export function initialize(data) {
  return {
    type: INITIALIZE,
    data: data
  }
}

export function addImage(buffer) {
  return async function(dispatch) {
    const filename = uuidv4() + ".jpg"
    let archive = new DatArchive(window.location.origin)
    let fullPath = path.join('data', filename)
    await archive.writeFile(fullPath, buffer)

    console.log("YES")
    dispatch({
      type: ADD_IMAGE,
      image: {
        path: fullPath
      }
    })
  }
  
}

export default function reducer(state = {
  entries: []
}, action = {}) {
  switch (action.type) {
    case INITIALIZE:
      return {
        ...state,
        entries: action.data
      }
    case ADD_IMAGE:
      const newstate = {
        ...state,
        entries: [action.image].concat(state.entries)
      }
      console.log(newstate)
      return newstate
    default: return state
  }
}