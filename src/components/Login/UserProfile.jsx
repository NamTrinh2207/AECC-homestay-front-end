import TopHeader from "../header/TopHeader";
import MainHeader from "../header/MainHeader";
import Footer from "../footer/Footer";
import React, {useEffect, useState} from 'react'
import axios from "axios";
import {storage} from '../../firebase';
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import {Link} from "react-router-dom";
import FormUpdateUser from "./FormUpdateUser";
import FormChangePassword from "./FormChangePassword";
import MyProperty from "../MyProperty";

function UserProfile(props) {
    const [imgUrl, setImgUrl] = useState(null);
    const [progressPercent, setProgressPercent] = useState(0);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [showUpdateUserForm, setShowUpdateUserForm] = useState(true);
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
    const [showListHomes, setShowListHomes] = useState(false);
    const [activeButton, setActiveButton] = useState('profile');

    const handUpdateUserClick = () => {
        setShowUpdateUserForm(true);
        setShowChangePasswordForm(false);
        setShowListHomes(false)
        setActiveButton('profile');
    }
    const handleChangePasswordForm = () => {
        setShowUpdateUserForm(false);
        setShowChangePasswordForm(true);
        setShowListHomes(false)
        setActiveButton('changePassword');
    }

    const handleShowListHomes = () => {
        setShowUpdateUserForm(false);
        setShowChangePasswordForm(false);
        setShowListHomes(true)
        setActiveButton('listHomes');
    }


    useEffect(() => {
        const savedProfile = localStorage.getItem('user');
        if (savedProfile) {
            setUser(JSON.parse(savedProfile));
        }

        const userId = JSON.parse(savedProfile)?.id;
        if (userId) {
            axios.get(`http://localhost:8080/${userId}`)
                .then((response) => {
                    setUser(response.data);
                    setLoading(false);
                    console.log(response.data.roles[0].name);
                })
                .catch(() => {
                    alert("Lỗi truy xuất user");
                });
        }
    }, []);

    if (loading) {
        return <div>Đang lấy thông tin...</div>
    }

    return (
        <div>

            {/*Top header start*/}
            <TopHeader/>
            {/* Top header end */}

            {/* main header start */}
            <MainHeader/>
            {/* main header end */}

            {/* Sidenav start */}
            <nav id="sidebar" className="nav-sidebar">
                {/* Close btn*/}
                <div id="dismiss">
                    <i className="fa fa-close"></i>
                </div>
                <div className="sidebar-inner">
                    <div className="sidebar-logo">
                        <img src="assets/img/logos/black-logo.png" alt="sidebarlogo"/>
                    </div>
                    <div className="sidebar-navigation">
                        <h3 className="heading">Pages</h3>
                        <ul className="menu-list">
                            <li><a href="#" className="pt0">Index <em className="fa fa-chevron-down"></em></a>
                                <ul>
                                    <li><a href="index.html">Index 1</a></li>
                                    <li><a href="index-2.html">Index 2</a></li>
                                    <li><a href="index-3.html">Index 3</a></li>
                                    <li><a href="index-4.html">Index 4</a></li>
                                    <li><a href="index-5.html">Index 5</a></li>
                                    <li><a href="index-6.html">Index 6</a></li>
                                    <li><a href="index-7.html">Index 7</a></li>
                                    <li><a href="index-8.html">Index 8</a></li>
                                    <li><a href="index-9.html">Index 9</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">Properties <em className="fa fa-chevron-down"></em></a>
                                <ul>
                                    <li>
                                        <a href="#">List Layout <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="properties-list-rightside.html">Right Sidebar</a></li>
                                            <li><a href="properties-list-leftside.html">Left Sidebar</a></li>
                                            <li><a href="properties-list-fullwidth.html">Fullwidth</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Grid Layout <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="properties-grid-rightside.html">Right Sidebar</a></li>
                                            <li><a href="properties-grid-leftside.html">Left Sidebar</a></li>
                                            <li><a href="properties-grid-fullwidth.html">Fullwidth</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Map View <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="properties-map-rightside-list.html">Map List Right Sidebar</a>
                                            </li>
                                            <li><a href="properties-map-leftside-list.html">Map List Left Sidebar</a>
                                            </li>
                                            <li><a href="properties-map-rightside-grid.html">Map Grid Right Sidebar</a>
                                            </li>
                                            <li><a href="properties-map-leftside-grid.html">Map Grid Left Sidebar</a>
                                            </li>
                                            <li><a href="properties-map-full.html">Map FullWidth</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Property Detail <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="properties-details.html">Property Detail 1</a></li>
                                            <li><a href="properties-details-2.html">Property Detail 2</a></li>
                                            <li><a href="properties-details-3.html">Property Detail 3</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" className="active">Pages <em className="fa fa-chevron-down"></em></a>
                                <ul>
                                    <li>
                                        <a href="#">My Account <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="user-profile.html">User profile</a></li>
                                            <li><a href="my-properties.html">My Properties</a></li>
                                            <li><a href="favorited-properties.html">Favorited Properties</a></li>
                                            <li><a href="submit-property.html">Submit Property</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">About <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="about.html">About Us</a></li>
                                            <li><a href="about-me.html">About Me</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Services <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="services.html">Services 1</a></li>
                                            <li><a href="services-2.html">Services 2</a></li>
                                            <li><a href="services-details.html">Services Details</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Pricing Tables <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="pricing-tables-1.html">Pricing Tables 1</a></li>
                                            <li><a href="pricing-tables-2.html">Pricing Tables 2</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Gallery <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="gallery-1.html">Gallery 1</a></li>
                                            <li><a href="gallery-2.html">Gallery 2</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Faq <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="faq-1.html">Faq 1</a></li>
                                            <li><a href="faq-2.html">Faq 2</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Typography <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="typography.html">Typography 1</a></li>
                                            <li><a href="typography-2.html">Typography 2</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">404 Error <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="pages-404.html">404 Error 1</a></li>
                                            <li><a href="pages-404-2.html">404 Error 2</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="properties-comparison.html">Properties Comparison</a></li>
                                    <li><a href="search-brand.html">Search Brand</a></li>
                                    <li><a href="elements.html">Elements</a></li>
                                    <li><a href="coming-soon.html">Coming Soon</a></li>
                                    <li><a href="login.html">Login/Register</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"> Agents <em className="fa fa-chevron-down"></em></a>
                                <ul>
                                    <li>
                                        <a href="#">Agent List <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="agent-list.html">Agent List 1</a></li>
                                            <li><a href="agent-list-2.html">Agent List 2</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Agent Grid <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="agent-grid.html">Agent Grid 1</a></li>
                                            <li><a href="agent-grid-2.html">Agent Grid 2</a></li>
                                            <li><a href="agent-grid-3.html">Agent Grid 3</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="agent-detail.html">Agent Detail</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">Blog <em className="fa fa-chevron-down"></em></a>
                                <ul>
                                    <li>
                                        <a href="#">Columns<em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="blog-columns-2col.html">2 Columns</a></li>
                                            <li><a href="blog-columns-3col.html">3 Columns</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">classNameic <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="blog-classNameic-sidebar-right.html">Right Sidebar</a></li>
                                            <li><a href="blog-classNameic-sidebar-left.html">Left Sidebar</a></li>
                                            <li><a href="blog-classNameic-fullwidth.html">FullWidth</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Blog Details <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="blog-single-sidebar-right.html">Right Sidebar</a></li>
                                            <li><a href="blog-single-sidebar-left.html">Left Sidebar</a></li>
                                            <li><a href="blog-single-fullwidth.html">Fullwidth</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li><a href="#">Shop <em className="fa fa-chevron-down"></em></a>
                                <ul>

                                    <li><a className="dropdown-item" href="shop-list.html">Shop List</a></li>
                                    <li><a className="dropdown-item" href="shop-cart.html">Shop Cart</a></li>
                                    <li><a className="dropdown-item" href="shop-checkout.html">Shop Checkout</a></li>
                                    <li><a className="dropdown-item" href="shop-single.html">Shop Details</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Contact <em className="fa fa-chevron-down"></em></a>
                                <ul>
                                    <li><a className="dropdown-item" href="contact-1.html">Contact 1</a></li>
                                    <li><a className="dropdown-item" href="contact-2.html">Contact 2</a></li>
                                    <li><a className="dropdown-item" href="contact-3.html">Contact 3</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="submit-property.html">Submit Property</a>
                            </li>
                        </ul>
                    </div>
                    <div className="get-in-touch">
                        <h3 className="heading">Get in Touch</h3>
                        <div className="media">
                            <i className="fa fa-phone"></i>
                            <div className="media-body">
                                <a href="tel:0477-0477-8556-552">0477 8556 552</a>
                            </div>
                        </div>
                        <div className="media">
                            <i className="fa fa-envelope"></i>
                            <div className="media-body">
                                <a href="#">info@themevessel.com</a>
                            </div>
                        </div>
                        <div className="media mb-0">
                            <i className="fa fa-fax"></i>
                            <div className="media-body">
                                <a href="#">info@themevessel.com</a>
                            </div>
                        </div>
                    </div>
                    <div className="get-social">
                        <h3 className="heading">Get Social</h3>
                        <a href="#" className="facebook-bg">
                            <i className="fa fa-facebook"></i>
                        </a>
                        <a href="#" className="twitter-bg">
                            <i className="fa fa-twitter"></i>
                        </a>
                        <a href="#" className="google-bg">
                            <i className="fa fa-google"></i>
                        </a>
                        <a href="#" className="linkedin-bg">
                            <i className="fa fa-linkedin"></i>
                        </a>
                    </div>
                </div>
            </nav>
            {/* Sidenav end */}

            {/* Sub banner profile start */}
            <div className="sub-banner">
                <div className="container">
                    <div className="breadcrumb-area">
                        <h1>THÔNG TIN TÀI KHOẢN</h1>
                        <ul className="breadcrumbs">
                            <li><Link to={"/"}>Trang chủ</Link></li>
                            <li className="active">Thông tin tài khoản</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Sub banner end */}

            {/* User page start */}
            <div className="user-page content-area-7 submit-property">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-sm-12">
                            <div className="user-profile-box mrb">
                                {/*header */}
                                <div className="header clearfix">
                                    {/*Tên*/}
                                    <h2>{user.name}</h2>
                                    <br/><br/>
                                    {/*hình ảnh*/}
                                    <br/>
                                    <div className="avatar-container">
                                        <img style={{borderRadius: '50%'}} width={150} height={150}
                                             src={imgUrl || user.avatar} alt=""/>
                                        <label htmlFor="avatar-input" className="avatar-label">
                                            <i className="fa fa-camera"></i>
                                        </label>
                                        <input style={{display: "none"}}
                                               id="avatar-input"
                                               type="file"
                                               name="avatar"
                                               onChange={uploadFile}
                                               className="avatar-input"
                                        />
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{width: `${progressPercent}%`}}></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Detail */}
                                <div className="detail clearfix">
                                    <ul>
                                        <li>
                                            <a onClick={handUpdateUserClick} className={activeButton === "profile" ? 'active' : ''}>
                                                <i className="flaticon-user"></i>Hồ sơ
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={handleShowListHomes} className={activeButton === "listHomes" ? 'active' : ''}>
                                                <i className="flaticon-house"></i>Danh sách nhà
                                            </a>
                                        </li>
                                        <li>
                                            <Link to={"/create"}>
                                                <i className="flaticon-add"></i>Tạo mới nhà
                                            </Link>
                                        </li>
                                        <li>
                                            <a onClick={handleChangePasswordForm} className={activeButton === "changePassword" ? 'active' : ''}>
                                                <i className="flaticon-locked-padlock"></i>Thay đổi mật khẩu
                                            </a>
                                        </li>
                                        <li>
                                            <Link to={"/logout"} className="border-bto2">
                                                <i className="flaticon-logout"></i>Đăng xuất
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-12 col-sm-12">
                            <div className="my-address contact-2">
                                <div>
                                    {showUpdateUserForm ? (
                                        <div>
                                            <h3 className="heading-3">Thông tin cá nhân</h3>
                                            <FormUpdateUser user={user} imgUrl={imgUrl}/>
                                        </div>
                                    ) : null}
                                    {showChangePasswordForm ? (
                                        <div>
                                            <h3 className="heading-3">Thay đổi mật khẩu</h3>
                                            <FormChangePassword user={user}/>
                                        </div>
                                    ) : null}
                                    {showListHomes ? (
                                        <div>
                                            <h3 className="heading-3">Danh sách homestay cho thuê</h3>
                                            <MyProperty/>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* User page end */}

            {/* Footer start */}
            <Footer/>
            {/* Footer end */}
        </div>
    );

    function uploadFile(e) {
        e.preventDefault()
        console.log(e);
        const file = e.target.files[0]

        if (!file) return;

        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgressPercent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL)
                });
            }
        );
    }
}

export default UserProfile;