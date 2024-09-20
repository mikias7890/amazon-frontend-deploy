import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { img } from "./img/data";
import classes from "./Carosel.module.css";

function carouseleffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageLink) => {
          return <img src={imageLink} />;
        })}
      </Carousel>
      <div className={classes.shade__img}></div>
    </div>
  );
}

export default carouseleffect;
