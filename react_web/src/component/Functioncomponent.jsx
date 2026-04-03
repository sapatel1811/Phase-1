
/*
import React from 'react'

function Functioncomponent() {
  return (
    <div>
        {
            <p>this is function component .....</p>
        }
        </div>
  )
}

export default Functioncomponent  
*/

// Note = component means part of ui
//      => page means : fullscreen like complete ui screen 

// rcc 

import React, { Component } from 'react'

export default class Functioncomponent extends Component {
  render() {
    return (
      <div>
        <h2>This is rcc function component .....</h2>
      </div>
    )
  }
}
