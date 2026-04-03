/*

* Life cycle of useeffect : 3 phase me divide hota hy ,

=> 1) mounting : componenet create dom me insert hota hy 

 * class componenet : 
=> constructor : componenet ke create hone par call hota hy ,
isme ham state initlize karte hy , or method bind karte hy 
=> static getDerivedstatefromprops : props change hone par state update hota hy  
=> render : jsx return karta hy 
=> componenetdidmount : componenet mount hone ke bad call hota hy 
 
=> 2) updating : componenet ke state ya props chnage hone par hota hy

* class componenet :
=> shoudcomponenetupdate : deside karna hota hy ki componenet ko 
update karna hy ya nhai 
=> get snapshort befor update : update hone se pahle dom se data 
le skate hy 
=> componenetdidupdate : componenet update hone ke bad call hota hy 

=> 3) unmountig : componenet dom se remove hone par hota hy 

* class componenet : 
 => componenet will umount : componenet remove hone se pahle call hota hy 


*/



import { useState, useEffect } from "react";

function LifeCycleEffect() {
  const [count, setCount] = useState(0);

  // Mount + Update
  useEffect(() => {
    console.log("Effect runs, count:", count);

    // Cleanup
    return () => {
      console.log("Cleanup, count:", count);
    };
  }, [count]);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increase</button>
            <button onClick={() => setCount(c => c - 1)}>Decrease</button>

    </div>
  );
}
export default LifeCycleEffect;