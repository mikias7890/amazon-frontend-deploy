import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Datacontent } from "./Dataprovider/Dataprovider";

const ProtectedRoute = ({ children, msg, redirect }) => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useContext(Datacontent);
  useEffect(() => {
    if (!user) {
      navigate("/LOG", { state: { msg, redirect } });
    }
  }, [user]);
  return children;
};

export default ProtectedRoute;
