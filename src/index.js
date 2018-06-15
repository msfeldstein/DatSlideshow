import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import images, { initialize } from './modules/images'
import { load } from 'dat-api'
import PlaybackManager from 'PlaybackManager'
import playbackManager, { setPlaybackManager, setPlaylist } from 'modules/playback'

const store = createStore(combineReducers({
  images,
  playbackManager
}), applyMiddleware(thunk))

const manager = new PlaybackManager()
store.dispatch(setPlaybackManager(manager))

load().then(data => {
  console.log(data, 'data')
  store.dispatch(initialize(data))
  store.dispatch(setPlaylist(data))
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#container')
) 