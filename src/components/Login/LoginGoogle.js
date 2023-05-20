import React, {useEffect, useState} from 'react';
import {GoogleLogin} from 'react-google-login';
import {gapi} from 'gapi-script';
import {useNavigate} from "react-router-dom";

function LoginGoogle() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const clientId = '720778169507-9egirs366glr5nourtc5ue4lri6dplq1.apps.googleusercontent.com';

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: '',
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const onSuccess = (res) => {
        setUser(res.profileObj);
        localStorage.setItem('user', JSON.stringify(res.profileObj));
        alert("Đăng nhập thành công")
        navigate("/")
    };

    const onFailure = (err) => {
        console.log('failed', err);
    };

    return (
        <div>
            <div>
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            </div>
        </div>
    );
}

export default LoginGoogle;
