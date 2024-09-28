import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Datacontent } from "../Dataprovider/Dataprovider";
import Currencyformat from "../Currencyformat/Currencyformat";
import { Type } from "../../Utility/Action.type";
import classes from "./Products2.module.css";
import Rating from "@mui/material/Rating";
function Product({ product, flex, renderDesc, renderAdd }) {
  const { image, id, title, rating, price, description } = product;
  const [state, dispatch] = useContext(Datacontent);

  // Function to add the product to the cart
  const addTocart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        id,
        title,
        rating,
        price,
      },
    });
  };

  return (
    <div
      id={`product-${id}`}
      className={`${classes.product} ${flex ? classes.flexLayout : ""}`}
    >
      <Link to={`/Products2/${id}`}>
        <img src={image} alt={title} className={classes.product__image} />
      </Link>

      <div className={classes.product__details}>
        <h2 className={classes.product__title}>{title}</h2>
        <Currencyformat amount={price} /> {/* Fixed 'price' to 'amount' */}
        {rating && (
          <div className={classes.product__rating}>
            <span>
              <Rating value={5} precision={0.1} />
            </span>{" "}
            {/* Display stars */}
            <span>({rating.count} reviews)</span>
          </div>
        )}
        {renderDesc && (
          <p className={classes.product__description}>{description}</p>
        )}
        {renderAdd && (
          <div className={classes.button}>
            <button className={classes.button} onClick={addTocart}>
              Add to cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
