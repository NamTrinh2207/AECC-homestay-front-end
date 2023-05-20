import React from 'react';
import Home from "../homePage/Home";

const Logout = () => {
    localStorage.removeItem('user');
    return <Home/>
};

export default Logout;