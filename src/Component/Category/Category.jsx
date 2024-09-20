import React from "react";
import { categorydata } from "./categorydata";
import Categorycard from "./Categorycard";
import classes from "./category.module.css";

function Category() {
  return (
    <div className={classes.category__container}>
      {categorydata.map((datas) => (
        <Categorycard key={datas.id} data={datas} />
      ))}
    </div>
  );
}

export default Category;
