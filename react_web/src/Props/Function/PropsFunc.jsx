/*
Props are arguments passed into React components.

Props are passed to components via HTML attributes.
props stands for properties.


*/

import React from 'react'

function PropsFunc({img,title,desc}) {
    return (
        <div className='col-md-3'>
            <div className="card" style={{ width: '100%' }}>
                <img className="card-img-top" src={"https://www.teriin.org/sites/default/files/2020-10/common-tiger-og.jpg"} alt="Cart " />
                <div className="card-body">
                    <h4 className="card-title">{title}</h4>
                    <p className="card-text">{desc}</p>
                    <a href="/" className="btn btn-primary">shop</a>
                </div>
            </div>
        </div>
    )
}

export default PropsFunc