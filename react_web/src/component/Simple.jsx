


// component => ye react ka reusable ui part hota hy like pice of block code hota hy 
// jo input leta hy or jsx return karta hy.
// => component ko 2 pats me devide kiya gya hy :
//  1)class component (old) 2) function component (new)

 /* 
 1) class component : 
  => old style  hy , isme jada code hota hy , this ka use , class throught call hota hy 
  => state and lifecycle use karta hy , code jayada likhna padta hy 
  => lifecycle method : componentdidmount ,componetdidupdate , componet willmount 
 * construter : ye special method hota hy , ye tab chlta hy jab component create hota hy 
 * super(props) : perent class ko props me bhejta hy  
 * render () : ye method return kart a hy jsx ko 
 => ye method jaruri hota hy class component me , bina render method ke class component nahi 
   work karega 
*/


/* 2) function component : 
=> new style hy , isme less code hota hy , this ka use nahi hota hy , function ke through call hota hy 
=> state and life cycle use nahi karta only use : react hook 
=> render method ki jarurt nahi hoti , function ke ander direct return ho jata hy 
*/


/* extra note : componet and page me diffrence 
=> component : ye react ka reusable ui part hota hy 
=> page : ye complete ui screen hota hy , jisme multipal component use hota hy 
*/