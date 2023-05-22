import React from 'react';
import HomePage from "../HomePage";

const Logout = () => {
    localStorage.removeItem('user');
    return <HomePage />
};

export default Logout;