



/* useState : ye react ka ek hook hy , jo ki functional componenet me state manage karne ke 
liye use hota hy ,
=>  ye ek function hota hy ko ki react ke ander use hota hy , 
=> usestate ke ander ham ek inital value pass karte hy , 
=> aur ye hame ek array return karta hy 
=> jisse ham 2 variable me store karte hy , 1st variable me ham state value store karete hy ,
2nd variable me ham ek functon store karte hy , 
=> jisse ham state value ko update karte hy 

* syntex : const[state,setstate] = useState(initialization value);
=> state : current value store
=> setsate : value update karne ka function
=> initialization : starting value 
*/

import React, { useState } from "react";

function UseState() {
  const [count, setCount] = useState(0);

  return (
    <div><br /> 
      <h2>Count: {count}</h2>

      <button onClick={() => setCount(count + 1)}>
        Increment (+1)
      </button>

      <button onClick={() => setCount(count - 1)}>
       Decrement (-1)
      </button>
    </div>
  );
}

export default UseState;