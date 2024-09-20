import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Datacontent } from "../../Dataprovider/Dataprovider";
import Currencyformat from "../Currencyformat/Currencyformat";
import { Type } from "../../Utility/Action.type";
import classes from "./Products2.module.css";

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

  // Function to render star rating
  const renderStars = (rate) => {
    const fullStars = Math.floor(rate); // Full stars (★)
    const halfStar = rate % 1 >= 0.5; // Half star (⯨)
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Empty stars (☆)

    return (
      <>
        {Array(fullStars)
          .fill(null)
          .map((_, index) => (
            <span key={`full-${index}`} className={classes.star}>
              ★
            </span>
          ))}{" "}
        {/* Full stars */}
        {halfStar && <span className={classes.star}>⯨</span>} {/* Half star */}
        {Array(emptyStars)
          .fill(null)
          .map((_, index) => (
            <span key={`empty-${index}`} className={classes.star}>
              ☆
            </span>
          ))}{" "}
        {/* Empty stars */}
      </>
    );
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
            <span>{renderStars(rating.rate)}</span> {/* Display stars */}
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
