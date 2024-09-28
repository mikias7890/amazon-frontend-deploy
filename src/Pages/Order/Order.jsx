import React, { useContext, useEffect, useState } from "react";
import Layout from "../../Component/Layout/Layout";
import classes from "./order.module.css";
import { db } from "../../Utility/firebase";
import { Datacontent } from "../../Component/Dataprovider/Dataprovider";
import Products2 from "../../Component/Products2/Products2"; // Ensure to import Products2

function Order() {
  const [{ user }] = useContext(Datacontent); // Destructure correctly
  const [order, setOrder] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          console.log(snapshot);

          setOrder(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrder([]); // Reset orders if no user is logged in
    }
  }, [user]);

  return (
    <Layout>
      <section className={classes.orders__one}>
        <div className={classes.orders__two}>
          <h2>Your Orders</h2>
          {order?.length == 0 && (
            <div style={{ padding: "10px" }}>NO orders selected</div>
          )}
          <div className={classes.orders__three}>
            {order?.map((eachOrders, i) => {
              return (
                <div>
                  <hr />
                  <p>order ID:{eachOrders?.id}</p>
                  {eachOrders?.data?.basket?.map((order) => {
                    return (
                      <Products2 flex={true} product={order} key={order.id} />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Order;
