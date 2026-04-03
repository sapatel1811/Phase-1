

/*
ArrayMap () : ye ek function component hy jo ki array ke ander map method ka use karta hy
=> map method : ye ek tool hy jo ki array ke ander use hota hy , 
=> ye array ke all item ko tranform karta hy or new arry banata hy , 
bina orignal array ko change kiye.
=> react me map ke ander key prop important hy ,
 key prop :  se react ko pata chalta hy ki konsa item change hua hy , 
 konsa item add hua hy , konsa item delete hua hy , 
 isse react ko help milti hy ki wo efficient way me re-render kar ske .

* syntex : 
array.map((item,index) =>{})

* why use map method : 
=> jsx element list render karne ke liye  
=> data transformation : string number ke liye  
=> filter , map ,reduce chinngig ke liye 

* advantages : 
=> code clean hota hy 
=> easy to use 
=> array ke item ko easly transform kar skate hy 

* disadvantages :
=> if return value miss : undefinded error 

* map & for each diffrence :
=> map array new array return karta hy ,
jabki for each kuch return nahi karta 

* js array & react array me diffrence : 
=> js array me ham map method ke ander html return kar sakte hy ,
jabki react array me ham map method ke ander jsx element return kar sakte hy 
=> react array me map ke ander key prop dena importent hy 
jabki js me asa koi rule nahi hy 


*/