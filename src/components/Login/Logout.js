import React from 'react';
import HomePage from "../HomePage";
import Swal from 'sweetalert2';

const Logout = () => {

    localStorage.removeItem('user');
    return <HomePage />
};

export default Logout;