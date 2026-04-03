import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import swal from 'sweetalert'; 

function AddCategories() {

    const [formdata, setFormdata] = useState({
        id: "",
        cate_name: "",
        cate_image: ""
    });

    const changeHandel = (e) => {
        setFormdata({
            ...formdata,
            id: new Date().getTime().toString(),
            [e.target.name]: e.target.value
        });
    }

    function validation() {
        let ans = true;

        if (formdata.cate_name === "") {
            toast.error('Category Name Field is required');
            ans = false;
        }

        if (formdata.cate_image === "") {
            toast.error('Category Image URL Field is required');
            ans = false;
        }

        return ans;
    }

    const submitHandel = async (e) => {
        e.preventDefault();

        if (validation()) {
            try {
                const res = await axios.post(
                    "http://localhost:3000/categories",
                    formdata
                );

                console.log(res);

                swal("Good job!", "Category added Successfully!", "success");

                setFormdata({
                    id: "",
                    cate_name: "",
                    cate_image: ""
                });

            } catch (error) {
                console.log(error);
                toast.error("API Error!");
            }
        }
    }

    return (
<div className="container mt-5">

<h2>Add Categories</h2>
<form onSubmit={submitHandel}>
<input type="text" name="cate_name" placeholder="Enter Category Name" 
value={formdata.cate_name} onChange={changeHandel} className="form-control mb-3"/>

<input type="url" name="cate_image" placeholder="Enter Image URL"
value={formdata.cate_image} onChange={changeHandel} className="form-control mb-3" />

<button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default AddCategories;