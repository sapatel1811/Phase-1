import React from 'react'

function ManageFeedaback() {
    return (
        <div className="featured section">
            <div className="container">
                <div className="row">

                    <div className="col-lg-12">
                        <div className="section-heading">
                            <h6>| Feedback</h6>
                            <h2>Manage Feedback</h2>
                        </div>

                        <div className="container mt-3">

                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Firstname</th>
                                        <th>Lastname</th>
                                        <th>Email</th>
                                        <th className='text-center'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>John</td>
                                        <td>Doe</td>
                                        <td>john@example.com</td>
                                        <td className='text-center'>
                                            <button className='btn btn-danger me-1'>Delete</button>
                                            <button className='btn btn-primary me-1'>Edit</button>
                                        </td>
                                    </tr>
                                   
                                </tbody>
                            </table>

                        </div>

                    </div>

                </div>
            </div>
        </div>

    )
}

export default ManageFeedaback