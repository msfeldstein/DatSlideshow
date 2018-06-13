import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import images, { initialize } from './modules/images'
import { load } from 'dat-api'

const store = createStore(combineReducers({
  images
}), applyMiddleware(thunk))

load().then(data => {
  console.log(data)
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#container')
) 