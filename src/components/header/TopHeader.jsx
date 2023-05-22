import React from 'react';
import {Link} from "react-router-dom";

function TopHeader(props) {
    const data=localStorage.getItem("user");
    let user=null;
    if (data!=null){
        user=JSON.parse(localStorage.getItem("user"))
    }else {
        user=null;
    }

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
                            {user?(
                                <>
                                    <ul className="top-social-media pull-right">
                                        <li><a href="#" className="google"><i className="fa fa-google-plus"></i></a></li>
                                        <li>
                                            <Link to={"/logout"} className="sign-in"><i className="fa fa-sign-in"></i> Logout</Link>
                                        </li>
                                        <li>
                                            <p style={{color: "red"}} className="fa ">Xin Chào <span>{user.name}</span></p>
                                        </li>
                                    </ul>
                                </>
                            ):(
                                <>
                                    <ul className="top-social-media pull-right">
                                        <li><a href="#" className="google"><i className="fa fa-google-plus"></i></a></li>
                                        <li>
                                            <Link to={"/login"} className="sign-in"><i className="fa fa-sign-in"></i> Login or Register</Link>
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