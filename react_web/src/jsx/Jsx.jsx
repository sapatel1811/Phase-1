
/*
Jsx : javascript xml 
=> means javascript ke ander html jesa code likhna 
=> without jsx : const element = React.createElement("h1", null, "Hello Sapna");
=> with jsx : const element = <h1> hello</h1>  
=> jsx me js {} currly brekete ke ander likhte hy 

* why use jsx : 
=> js me html jesa code likhne deta hy 
=> easy to use hota hy 
=> ui banane ke liye easy hy 


*/


import React from 'react'




function Jsx() {

    var name = "sapna patel";
    const myelement = <h2>I am read JSX!</h2>;
    const myelement1 = <h2>React is {5 + 5} times better with JSX</h2>;
    const myelement2 = (
        <ul>
            <li>Apples</li>
            <li>Bananas</li>
            <li>Cherries</li>
        </ul>
    );


    const mystyle={color: 'pink', backgroundColor: 'red'}


    return (
        <div>
            
            <h1>Jsx</h1>

            <h2>{name}</h2>
            <h2>{myelement}</h2>
            <h2>{myelement1}</h2>
            {myelement2}

            <h2 style={{color: 'red', backgroundColor: 'yellow'}}>Hi i am React Inline Style</h2>

            <h2 style={mystyle}>Hello i am internal css</h2>

            <h2 className='box'>Hello i am External css</h2>
            <button class="button">Button</button>


        </div>
    )
}

export default Jsx