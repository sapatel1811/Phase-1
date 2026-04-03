


import React from 'react'

function Prac() {

const task = [
        { id: 1, name: "Task 1", status: "Completed" },
        { id: 2, name: "Task 2", status: "In Progress" },
        { id: 3, name: "Task 3", status: "Not Started" },
    ];

const products =[
    {id:1 , name: "laptop",price:50000},
    {id:2 , name:"mobile",price:20000},
    {id:3 , name:"tablet",price:30000},
]

const  user ={
    id:1,
    name:"sapna patel",
    email:"sapatel1811@gmail.com",
    age:22,

    

}


    return (

        <div>
            <h2>Task List</h2>
            <ul>
                {task.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.status}
                    </li>
                ))}
            </ul>
{/* ============================================================= */}
     <h2>Product list </h2>
     <ul>
        {products.map((item) => (
            <li key = {item.id}>
                {item.name} -{item.price}
            </li>
        ))}
     </ul>
{/* ================================================================== */}
     <h2>user data</h2>
        <p>
            {user.name }<br/> 
            {user.email}<br/> 
            {user.age}
        </p>

        </div>

    );  
}

export default Prac