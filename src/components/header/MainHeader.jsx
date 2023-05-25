import React from 'react';
import {Link} from "react-router-dom";

function MainHeader(props) {
    const data = localStorage.getItem("user");
    let roles = null;
    if (data != null) {
        roles = JSON.parse(localStorage.getItem("user")).roles[0].authority
        console.log(roles)
    } else {
        roles = null;
    }
    return (
        <div>
            <header className="main-header sticky-header" id="main-header-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="navbar navbar-expand-lg navbar-light rounded">
                                <a className="navbar-brand" href="/">
                                    <img src={"https://firebasestorage.googleapis.com/v0/b/react-demo-d28f4.appspot.com/o/logo%2Fblack-logo.png?alt=media&token=c06f18ab-93d2-4f70-9173-6579873830ed"} height={'55px'} alt="logo"/>
                                </a>
                                <button className="navbar-toggler" type="button" id="drawer">
                                    <span className="fa fa-bars"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbar">

                                    <ul className="navbar-nav  justify-content-center">
                                        <li className="nav-item dropdown active">
                                            <Link className="nav-link dropdown-toggle" to={"/"}
                                                  id="navbarDropdownMenuLink" data-toggle="dropdown"
                                                  aria-haspopup="true" aria-expanded="false">
                                                Trang chủ
                                            </Link>
                                        </li>
                                    </ul>
                                    {roles ? (
                                        <>
                                            {roles === "ROLE_ADMIN" ? (
                                                <>
                                                    <ul className="navbar-nav  justify-content-center">
                                                        <li className="nav-item dropdown">
                                                            <Link to={""} className="nav-link dropdown-toggle" href="#"
                                                                  id="navbarDropdownMenuLink2" data-toggle="dropdown"
                                                                  aria-haspopup="true" aria-expanded="false">
                                                                Danh sách tài khoản
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </>
                                            ) : (
                                                <>
                                                    {roles === "ROLE_USER" ? (
                                                        <>
                                                            <ul className="navbar-nav  justify-content-center">
                                                                <li className="nav-item dropdown">
                                                                    <Link to={"/user"} className="nav-link dropdown-toggle" href="#"
                                                                       id="navbarDropdownMenuLink2"
                                                                       data-toggle="dropdown" aria-haspopup="true"
                                                                       aria-expanded="false">
                                                                        Tài khoản
                                                                    </Link>
                                                                </li>
                                                                <li className="nav-item dropdown">
                                                                    <Link to={""} className="nav-link dropdown-toggle" href="#"
                                                                          id="navbarDropdownMenuLink7"
                                                                          data-toggle="dropdown" aria-haspopup="true"
                                                                          aria-expanded="false">
                                                                        Danh sách homestay
                                                                    </Link>
                                                                </li>

                                                            </ul>
                                                            <ul className="nav navbar-nav ml-auto  justify-content-end">
                                                                <li className="nav-item">
                                                                    <a href="/create" className="submit-btn">
                                                                        Đăng tin
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ul className="navbar-nav  justify-content-center">
                                                                <li className="nav-item dropdown">
                                                                    <Link to={""} className="nav-link dropdown-toggle" href="#"
                                                                          id="navbarDropdown3" role="button" data-toggle="dropdown"
                                                                          aria-haspopup="true" aria-expanded="false">
                                                                        Cửa hàng
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </>
                                                    )}

                                                </>
                                            )}

                                        </>
                                    ) : (
                                        <>

                                        </>
                                    )}

                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default MainHeader;