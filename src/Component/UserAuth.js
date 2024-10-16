import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const UserAuth = () => {
    return JSON.parse(localStorage.getItem("authUserToken")) ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    );
};

export default UserAuth;
