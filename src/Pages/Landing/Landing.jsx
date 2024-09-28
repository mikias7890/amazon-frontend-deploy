import React from "react";
import Layout from "../../Component/Layout/Layout";
import Carousel from "../../Component/Carousel/Carousel";
import Category from "../../Component/Category/Category";
// import Productdata from "../../Component/Products/Productdata";

function Landing() {
  return (
    <Layout>
      <Carousel />
      <Category />
      {/* <Productdata /> */}
    </Layout>
  );
}

export default Landing;
