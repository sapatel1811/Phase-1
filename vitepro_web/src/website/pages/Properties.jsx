import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Properties() {

  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {

    const getCate = async () => {
      try {
        const res = await axios.get("http://localhost:3000/categories");
        setCategories(res.data);
      } catch (error) {
        console.log("Category Error:", error);
      }
    };

    const getProp = async () => {
      try {
        const res = await axios.get("http://localhost:3000/properties");
        setProperties(res.data);
      } catch (error) {
        console.log("Property Error:", error);
      }
    };

    getCate();
    getProp();

  }, []);

  return (
    <div>

      {/* Header */}
      <div className="page-heading header-text">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <span className="breadcrumb">
                <a href="#">Home</a> / Properties
              </span>
              <h3>Properties</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div className="section properties">
        <div className="container">

          {/* Categories Filter */}
          <ul className="properties-filter">
            <li>
              <a className="is_active" href="#!" data-filter="*">
                Show All
              </a>
            </li>

            {categories.map((value) => (
              <li key={value.id}>
                <a href="#!" data-filter={"." + value.cate_name}>
                  {value.cate_name}
                </a>
              </li>
            ))}
          </ul>

          {/* Properties List */}
          <div className="row properties-box">

            {properties.length > 0 ? (
              properties.map((value) => (
                <div
                  key={value.id}
                  className="col-lg-4 col-md-6 align-self-center mb-30 properties-items"
                >
                  <div className="item">

                    <Link to={`/property-details/${value.id}`}>
                      <img
                        src={value.prop_image}
                        height="150px"
                        alt={value.prop_name}   // ✅ FIXED
                      />
                    </Link>

                    <span className="category">{value.prop_name}</span>
                    <h6>{value.price}</h6>

                    <h4>
                      <Link to={`/property-details/${value.id}`}>
                        {value.prop_name}
                      </Link>
                    </h4>

                    <ul>
                      <li>Bedrooms: <span>{value.bedroom}</span></li>
                      <li>Bathrooms: <span>{value.bathroom}</span></li>
                      <li>Area: <span>{value.prop_area} m²</span></li>
                      <li>Floor: <span>{value.floor}</span></li>
                      <li>Parking: <span>6 spots</span></li>
                    </ul>

                    <div className="main-button">
                      <Link to={`/property-details/${value.id}`}>
                        Schedule a visit
                      </Link>
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <h3>No Properties Found</h3>
            )}

          </div>

        </div>
      </div>

    </div>
  );
}

export default Properties;