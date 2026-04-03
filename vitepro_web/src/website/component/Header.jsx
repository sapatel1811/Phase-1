import React from 'react'
import { NavLink, useNavigate,Link } from 'react-router-dom'
import swal from 'sweetalert';  

function Header() {

    const redirect=useNavigate();
    const logout=()=>{
        localStorage.removeItem('u_id');
        localStorage.removeItem('u_name');
        localStorage.removeItem('u_email');
        swal("Good job!", "Logout Success!", "success");
        redirect('/');
    }

    return (
        <div>
           
            <div className="sub-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-8">
                            <ul className="info">
                                <li><i className="fa fa-envelope" /> info@company.com</li>
                                <li><i className="fa fa-map" /> Sunny Isles Beach, FL 33160</li>

                                {(() => {
                                    if (localStorage.getItem('u_name')) {
                                        return (
                                           
                                            <li><i className="fa fa-user" />
                                                Welcome : {localStorage.getItem('u_name')}
                                            </li>
                                           
                                        )
                                    }
                                })()}


                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <ul className="social-links">
                                 {(() => {
                                    if (localStorage.getItem('u_name')) {
                                        return (
                                           
<li><Link to="/userprofile"><i className="fafa-user" /> </Link></li>
                                           
                                        )
                                    }
                                })()}
                               
                                <li><a href="#"><i className="fab fa-linkedin" /></a></li>
                                <li><a href="#"><i className="fab fa-instagram" /></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
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
                                    <li><NavLink to="/contact">Contact Us</NavLink></li>
                                    {(() => {
                                        if (localStorage.getItem('u_id')) {
                                            return (
                                                 <li><a href="" onClick={logout} className="w-100 h-50 p-1"> Logout</a></li>
                                            )
                                        }
                                        else
                                        {
                                            return(
                                                 <li><NavLink to="/login" className="w-100 h-50 p-1"> <span className='fa fa-user'></span> Login</NavLink></li>
                                            )
                                        }
                                    })()}
                                   
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
        </div>

    )
}

export default Header