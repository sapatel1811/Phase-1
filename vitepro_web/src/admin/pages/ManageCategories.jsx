import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import swal from 'sweetalert';

function ManageCategories() {

    const [categories, setCategories] = useState([]);
    const [formdata, setFormdata] = useState({
        id: "",
        cate_name: "",
        cate_image: ""
    });

    const getData = async () => {
        const res = await axios.get(`http://localhost:3000/categories`);
        setCategories(res.data);
    }

    useEffect(() => {
        (async () => {
            await getData();
        })();
    }, []);
   
    const deleteData = async (id) => {
        await axios.delete(`http://localhost:3000/categories/${id}`);
        toast.success('Deleted Successfully');
        getData();
    }

    const editcate = async (id) => {
        const res = await axios.get(`http://localhost:3000/categories/${id}`);
        setFormdata(res.data);
    }

    const changeHandel = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    }

    const submitHandel = async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:3000/categories/${formdata.id}`, formdata);
        swal("Success!", "Updated Successfully!", "success");
        getData();
    }

    return (
        <div className="container mt-5 ms-5 me-5 mb-5">

            <h2 className="text-center mb-4">Manage Categories</h2>

            <div className="card shadow">
                <div className="card-body">

                    <table className="table table-bordered table-hover text-center align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {categories.map((value) => (
                                <tr key={value.id}>
                                    <td>{value.id}</td>
                                    <td>{value.cate_name}</td>
                                    <td>
                                        <img
                                            src={value.cate_image}
                                            alt=""
                                            className="img-thumbnail"
                                            width="80"
                                        />
                                    </td>
                                    <td>
<button className="btn btn-danger btn-sm me-3" onClick={() => deleteData(value.id)}> 
Delete </button>

<button className="btn btn-primary btn-sm me-3" onClick={() => editcate(value.id)}
data-bs-toggle="modal" data-bs-target="#myModal" > Edit </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>

            {/* Modal */}
            <div className="modal fade" id="myModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">Edit Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={submitHandel}>

                                <div className="mb-3">
                                    <label className="form-label">Category Name</label>
                                    <input
                                        type="text"
                                        name="cate_name"
                                        value={formdata.cate_name}
                                        onChange={changeHandel}
                                        className="form-control"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Image URL</label>
                                    <input
                                        type="url"
                                        name="cate_image"
                                        value={formdata.cate_image}
                                        onChange={changeHandel}
                                        className="form-control"
                                        required
                                    />
                                </div>

                                <div className="text-end">
                                    <button type="submit" className="btn btn-success">
                                        Update
                                    </button>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default ManageCategories;