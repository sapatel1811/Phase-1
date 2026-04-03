


/*
* Useeffcet hook : ye ek rect hook hy jo side effect handle karne ke liye use hota hy 
=> side effect : ye ek aisa effect hota hy jo ki componenent ke render hone ke 
baad hota hy ,
*  jaise ki data fetch karna ,
*  dom manipulation karna ,
*  event listener add karna , 
* time set karna etc .

=> SYNTEX : useEffect(() =>{
    //side effect code..... 
    return() => {
        //cleanup code.....
        };
},[dependency arry ]);

=> dependency array : ye ek array hota hy jo ki use effect ke 
ander hota hy , (ye batata hy ki kab useefect array chalana hy)
=> empty array : [] : only one time
=> value array : [count] :when value is changed 
=> no array : all render par show hoga 

*/




import React, { useState, useEffect } from "react";

function UseEffect() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect run hua because count change hua");
  }, [count]);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increase(+1)
      </button>
    </div>
  );
}
export default UseEffect;