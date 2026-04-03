import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function ManageProperties() {

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        try {
            const res = await axios.get("http://localhost:3000/properties");
            setProperties(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch data");
        }
    }

    useEffect(() => {
        (async () => {
            await getData();
        })();
    }, []);

    const deleteData = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/properties/${id}`);
            toast.success('Deleted Successfully');
            getData();
        } catch (error) {
            console.log(error);
            toast.error("Delete Failed");
        }
    }

    return (
        <div className="container mt-5">

            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Manage Properties </h2>

                {loading ? (
                    <h5 className="text-center">Loading...</h5>
                ) : properties.length === 0 ? (
                    <h5 className="text-center text-danger">No Data Found</h5>
                ) : (

                    <div className="table-responsive">
                        <table className="table table-bordered table-hover text-center align-middle">

                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Category</th>
                                    <th>Name</th>
                                    <th>Bed</th>
                                    <th>Bath</th>
                                    <th>Floor</th>
                                    <th>Area</th>
                                    <th>Price</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {properties.map((value) => (
                                    <tr key={value.id}>
                                        <td>{value.id}</td>
                                        <td>{value.cate_id}</td>
                                        <td>{value.prop_name}</td>
                                        <td>{value.bedroom}</td>
                                        <td>{value.bathroom}</td>
                                        <td>{value.floor}</td>
                                        <td>{value.prop_area}</td>
                                        <td>₹ {value.price}</td>

                                        <td>
                                            <img
                                                src={value.prop_image}
                                                alt="property"
                                                className="img-thumbnail"
                                                style={{ width: "80px", height: "60px", objectFit: "cover" }}
                                                onError={(e) => e.target.src = "https://via.placeholder.com/80"}
                                            />
                                        </td>

                                        <td>
                                            <button
                                                onClick={() => deleteData(value.id)}
                                                className="btn btn-danger btn-sm me-2"  >
                                                Delete
                                            </button>

                                            <button className="btn btn-primary btn-sm">
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                )}
            </div>

        </div>
    )
}

export default ManageProperties;