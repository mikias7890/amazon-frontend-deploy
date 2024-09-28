import React, { useContext, useState } from "react";
import classes from "./payment.module.css";
import Layout from "../../Component/Layout/Layout";
import { Datacontent } from "../../Component/Dataprovider/Dataprovider";
import Product2 from "../../Component/Products2/Products2";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Currencyformat from "../../Component/Currencyformat/Currencyformat";
import { axiosinstance } from "../../Api/axios";
import { BounceLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [processing, setProcessing] = useState(false);
  const [carderror, setCarderror] = useState(null);
  const [{ user, Basket }] = useContext(Datacontent);
  const total = Basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );
  const totalItem = Basket.reduce((amount, item) => item.amount + amount, 0);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handlechange = (e) => {
    setCarderror(e?.error?.message || "");
  };

  const handlepayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);

      const response = await axiosinstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`, // total in smallest currency unit
      });

      const clientSecret = response.data?.clientsecret;
      if (!clientSecret) {
        throw new Error("Client secret not found");
      }

      const confirmation = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.name || "Customer Name",
          },
        },
      });

      if (confirmation.error) {
        console.error("Payment confirmation error:", confirmation.error);
        setCarderror(confirmation.error.message);
      } else {
        const paymentIntent = confirmation.paymentIntent;

        await db
          .collection("users")
          .doc(user.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: Basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        console.log("Payment successful:", paymentIntent);
        navigate("/Order", { state: { message: "You have a new order!" } });
      }
    } catch (error) {
      console.error("Payment error:", error);
      setCarderror("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Layout>
      <div className={classes.payment}>Check out ({totalItem}) items</div>
      <section className={classes.payment__two}>
        <div className={classes.payment__three}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>333 rue de platin</div>
            <div>Luxembourg</div>
          </div>
        </div>
        <hr />
        <div className={classes.payment__three}>
          <h3>Review items and delivery</h3>
          <div>
            {Basket?.map((item) => (
              <Product2 key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        <div className={classes.payment__three}>
          <h3>Payment Methods</h3>
          <div className={classes.payment__card}>
            <form onSubmit={handlepayment}>
              {carderror && <small style={{ color: "red" }}>{carderror}</small>}
              <CardElement onChange={handlechange} />
              <div className={classes.payment__price}>
                <div>
                  <span style={{ display: "flex", gap: "10px" }}>
                    Total Order | <Currencyformat amount={total} />
                  </span>
                </div>
                <button type="submit" disabled={processing}>
                  {processing ? (
                    <div>
                      <BounceLoader size={15} color="white" />
                      <p>Processing, please wait...</p>
                    </div>
                  ) : (
                    "Pay Now"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
