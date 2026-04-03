


import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import swal from 'sweetalert'; 

function Contact() {

    const [formdata, setFormdata] = useState({
        id: "",
        name: "",
        email: "",
        mobile: "",
        message: ""
    })

    const changeHandel = (e) => {
        setFormdata({ ...formdata, id: new Date().getTime().toString(), [e.target.name]: e.target.value });
        console.log(formdata);
    }
    function validation() {
        let ans = true;
        if (formdata.name == "") {
            toast.error('Name Field is required');
            ans = false;
        }    
        if (formdata.email == "") {
            toast.error('Email Field is required');
            ans = false;
        }
        if (formdata.mobile == "") {
            toast.error('Mobile Field is required');
            ans = false;
        }
        if (formdata.message == "") {
            toast.error('Message Field is required');
            ans = false;
        }
        return ans;
    }
    const submitHandel = async (e) => {
        e.preventDefault();
        if (validation()) {
            const res = await axios.post(`https://sweetmart-563b7-default-rtdb.firebaseio.com/contact.json`, formdata);
            console.log(res);
            swal("Good job!", "Contact Submitted Success!", "success");
            setFormdata({ ...formdata, name: "", email: "", mobile: "", message: "" });
        }

    }

    return (
        <div>
            <div className="page-heading header-text">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <span className="breadcrumb"><a href="#">Home</a> / Contact Us</span>
                            <h3>Contact Us</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contact section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 offset-lg-4">
                            <div className="section-heading text-center">
                                <h6>| Contact Us</h6>
                                <h2>Get In Touch With Our Agents</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contact-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div id="map">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12469.776493332698!2d-80.14036379941481!3d25.907788681148624!2m3!1f357.26927939317244!2f20.870722720054623!3f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x88d9add4b4ac788f%3A0xe77469d09480fcdb!2sSunny%20Isles%20Beach!5e1!3m2!1sen!2sth!4v1642869952544!5m2!1sen!2sth" width="100%" height="500px" frameBorder={0} style={{ border: 0, borderRadius: 10, boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.15)' }} allowFullScreen />
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="item phone">
                                        <img src="assets/images/phone-icon.png" alt style={{ maxWidth: 52 }} />
                                        <h6>010-020-0340<br /><span>Phone Number</span></h6>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="item email">
                                        <img src="assets/images/email-icon.png" alt style={{ maxWidth: 52 }} />
                                        <h6>info@villa.co<br /><span>Business Email</span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <form id="contact-form" action method="post" onSubmit={submitHandel}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <label htmlFor="name">Full Name</label>
                                            <input type="name" onChange={changeHandel} value={formdata.name} name="name" id="name" placeholder="Your Name..."/>
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <label htmlFor="email">Email Address</label>
                                            <input type="email" onChange={changeHandel} value={formdata.email} name="email" id="email" pattern="[^ @]*@[^ @]*" placeholder="Your E-mail..."  />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <label htmlFor="subject">Mobile</label>
                                            <input type="number" onChange={changeHandel} value={formdata.mobile} name="mobile" id="mobile" placeholder="Mobile..."  />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <label htmlFor="message">Message</label>
                                            <textarea name="message" onChange={changeHandel} value={formdata.message} id="message" placeholder="Your Message" defaultValue={""} />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <button type="submit" id="form-submit" className="orange-button">Send Message</button>
                                        </fieldset>
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

export default Contact