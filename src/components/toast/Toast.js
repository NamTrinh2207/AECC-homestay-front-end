import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Toast.css';

const Toast = ({ onClick, name }) => {

    return (
        <div>
            <button
                className="btn btn-blue text-center"
                type="submit"
                onClick={onClick}
            >
                {name}
            </button>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                className="toast-container"
                toastClassName="toast"
            />
        </div>
    );
};

export default Toast;
