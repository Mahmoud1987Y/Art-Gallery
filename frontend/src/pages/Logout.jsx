import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    navigate("/");
  }, []);
  return <></>;
};

export default Logout;
