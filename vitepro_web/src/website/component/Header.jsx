
  import React from 'react'
  import { NavLink } from "react-router-dom";
  function Header() {
  return (
  <>
    {/* ***** Header Area Start ***** */}
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              {/* ***** Logo Start ***** */}
              <a href="index.html" className="logo">
                <h1>Villa</h1>
              </a>
              {/* ***** Logo End ***** */}
              {/* ***** Menu Start ***** */}
              
                <ul className="nav">
                    <li><NavLink to="/" >Home</NavLink></li>
                    <li><NavLink to="/properties">Properties</NavLink></li>
                    <li><NavLink to="/propertyDetails">properties Details</NavLink></li>
                    <li><NavLink to="/contact">Contact Us</NavLink></li>
                    <li><a href="#"><i className="fa fa-calendar" /> Schedule a visit</a></li>
                </ul>
          
               
        
               
              <a className="menu-trigger">
                <span>Menu</span>
              </a>
              {/* ***** Menu End ***** */}
            </nav>
          </div>
        </div>
      </div>
    </header>
    {/* ***** Header Area End ***** */}
    </>

  )
  }
  export default Header

