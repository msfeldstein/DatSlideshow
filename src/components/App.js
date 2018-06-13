import React, { Component } from 'react'
import Dropper from './Dropper'
import Header from './Header'
// import Timeline from './Timeline'
import { colors } from 'style-constants'
class App extends Component {
  render() {
    const style = {
      width: "100%",
      height: "100%",
      backgroundColor: colors.BLACK
    }
    return (<div style={style}>
      <Header />

      <Dropper />
    </div>)
  }
}

export default App