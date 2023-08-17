import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PublicRoute({ children }) {
  const { user } = useContext(AuthContext);
  const loadedComponent = user ? <Navigate to="/" /> : children;
  return <>{loadedComponent}</>;
}
