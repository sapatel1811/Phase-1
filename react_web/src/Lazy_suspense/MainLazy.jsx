



/*
* Lazy lodding : means jab zarurat ho tb lod karna , ye ek design pattern hy 
=> react me lazy lodding tab use karte hy jab hamare pass koi component ya resouce hota hy 
=> react lazy + suspence : react me suspence ek component hy ko ki hamare component 
ko wrap karta hy , jab hamare componnet load ho rha hy to hmare user ko ek 
folback dikhta hy , jab hamare componnet load ho jata hy to hamare user ko hamara 
componnet dikhta hy .

Advantages of Lazy Loading
=> perfomance improe hota hy , kuki hamare aap me jada resouce nahi hota hy 
=> browser work lode kam hota hy 
=> user improve hota hy 

Disadvantages of Lazy Loading
=> small app ke liye useful nahi hota hy 
=> extra server call hota hy 
=> seo me problam hota hy 

*/


import React,{ lazy,Suspense }  from 'react'


// withaout lazy loading import
import Hello from './Hello'

// with  lazy loading import
const Morning = lazy(() => import("./Morning"));

function MainLazy() {
  return (
    <div className='container mt-5'>
        <h1>Hi i am Main Component</h1>
        <hr />
        <Hello/>
        
        <Suspense fallback={<div class="spinner-border"></div>}>
          <Morning/>
        </Suspense>
        
    </div>
  )
}

export default MainLazy