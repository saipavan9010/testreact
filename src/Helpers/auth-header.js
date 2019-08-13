import React,{ Component } from "react";
export function authHeader() {
    // return authorization header with jwt token
    const headertoken = localStorage.getItem("token");
    if (headertoken) {
        return { Authorization: `Bearer ${headertoken}` };
    } else {
        return {};
    }
}