import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Swal from 'sweetalert2';

function TopHeader(props) {
    const handleLogout = () => {
        Swal.fire({
            title: 'Xác nhận đăng xuất',
            text: 'Bạn có chắc chắn muốn đăng xuất?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đăng xuất',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('user');
                window.location.href = '/';
            }
        });
    };
    const data = localStorage.getItem("user");
    const defaultAvatar = "https://firebasestorage.googleapis.com/v0/b/react-demo-d28f4.appspot.com/o/logo%2Favatar-13.jpg?alt=media&token=bfda6ea1-cd69-4680-92e5-9e4dcb720159";

    let [avatar, setAvatar] = useState("");

    let user = null;
    if (data != null) {
        user = JSON.parse(localStorage.getItem("user"))
    } else {
        user = null;
    }

    useEffect(() => {
        if (user !=null){
            if (user.avatar != null) {
                setAvatar(user.avatar);
            } else {
                setAvatar(defaultAvatar);
            }
        }
    });

    return (
        <div>
            <header className="top-header th-bg" id="top-header-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-7 col-sm-7">
                            <div className="list-inline">
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-5 col-sm-5">
                            {user ? (
                                <>
                                    <ul className="top-social-media pull-right">
                                        <Link to={"/user"}>
                                            <img className="avatar-custom"
                                                 src={avatar}
                                                 alt="avatar">

                                            </img></Link>
                                        <li>
                                            <a onClick={handleLogout} className="sign-in"><i
                                                className="fa fa-sign-in"> </i> Đăng xuất</a>
                                        </li>
                                    </ul>
                                </>
                            ) : (
                                <>
                                    <ul className="top-social-media pull-right">
                                        <li><a href="#" className="google"><i className="fa fa-google-plus"></i></a>
                                        </li>
                                        <li>
                                            <Link to={"/login"} className="sign-in"><i
                                                className="fa fa-sign-in"></i> Đăng nhập</Link>
                                        </li>
                                    </ul>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default TopHeader;