import React, { useContext } from "react";
import Layout from "../../Component/Layout/Layout";
import { Datacontent } from "../../Dataprovider/Dataprovider";
import Product2 from "../../Component/Products2/Products2";
import { Link } from "react-router-dom";
import classes from "./cart.module.css";
import Currencyformat from "../../Component/Currencyformat/Currencyformat";
import { Type } from "../../Utility/Action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
function Cart() {
  const [{ Basket, user }, dispatch] = useContext(Datacontent);
  const total = Basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  console.log(Basket);
  const increment = (item) => {
    dispatch({ type: Type.ADD_TO_BASKET, item });
  };
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };
  return (
    <Layout>
      <section className={classes.container2}>
        <div className={classes.cart__conatiner}>
          <h2>Hello</h2>
          <h3>You are shopping</h3>
          <hr />
          {Basket?.length === 0 ? (
            <p>No items</p>
          ) : (
            Basket?.map((item, index) => (
              <section className={classes.cart_product}>
                <Product2
                  key={index}
                  product={item}
                  renderDesc={true}
                  flex={true}
                  renderAdd={false}
                />
                <div className={classes.button2}>
                  <button
                    className={classes.but}
                    onClick={() => increment(item)}
                  >
                    <IoIosArrowUp size={30} />
                  </button>
                  <span>{item.amount}</span>
                  <button
                    className={classes.but}
                    onClick={() => decrement(item.id)}
                  >
                    <IoIosArrowDown size={30} />
                  </button>
                </div>
              </section>
            ))
          )}
        </div>
        {Basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>subtotal({Basket?.length} items)</p>
              <Currencyformat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/Payment">Continue to checkout</Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;
