import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBell,
    faClock,
    faEnvelope,
    faTimes
} from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';

const MainHeader = (props) => {
    const [categoryHome, setCategoryHome] = useState([]);
    const data = localStorage.getItem('user');
    const [room, setRoom] = useState('1');
    const [notifications, setNotifications] = useState([
        {
        }
    ]);
    const [count, setCount] = useState(0);
    const socket = io.connect('http://localhost:3001');

    useEffect(() => {

        socket.emit('join_room', room);

        socket.on('receive_message', (res) => {
            const data = {
                text:res.message.text,
                uId: res.message.uId,
                name: res.message.name,
                avatar: res.message.avatar,
                timeN: res.message.time
            };

            setNotifications((prevNotifications) => {
                const isDuplicate = prevNotifications.some(
                    (notification) => notification. timeN=== data.timeN
                );

                if (isDuplicate || !data) { // Thêm điều kiện kiểm tra data có giá trị trống hay không
                    return prevNotifications;
                } else {
                    return [data, ...prevNotifications];
                }
            });

            setCount((prevCount) => prevCount + 1);
        });

        // Clean up the socket connection
        return () => {
            socket.disconnect();
        };

    }, [socket]);

    console.log('res.message', notifications);

    const removeNotification = (index1) => {
        const updatedNotifications = [...notifications];
        updatedNotifications.splice(index1, 1);
        setNotifications(updatedNotifications);
        setCount((prevCount) => prevCount - 1);
    };

    let roles = null;
    if (data != null) {
        roles = JSON.parse(localStorage.getItem('user')).roles[0].authority;
    } else {
        roles = null;
    }
    useEffect(() => {
        axios.get('http://localhost:8080/user/hometypes/').then((res) => {
            setCategoryHome(res.data);
            console.log('categoryHome', categoryHome);
        });
    }, []);
    return (
        <div>
            <header className="main-header sticky-header" id="main-header-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="navbar navbar-expand-lg navbar-light rounded">
                                <a className="navbar-brand logo2" href="/">
                                    <img
                                        src={"/img/logos/logo.png"}
                                        height={'55px'} alt="logo"/>
                                </a>
                                <button className="navbar-toggler" type="button" id="drawer">
                                    <span className="fa fa-bars"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbar">

                                    <ul className="navbar-nav  justify-content-center">
                                        <li className="nav-item dropdown active">
                                            <Link className="nav-link dropdown-toggle" to={"/"}
                                                  id="change-font-size" data-toggle="dropdown"
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
                                                                  id="change-font-size" data-toggle="dropdown"
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
                                                                    <Link to={"/user"}
                                                                          className="nav-link dropdown-toggle" href="#"
                                                                          id="change-font-size"
                                                                          data-toggle="dropdown" aria-haspopup="true"
                                                                          aria-expanded="false">
                                                                        Tài khoản
                                                                    </Link>
                                                                </li>
                                                                <li className="nav-item dropdown">
                                                                    <Link to={"/"} className="nav-link dropdown-toggle"
                                                                          href="#"
                                                                          id="change-font-size" role="button"
                                                                          data-toggle="dropdown"
                                                                          aria-haspopup="true" aria-expanded="false">
                                                                        Danh Mục
                                                                    </Link>
                                                                    <ul className="dropdown-menu"
                                                                        aria-labelledby="navbarDropdownMenuLink">
                                                                        {categoryHome.map((category,index)=>(
                                                                            <li key={index}><a  className="dropdown-item" href={`/category/${category.id}`}>{category.name}</a></li>
                                                                        ))}

                                                                    </ul>
                                                                </li>
                                                                <nav className="navbar ">
                                                                    <div className="dropdown nav-button notifications-button hidden-sm-down">
                                                                        <a className="btn btn-secondary dropdown-toggle" href="#" id="notifications-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                            <FontAwesomeIcon icon={faBell} />
                                                                            {count > 0 && <span className="badge badge-danger">{count}</span>}
                                                                        </a>

                                                                        <div className="dropdown-menu notification-dropdown-menu" aria-labelledby="notifications-dropdown">
                                                                            <h6 className="dropdown-header">Thông Báo</h6>

                                                                            {count === 0 ? (
                                                                                <a className="dropdown-item dropdown-notification" href="#">
                                                                                    <p className="notification-solo text-center"> Không có thông báo</p>
                                                                                </a>
                                                                            ) : (
                                                                                <>
                                                                                    {notifications.map((notification, index) => (
                                                                                        <a className="dropdown-item dropdown-notification" href={notification.name} key={index}>
                                                                                            <div className="notification-read" onClick={() => removeNotification(index)}>
                                                                                                <FontAwesomeIcon icon={faTimes} />
                                                                                            </div>
                                                                                            <img className="notification-img" src={notification.avatar} alt="Icone Notification" />
                                                                                            <div className="notifications-body">
                                                                                                <p className="notification-texte">{notification.name}: đã {notification.text} nhà của bạn</p>
                                                                                                <p className="notification-date text-muted">
                                                                                                    <FontAwesomeIcon icon={faClock} /> {notification.timeN}
                                                                                                </p>
                                                                                            </div>
                                                                                        </a>
                                                                                    ))}
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </nav>

                                                            </ul>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ul className="navbar-nav  justify-content-center">
                                                                <li className="nav-item dropdown">
                                                                    <Link to={"/"} className="nav-link dropdown-toggle"
                                                                          href="#"
                                                                          id="change-font-size" role="button"
                                                                          data-toggle="dropdown"
                                                                          aria-haspopup="true" aria-expanded="false">
                                                                        Danh Mục
                                                                    </Link>
                                                                    <ul className="dropdown-menu"
                                                                        aria-labelledby="navbarDropdownMenuLink">
                                                                        {categoryHome.map((category,index)=>(
                                                                            <li key={index}><a className="dropdown-item" href={`/category/${category.id}`}>{category.name}</a></li>
                                                                        ))}

                                                                    </ul>
                                                                </li>
                                                                {/* cho dang sua*/}
                                                                <li className="nav-item dropdown">
                                                                    <Link to={"/user"}
                                                                          className="nav-link dropdown-toggle" href="#"
                                                                          id="change-font-size"
                                                                          data-toggle="dropdown" aria-haspopup="true"
                                                                          aria-expanded="false">
                                                                        Tài khoản
                                                                    </Link>
                                                                </li>
                                                                {/* ket thu sua*/}
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