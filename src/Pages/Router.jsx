import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./LOG/Signup";
import Landing from "./Landing/Landing";
import Payment from "./Payment/Payment";
import Order from "./Order/Order";
import Cart from "./Cart/Cart";
import Results from "./Results/Results";
import ProtectedRoute from "../Component/ProtectedRoute";

import Productdetails from "./Productdetails/Productdetails";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51Q2rzYCWWDNiSACt117ANClc8DfgkZ0s2HwXV64iuNX9bAIAeaaxf6RtnAqPD3PDEz0Hqh3uIV20cEVIwjBOxmMv00mZdY9apw"
);
function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/LOG" element={<Signup />} />
        <Route
          path="/Payment"
          element={
            <ProtectedRoute msg={"you must login to pay"} redirect={"/Payment"}>
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Order"
          element={
            <ProtectedRoute
              msg={"you must login to see the orders"}
              redirect={"/Payment"}
            >
              <Order />
            </ProtectedRoute>
          }
        />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/Products2/:products2Id" element={<Productdetails />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
