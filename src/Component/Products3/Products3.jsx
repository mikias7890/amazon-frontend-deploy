import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./products3.module.css";

function Products3() {
  const [first, setFirst] = useState([]);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        //   console.log(res);
        setFirst(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
  }, []);
  return (
    <section className={classes.first__container}>
      {first.map((singlefirst) => {
        return <ProductCard product={singlefirst} key={singlefirst.id} />;
      })}
    </section>
  );
}

export default Products3;
