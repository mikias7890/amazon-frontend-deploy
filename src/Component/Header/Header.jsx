import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { TiShoppingCart } from "react-icons/ti";
import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { Datacontent } from "../../Dataprovider/Dataprovider";
function Header() {
  const [{ Basket }, dispatch] = useContext(Datacontent);
  const totalItem = Basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  console.log(Basket.length);
  return (
    <section className={classes.fixed}>
      <div className={classes.header__container}>
        <div className={classes.logo__container}>
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="amazon logo"
            />
          </Link>
          <span>
            <CiLocationOn />
          </span>
          <div className={classes.delivery}>
            <p>Delivered to</p>
            <span>Luxembourg</span>
          </div>
        </div>
        <div className={classes.search}>
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" name="" id="" placeholder="Search product" />
          <FaSearch size={25} />
        </div>
        <div className={classes.order__container}>
          <a href="" className={classes.language}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Flag_of_Luxembourg.svg/1024px-Flag_of_Luxembourg.svg.png"
              alt=""
            />
            <section name="" id="">
              <option value="">LU</option>
            </section>
          </a>
          <Link to="/LOG">
            <div>
              <p>Sign In</p>
              <span>Account & lists</span>
            </div>
          </Link>
          <Link to="/Order">
            <p>return</p>
            <span>&orders</span>
          </Link>
          <Link to="/Cart" className={classes.cart}>
            <TiShoppingCart size={35} />
            <span>{totalItem}</span>
          </Link>
        </div>
      </div>
      <LowerHeader />
    </section>
  );
}

export default Header;
