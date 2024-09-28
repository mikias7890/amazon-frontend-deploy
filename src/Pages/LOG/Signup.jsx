import React, { useState, useContext } from "react";
import classes from "./signup.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import { DotLoader } from "react-spinners";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Datacontent } from "../../Component/Dataprovider/Dataprovider"; // Use Datacontent, not Dataprovider
import { CgLaptop } from "react-icons/cg";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  // Access user and dispatch from the correct context object
  const [{ user }, dispatch] = useContext(Datacontent);
  // console.log(user);
  const navigate = useNavigate();
  const navdata = useLocation();
  console.log(navdata);

  const handler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);

    if (e.target.name === "SignIn") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: "SET_USER", // Use the correct action type
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(navdata?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: fasle });
          console.log(err);
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: "SET_USER", // Use the correct action type
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate("/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: fasle });
          console.log(err);
        });
    }
  };

  return (
    <section className={classes.Signup}>
      <Link to="/">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf6rTHYkrDdgrpM8txBs_eHEXRmO8oUU30DQ&s"
          alt="Amazon Logo"
        />
      </Link>
      <div className={classes.Login}>
        <h1>Sign In</h1>
        {navdata?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navdata?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
            />
          </div>
          <button
            type="submit"
            onClick={handler}
            className={classes.signin_button}
            name="SignIn"
          >
            {loading.signIn ? <DotLoader color="#000" size={15} /> : " Sign In"}
          </button>
        </form>
        {error && <p className={classes.error}>{error}</p>}
        <p>
          By signing in you agree to the AMAZON FAKE TERMS AND CONDITIONS of use
          & sale. Please see our privacy notice, our cookies notice, and our
          interest-based ads notice.
        </p>
        <button
          type="submit"
          onClick={handler}
          className={classes.signin_button2}
          name="SignUp"
        >
          {loading.signUp ? (
            <DotLoader color="#000" size={15} />
          ) : (
            "  Create Your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Signup;
