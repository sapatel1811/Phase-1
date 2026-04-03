


import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

function AHeader() {

    const redirect = useNavigate();
    const adminlogout = () => {
        localStorage.removeItem('a_id');
        localStorage.removeItem('a_name');
        localStorage.removeItem('a_email');
        swal("Good job!", "Admin Logout Success!", "success");
        redirect('/admin-login');
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
                                    if (localStorage.getItem('a_name')) {
                                        return (
                                            <li><i className="fa fa-user" />
                                                Welcome : {localStorage.getItem('a_name')}
                                            </li>
                                        )
                                    }
                                })()}

                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <ul className="social-links">
                                <li><a href="#"><i className="fab fa-facebook" /></a></li>
                                <li><a href="https://x.com/minthu" target="_blank"><i className="fab fa-twitter" /></a></li>
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
                                    <li><NavLink to="/dashboard" >Dashboard</NavLink></li>
                                    <li class="dropdown">
                                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">Categories</a>
                                        <div className="dropdown-menu">
                                            <Link className="dropdown-item" to="/addcategories">Add Categories</Link>
                                            <Link className="dropdown-item" to="/managecategories">Manage Categories</Link>
                                        </div>
                                    </li>
                                    <li class="dropdown">
                                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">Properties</a>
                                        <div class="dropdown-menu">
                                            <Link class="dropdown-item" to="/addproperties">Add Properties</Link>
                                            <Link class="dropdown-item" to="/manageproperties">Manage Properties</Link>
                                        </div>
                                    </li>   
                                    <li><NavLink to="/M anageCustomer">Customer</NavLink></li>
                                    <li class="dropdown">
                                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">Booking Work</a>
                                        <div class="dropdown-menu">
                                            <Link class="dropdown-item" to="/managebooking">Booking Reoprt</Link>
                                            <Link class="dropdown-item" to="/managefeedback">Feedback</Link>
                                        </div>
                                    </li>
                                     <li><a href={void(0)} onClick={adminlogout} className="w-100 h-50 p-1"> Logout</a></li>    
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

export default AHeader