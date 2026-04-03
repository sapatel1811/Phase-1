import React from 'react'

function Syntex() {

     const handleClick = () => {
    alert("Button Clicked");
  };

  return (
    <div>

    {/* Note : react me event handle ka matlb hy :
    => uer ko action (onClick , input , hover , submite ) ko handle karna 
    using function jsx.
  => in a simple line : user action => function call => ui update 

  => key diffrence in js and react :
   * js : 
   1) naming : lowercase (onclick,onchange)
   2) passing function : function / string likh skate ho 
   3) event binding : menual addeventlisner use / inline 


   * react event handler : 
  1) namming : camelcase (onClick , onChange)
  Note : react me ham jsx syntex use karte hy isliye camelcase me likhte hy . 
  2) passing function : always function refrence pass karte hy 
  3) event binding : inline / arrow function use kate hy   
     */}

    <button onClick={handleClick}> Click Me </button>

    </div>
  )
}

export default Syntex