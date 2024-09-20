import React from "react";
import classes from "./product.module.css";

function Product({ id, title, image }) {
  return (
    <div className={classes.product}>
      <div className={classes.product_info}>
        <p>{title}</p>

        <div className={classes.product_rating}>
          <p></p>
        </div>
      </div>
      <img src={image} alt="" />
      <button>Shop now</button>
    </div>
  );
}

export default Product;
