import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams,useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import swal from 'sweetalert'; 
function EditProfile() {

    const redirect = useNavigate();
    const [formdata, setFormdata] = useState({
        id: "",
        name: "",
        email: "",
        mobile: "",
    })

    const {id}=useParams();

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`http://localhost:5173/user/${id}`);
            setFormdata(res.data)
        }
        getData();
    }, [id]);


    const changeHandel = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
        console.log(formdata);
    }

    function validation(){
        let ans=true;
        if(formdata.name=="")
        {
            toast.error('Name Field is required');
            ans=false;
        }
        if(formdata.email=="")
        {
            toast.error('Email Field is required');
            ans=false;
        }
        if(formdata.mobile=="")
        {
            toast.error('Mobile Field is required');
            ans=false;              
        }
        return ans;
    }

    const submitHandel = async (e) => {
        e.preventDefault();
        if(validation())
        {
            const res = await axios.patch(`http://localhost:5173/user/${id}`, formdata);
            console.log(res);
            swal("Good job!", "Update Success!", "success");
            redirect('/user_profile');
        }
    }


    return (
        <div>
            <div className="page-heading header-text">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <span className="breadcrumb"><a href="#">Home</a> /Edit Profile</span>
                            <h3>Edit Profile</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contact section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 offset-lg-4">
                            <div className="section-heading text-center">
                                <h6>| Edit Profile</h6>
                               
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
                                            <label htmlFor="name">Full Name</label>
                                            <input type="name" onChange={changeHandel} value={formdata.name} name="name" id="name" placeholder="Your Name..."  />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <label htmlFor="email">Email Address</label>
                                            <input type="text" onChange={changeHandel} value={formdata.email} name="email" id="email" pattern="[^ @]*@[^ @]*" placeholder="Your E-mail..." />
                                        </fieldset>
                                    </div>
                                  
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <label htmlFor="subject">Mobile</label>
                                            <input type="number" onChange={changeHandel} value={formdata.mobile} name="mobile" id="mobile" placeholder="Mobile..." />
                                        </fieldset>
                                    </div>

                                    <div className="col-lg-12">
                                        <fieldset>
                                            <button type="submit" id="form-submit" className="orange-button">Save</button>
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

export default EditProfile