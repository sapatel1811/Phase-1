import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import swal from 'sweetalert'; 

function AddProperties() {

    const [categories, setCategories] = useState([]);

    const [formdata, setFormdata] = useState({
        id: "",
        cate_id: "",
        prop_name: "",
        bedroom: "",
        bathroom: "",
        floor: "",
        prop_area: "",
        price: "",
        prop_image: ""
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get("http://localhost:3000/categories");
                setCategories(res.data);
            } catch (error) {
                console.log(error);
                toast.error("Failed to load categories");
            }
        }
        getData();
    }, []);

    const changeHandel = (e) => {
        setFormdata({
            ...formdata,
            id: new Date().getTime().toString(),
            [e.target.name]: e.target.value
        });
    }

    function validation() {
        if (formdata.cate_id === "") return toast.error('Category required'), false;
        if (formdata.prop_name === "") return toast.error('Name required'), false;
        if (formdata.bedroom === "") return toast.error('Bedroom required'), false;
        if (formdata.bathroom === "") return toast.error('Bathroom required'), false;
        if (formdata.floor === "") return toast.error('Floor required'), false;
        if (formdata.prop_area === "") return toast.error('Area required'), false;
        if (formdata.price === "") return toast.error('Price required'), false;
        if (formdata.prop_image === "") return toast.error('Image required'), false;

        return true;
    }

    const submitHandel = async (e) => {
        e.preventDefault();

        if (validation()) {
            try {
                await axios.post("http://localhost:3000/properties", formdata);
                swal("Good job!", "Property added Successfully!", "success");

                setFormdata({
                    id: "",
                    cate_id: "",
                    prop_name: "",
                    bedroom: "",
                    bathroom: "",
                    floor: "",
                    prop_area: "",
                    price: "",
                    prop_image: ""
                });

            } catch (error) {
                console.log(error);
                toast.error("API Error!");
            }
        }
    }

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Add Property </h2>

                <form onSubmit={submitHandel}>

                    {/* Category */}
                    <div className="mb-3">
                        <label className="form-label">Category</label>
<select className="form-select" name="cate_id" value={formdata.cate_id}
onChange={changeHandel}>
<option value="">Select Category</option>
                            {categories.map((value) => (
                                <option key={value.id} value={value.id}>
                                    {value.cate_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Property Name */}
                    <div className="mb-3">
                        <label className="form-label">Property Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="prop_name"
                            value={formdata.prop_name}
                            onChange={changeHandel}
                        />
                    </div>

                    {/* Bedroom & Bathroom */}
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Bedroom</label>
                            <input type="number" className="form-control" name="bedroom" value={formdata.bedroom} onChange={changeHandel} />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Bathroom</label>
                            <input type="number" className="form-control" name="bathroom" value={formdata.bathroom} onChange={changeHandel} />
                        </div>
                    </div>

                    {/* Floor & Area */}
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Floor</label>
                            <input type="number" className="form-control" name="floor" value={formdata.floor} onChange={changeHandel} />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Area</label>
                            <input type="text" className="form-control" name="prop_area" value={formdata.prop_area} onChange={changeHandel} />
                        </div>
                    </div>

                    {/* Price */}
                    <div className="mb-3">
                        <label className="form-label">Price</label>
                        <input type="number" className="form-control" name="price" value={formdata.price} onChange={changeHandel} />
                    </div>

                    {/* Image */}
                    <div className="mb-3">
                        <label className="form-label">Image URL</label>
                        <input type="url" className="form-control" name="prop_image" value={formdata.prop_image} onChange={changeHandel} />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Submit
                    </button>

                </form>
            </div>
        </div>
    )
}

export default AddProperties;