

import React, { useEffect, useState } from "react";


function ReactList() {

  //const fruits = ["Apple", "Banana", "Mango" , "grapes","oraange","kiwi","watermelon"];
// =======================================================================
  
  // const users = [
  //   {
  //     id: 1,
  //     name: "sapna patel",
  //     email: "sapatel1811@gmail.com",
  //     age: 22,
  //   },
  //   {
  //     id: 2,
  //     name: "sp",
  //     email: "sp200218@gmail.com",
  //     age: 21,
  //   },
  //   {
  //     id: 3,
  //     name: "lishori",
  //     email: "kishori1811@gmail.com",
  //     age: 19,
  //   },
  // ];

// ==================================================================================

  const [userrs, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

// ==================================================================================
const numbers = [1, 2, 3, 4, 5, 6];

// =====================================================================

  return (
    <div>

      {/* Fruit List */}

      {/* <h2>Fruits </h2>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul> */}

{/* ============================================================================ */}
      {/*  Object User List */}

      {/* <h2>Users </h2>
      <div>
        {users.map((user) => (
          <p key={user.id}>
            {user.name } - {user.email} - {user.age}
          </p>
        ))}
      </div> */}
{/* ================================================================================== */}
   {/* api data list  */}
    <div>
      <h2>User List</h2>

      {userrs.map((user) => (
        <p key={user.id}>{user.name} </p>
      ))}
    </div>
{/* ============================================================================ */}
{/* Filter list condition  */}
    <div>
      {numbers
        .filter((num) => num % 2 === 0)
        .map((num) => (
          <p key={num}>{num}</p>
        ))}
    </div>
{/* ========================================================================== */}



    </div>
  );
}

export default ReactList;