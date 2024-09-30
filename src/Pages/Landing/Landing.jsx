import React from "react";
import Layout from "../../Component/Layout/Layout";
import Carousel from "../../Component/Carousel/Carousel";
import Category from "../../Component/Category/Category";
import Products3 from "../../Component/Products3/Products3";
// import Productdata from "../../Component/Products/Productdata";

function Landing() {
  return (
    <Layout>
      <Carousel />
      <Category />
      {/* <Productdata /> */}
      <Products3 />
    </Layout>
  );
}

export default Landing;
