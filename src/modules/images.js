import path from 'path'
import ImageTools from 'ImageTools'
import FileToBuffer from 'FileToBuffer'

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

export function addImage(file) {
  function genURL() {
    const filename = uuidv4() + ".jpg"
    let fullPath = path.join('/data', filename)
    return fullPath
  }
  return async function(dispatch) {
    const meta = {}
    let archive = new DatArchive(window.location.origin)
    
    let thumb = await ImageTools.resizeAsync(file, {width: 256, height: 256 })
    thumb = await FileToBuffer(thumb)
    meta.thumb = genURL()
    archive.writeFile(meta.thumb, thumb)

    let scaled = await ImageTools.resizeAsync(file, {width: 1024, height: 1024})
    scaled = await FileToBuffer(scaled)
    meta.scaled = genURL()
    await archive.writeFile(meta.scaled, scaled)

    let originalBuffer = await FileToBuffer(file)
    meta.original = genURL()
    await archive.writeFile(meta.original, originalBuffer)
    dispatch({
      type: ADD_IMAGE,
      image: meta
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
      return newstate
    default: return state
  }
}