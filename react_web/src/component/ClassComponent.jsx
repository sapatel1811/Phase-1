/*
Class Component
A class component must include the extends React.Component statement. 
This statement creates an inheritance to React.Component, and gives your component access 
to React.Component's functions.

The component also requires a render() method, this method returns HTML.

class Car extends React.Component {
  render() {
    return <h2>Hi, I am a Car!</h2>;
  }
}

*/


//rce : ye export deflut hota hy like : if aap ghr bana rhe ho + samne gate be lag gya ho 
// => isme phle import hota hy fir export hota hy 

import React, { Component } from 'react'

export class Classcomponent extends Component {
  render() {
    return (
      <div>
        <p>Helo RCE(react class export component )</p>
        </div>
    )
  }
}
export default Classcomponent




//rcc : isme import and export dono sath me hota hy like: aap ghr ka strutre bna rhe ho


/* import React, { Component } from 'react'

export default class Classcomponent extends Component {
  render() {
    return (
      <div>
        <h1>Helo Rcc(react class component ) </h1>
      </div>
    )
  }
}
  */

