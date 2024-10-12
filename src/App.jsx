import { useContext, useEffect, useState } from "react";

import "./App.css";
import Routing from "./Pages/Router";
import { Datacontent } from "./Component/Dataprovider/Dataprovider";
import { Type } from "./Utility/Action.type";
import { auth } from "./Utility/firebase";

function App() {
  const [{ user }, dispatch] = useContext(Datacontent);
  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        // console.log(authuser);
        dispatch({
          type: Type.SET_USER,
          user: authuser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
