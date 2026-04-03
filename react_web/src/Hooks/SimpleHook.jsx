

/*
Hook : 
=> hook ek function hota hy jo ki react ke ander use hota hy 
hooks ke ander state and life cycle use kar skte hy.
=> function component ko powerful banane ka tool hy hook

* why use hook :
=> phle : class componenent me state and life cycle use karte ty
=> ab: function component me state and life cycle use karne ke liye hook ka use kate hy 
=> code clean hota hy 
=> easy to use 

* some importent hooks :
1) use state : state mange karne ke liye use hota hy 
=> component ke ander data store karene ke liye hota hy 
2) use effect : life cycle handle karne ke liye use hota hy 
=> component ke ander side effect create karne ke liye 
=> [] dependency array : ye ek array hota hy jo ki use effect ke ander use hota hy
(only one time run hoga : componenet mount hone par )

=>  *** case of use effect  *** : 
a) mount : componenet ke create hone par run hoga 
b) update : componenet ke update hone par run hoga 
c) unmount : componenet ke delete hone par run hoga 

3) use context : data ko multipal componenet me share karne ke liye use hota hy 
4) use ref : dom access ya mutable value store karne ke liey (without re-rendring)
5) use reduser : complex state logic ke liye use hota hy 
6) use callback & use memo : perfomance optimization ke liye use hota hy 

* rules of hook : 
=> a) hook top leval par hi use hota hy : kuki hook ke ander condition ya loop me use 
nahi kar skate.(react ko har render me same order chiye )
=> b) hook serf react function me use karo : function component ya custom hook me use karo 
=> c) hook bolta hy 1st hook = usestate , 2nd hook = use effect , 3rd hook = use context 







*/