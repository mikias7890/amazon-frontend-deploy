import React, { useEffect, useState } from "react";
import classes from "./productdetails.module.css";
import Layout from "../../Component/Layout/Layout";
import { useParams } from "react-router-dom";
import { producturl } from "../../Api/APi";
import axios from "axios";
import Products2 from "../../Component/Products2/Products2";
import Loader from "../../Component/LOad/Loader";

function Productdetails() {
  const { products2Id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (products2Id) {
      axios
        .get(`${producturl}/products/${products2Id}`)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [products2Id]);

  if (!product) {
    return (
      <Layout>
        <div>
          <Loader />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Pass flex and renderDesc as props */}
      <Products2
        product={product}
        renderAdd={true}
        flex={true}
        renderDesc={true}
      />

      {/*  render the description here or Products2 */}
      {/* <p className={classes.product__description} style={{ maxWidth: "500px" }}>
        {product.description}
      </p> */}
    </Layout>
  );
}

export default Productdetails;
