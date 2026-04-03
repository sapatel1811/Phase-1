

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import swal from 'sweetalert'; 

function AdminLogin() {

     const redirect=useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('a_id'))
        {
            redirect('/dashboard');
        }
    },[redirect]);

   

    const [formdata, setFormdata] = useState({
        email: "",
        password: ""
    });

    const changeHandel = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
        console.log(formdata);
    }

        function validation() {
            let ans = true;
    
            if (formdata.email == "") {
                toast.error('Email Field is required');
                ans = false;
            }
            if (formdata.password == "") {
                toast.error('Password Field is required');
                ans = false;
            }
            return ans;
        }

        const submitHandel = async (e) => {
        e.preventDefault();
        if (validation()) {
            const res = await axios.get(`http://localhost:3000/admin?email=${formdata.email}`);
            if (res.data.length > 0) {
                if (formdata.password == res.data[0].password) {

                    localStorage.setItem('a_id',res.data[0].id);
                    localStorage.setItem('a_name',res.data[0].name);
                    localStorage.setItem('a_email',res.data[0].email);
                    
                    redirect('/dashboard');    
                    swal("Good job!", "Login Success!", "success");
                }
                else {
                    swal("Error", "Wrong Password!", "error");
                }
            }
            else {
                swal("Error", "Email does not exist! ", "error");
            }
        }

    }



    return (
        <div>
            <div>
               
                {/* ***** Preloader End ***** */}
                <div className="sub-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-8">
                                <ul className="info">
                                    <li><i className="fa fa-envelope" /> info@company.com</li>
                                    <li><i className="fa fa-map" /> Sunny Isles Beach, FL 33160</li>
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

                                </nav>
                            </div>
                        </div>
                    </div>
                </header>
                {/* ***** Header Area End ***** */}


                <div className="page-heading header-text">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <span className="breadcrumb"><a href="#">Admin</a> / Login Us</span>
                                <h3>Admin Login</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 offset-lg-4">
                                <div className="section-heading text-center">
                                    <h6>Admin | Login Us</h6>
                                    <h2>Get In Touch With Our Agents</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact-content">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-8 offset-lg-2">
                                <form id="contact-form" action method="post" onSubmit={submitHandel}>
                                    <div className="row">

                                        <div className="col-lg-12">
                                            <fieldset>
                                                <label htmlFor="email">Email Address</label>
                                                <input type="text" onChange={changeHandel} name="email" id="email" pattern="[^ @]*@[^ @]*" placeholder="Your E-mail..." required />
                                            </fieldset>
                                        </div>
                                        <div className="col-lg-12">
                                            <fieldset>
                                                <label htmlFor="name">Password</label>
                                                <input type="password" onChange={changeHandel} name="password" id="name" placeholder="Your Password..." autoComplete="on" required />
                                            </fieldset>
                                        </div>

                                        <div className="col-lg-12">
                                            <fieldset>
                                                <button type="submit" id="form-submit" className="orange-button">Login</button>
                                            </fieldset>

                                        </div>
                                      
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       
    </div >
    
  )
}

export default AdminLogin