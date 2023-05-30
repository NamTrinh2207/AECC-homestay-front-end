import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './Toast.css';

const Toast = ({ onClick, name }) => {
    return (
        <div>
            <button
                className="btn btn-4"
                type="submit"
                onClick={onClick}
            >
                {name}
            </button>
        </div>
    );
};

export default Toast;
