import React, { useState, useEffect } from "react";
import Layout from "../../Component/Layout/Layout";
import classes from "./results.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { producturl } from "../../Api/APi";
import Products2 from "../../Component/Products2/Products2";
import Loader from "../../Component/LOad/Loader";

function Results() {
  const { categoryName } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get(`${producturl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => console.log(err));
  }, [categoryName]);
  if (!results) {
    return (
      <Layout>
        <div>
          <Loader />
        </div>
      </Layout>
    );
  }
  return (
    <>
      <Layout>
        <section>
          <h1 style={{ padding: "30px" }}>Results</h1>
          <p style={{ padding: "30px" }}>Category: {categoryName}</p>
          <hr />
          <div className={classes.product__container}>
            {results.map((product) => (
              <Products2 key={product.id} product={product} renderAdd={true} />
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}

export default Results;
