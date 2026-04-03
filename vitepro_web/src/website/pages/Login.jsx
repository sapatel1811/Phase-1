import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import swal from 'sweetalert';




function Login() {


    const redirect = useNavigate();

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
            const res = await axios.get(`http://localhost:5173/user?email=${formdata.email}`);
            if (res.data.length > 0) {
                if (formdata.password == res.data[0].password) {
                    if (res.data[0].status == "Unblock") {
                        localStorage.setItem('u_id', res.data[0].id);
                        localStorage.setItem('u_name', res.data[0].name);
                        localStorage.setItem('u_email', res.data[0].email);
                        swal("Good job!", "Login Success!", "success");
                        redirect('/');
                    }
                    else {
                        swal("Error", "Blocked Account!", "error");
                        redirect('/');
                    }
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
            <div className="page-heading header-text">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <span className="breadcrumb"><a href="#">Home</a> / Login Us</span>
                            <h3>Login Us</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contact section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 offset-lg-4">
                            <div className="section-heading text-center">
                                <h6>| Login Us</h6>
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
                                            <input type="text" onChange={changeHandel} value={formdata.email} name="email" id="email" pattern="[^ @]*@[^ @]*" placeholder="Your E-mail..." required />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <label htmlFor="name">Password</label>
                                            <input type="password" onChange={changeHandel} value={formdata.password} name="password" id="name" placeholder="Your Password..." autoComplete="on" required />
                                        </fieldset>
                                    </div>

                                    <div className="col-lg-12">
                                        <fieldset>
                                            <button type="submit" id="form-submit" className="orange-button">Login</button>
                                        </fieldset>

                                    </div>
                                    <div className="col-lg-12">
                                        <Link to="/signup" className='float-end'>If you Not registered then Signup Here</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login