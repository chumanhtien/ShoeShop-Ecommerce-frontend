import React, { Fragment, useEffect } from "react";
// import { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import {listProducts} from '../../Redux/Actions/ProductActions';
import {useDispatch, useSelector} from "react-redux";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
// import axios from "axios"

const ShopSection = (props) => {
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const {data} = await axios.get("/api/products");
  //     setProducts(data);
  //   };
  //   fetchProducts();
  // }, []);

  const {keyword, pageNumber} = props
  //redux
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const {loading, error, products, pages, page} = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <Fragment>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {
                  loading ? (
                    <div className="mb-3">
                      <Loading/>
                    </div>
                  ) : error ? (
                  <Message variant={"alert-danger"}>{error}</Message>
                  ) : (
                    <>
                        {products.map((product) => (
                        <div
                            className="shop col-lg-4 col-md-6 col-sm-6"
                            key={product._id}
                          >
                          <div className="border-product">
                            <Link to={`/products/${product._id}`}>
                              <div className="shopBack">
                                <img src={product.image} alt={product.name} />
                              </div>
                            </Link>

                            <div className="shoptext">
                              <p>
                                <Link to={`/products/${product._id}`}>
                                  {product.name}
                                </Link>
                              </p>

                              <Rating
                                value={product.rating}
                                text={`${product.numReviews} reviews`}
                                />
                              <h3>${product.price}</h3>
                            </div>
                          </div>
                      </div>
                    ))}
                  </>
                  )
                }
                {/* {products.map((product) => (
                  <div
                    className="shop col-lg-4 col-md-6 col-sm-6"
                    key={product._id}
                  >
                    <div className="border-product">
                      <Link to={`/products/${product._id}`}>
                        <div className="shopBack">
                          <img src={product.image} alt={product.name} />
                        </div>
                      </Link>

                      <div className="shoptext">
                        <p>
                          <Link to={`/products/${product._id}`}>
                            {product.name}
                          </Link>
                        </p>

                        <Rating
                          value={product.rating}
                          text={`${product.numReviews} reviews`}
                        />
                        <h3>${product.price}</h3>
                      </div>
                    </div>
                  </div>
                ))} */}
                {/* Pagination */}
                <Pagination pages={pages} page={page} keyword={keyword ? keyword: ""}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ShopSection;
