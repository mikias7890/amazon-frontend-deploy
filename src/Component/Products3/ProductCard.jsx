import React, { useContext } from "react";
import { Rating } from "@mui/material";
import Currencyformat from "../Currencyformat/Currencyformat";
import classes from "./products3.module.css";
import { Link } from "react-router-dom";
import { Datacontent } from "../Dataprovider/Dataprovider";
import { Type } from "../../Utility/Action.type";

function ProductCard({ product }) {
  const { image, title, id, rating, price } = product;
  const [state, dispatch] = useContext(Datacontent);
  console.log(state);
  const addtocart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price },
    });
  };
  return (
    <div className={classes.card__container}>
      <Link to={`/Products2/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        <div className={classes.rating}>
          <Rating value={rating.rate} precision={0.1} />
          <small>{rating.count}</small>
        </div>
        <div>
          <Currencyformat amount={price} />
        </div>
        <button className={classes.button} onClick={addtocart}>
          add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
