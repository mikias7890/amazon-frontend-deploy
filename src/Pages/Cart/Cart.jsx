import React, { useContext } from "react";
import Layout from "../../Component/Layout/Layout";
import { Datacontent } from "../../Component/Dataprovider/Dataprovider";
import Product2 from "../../Component/Products2/Products2";
import { Link } from "react-router-dom";
import classes from "./cart.module.css";
import Currencyformat from "../../Component/Currencyformat/Currencyformat";
import { Type } from "../../Utility/Action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
function Cart() {
  const [{ Basket, user }, dispatch] = useContext(Datacontent);
  // The Cart component is utilizing React's useContext hook to access the Datacontent context. From the context, it destructures Basket and user, and also gets the dispatch function, which is typically used to update the global state.
  const total = Basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  //   The reduce function is used to compute the total price of items in the Basket. It iterates over each item in the Basket, multiplying the item's price by its quantity (item.amount), and accumulates the sum.
  // amount is initialized to 0.
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
  //   increment: This function adds an item to the basket (or increases the quantity). It uses dispatch to send an action of type ADD_TO_BASKET, passing the item as payload.
  // decrement: This function decreases the quantity of the item or removes it from the basket by dispatching an action of type REMOVE_FROM_BASKET, with the item id as payload.
  return (
    <Layout>
      <section className={classes.container2}>
        <div className={classes.cart__conatiner}>
          <h2>Hello</h2>
          <h3>You are shopping</h3>
          <hr />
          {/* The Cart component renders inside a Layout wrapper. It uses CSS
          classes (e.g., classes.container2 and classes.cart__container) for
          styling. A greeting message is displayed with a heading "You are
          shopping" followed by a horizontal rule (<hr />
          ). */}
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
        {/* This conditional rendering block checks if the Basket is empty. If it
        is, it shows the message "No items." If there are items in the Basket,
        it maps over each item to render: A Product2 component that displays the
        product details. Two buttons (IoIosArrowUp and IoIosArrowDown) to
        increment or decrement the quantity, using the increment and decrement
        functions respectively. A span element that displays the current
        quantity (item.amount). */}
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
// If the Basket is not empty, the subtotal section is rendered.
// It shows the number of items in the basket and the total amount (formatted using the Currencyformat component).
// A checkbox allows the user to mark the order as containing a gift.
// A link directs the user to the payment page to continue the checkout process
export default Cart;
