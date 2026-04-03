import React,{useState} from 'react'

function MiniPro() {
  

// State
  const [text, setText] = useState("Hello");
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);

  // Events
  const handleAlert = () => {
    alert("Hello React ");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form Submitted: " + name);
  };

  const greet = (user) => {
    alert("Hello " + user);
  };

  return (
   
    <div style={{ padding: "20px" }}>
      <h1>React Event handle </h1>

      {/* 1. Alert Button */}
      <button onClick={handleAlert}>Click Me</button>
      <hr />

{/* ====================================================================================== */}

      {/* 2. Change Text */}
      <h2>{text}</h2>
      <button onClick={() => setText("Welcome Sapna")}>
        Change Text
      </button>
      <hr />

{/* ================================================================================== */}

      {/* 3. Input Handling */}
      <input
        type="text"
        placeholder="Enter name"
        onChange={(e) => setName(e.target.value)}
      />
      <h3>{name}</h3>
      <hr />

{/* ================================================================================== */}

      {/* 4 & 5. Counter */}
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <hr />

{/* =========================================================================== */}

      {/* 6. Form */}
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit Form</button>
      </form>
      <hr />

{/* ============================================================================== */}

      {/* 7. Hover */}
      <h2 onMouseOver={() => console.log("Hovered!")}>
        Hover over me
      </h2>
      <hr />

{/* =================================================================================== */}

      {/* 8. Pass Argument */}
      <button onClick={() => greet("Sapna")}>
        Greet Me
      </button>
      <hr />

{/* =================================================================================== */}

      {/* 9. Toggle */}
      <button onClick={() => setShow(!show)}>
        Toggle Text
      </button>
      {show && <h2>This is toggle text</h2>}
      <hr />

{/* ================================================================================= */}

      {/* 10. Multiple Events */}
      <button
        onClick={() => alert("Clicked")}
        onMouseOver={() => console.log("Hover event")}>
        Multi Event Button
      </button>
    </div>

  );
  }

export default MiniPro