// src/components/ProtectedRoute.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import { fetchUserProfile } from "../features/authSlice";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, token } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (token && !isAuthenticated && !loading) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated, loading, token]);
  console.log(
    "isAuthenticated, loading, token ",
    isAuthenticated,
    loading,
    token
  );
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Triangle
          visible
          height="200"
          width="200"
          color="#703BF7"
          ariaLabel="loading-indicator"
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
