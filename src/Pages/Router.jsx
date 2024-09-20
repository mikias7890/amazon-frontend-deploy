import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./LOG/Signup";
import Landing from "./Landing/Landing";
import Payment from "./Payment/Payment";
import Order from "./Order/Order";
import Cart from "./Cart/Cart";
import Results from "./Results/Results";

import Productdetails from "./Productdetails/Productdetails";

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/LOG" element={<Signup />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/Products2/:products2Id" element={<Productdetails />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
