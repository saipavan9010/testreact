import React,{ Component } from "react";
export const Header= function () {
    // return authorization header with jwt token
    const headertoken = localStorage.getItem("token");
    
    if (headertoken) {
        return { headers:{'Authorization': `Bearer ${headertoken}`} };
    } else {
        return {};
    }
}