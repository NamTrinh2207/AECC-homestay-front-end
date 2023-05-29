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
import MyProperty from "./MyProperty";
import ListBookingByOwner from "./ListBookingByOwner";
import RentaHistory from "./RentaHistory";

function UserProfile(props) {
    const [imgUrl, setImgUrl] = useState(null);
    const [progressPercent, setProgressPercent] = useState(0);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [showUpdateUserForm, setShowUpdateUserForm] = useState(false);
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
    const [showListHomes, setShowListHomes] = useState(true);
    const [activeButton, setActiveButton] = useState('listHomes');
    const [showListBookings, setShowListBookings] = useState(true);
    const [activeButton1, setActiveButton1] = useState('listBookings');
    const [showListBookingByOwner, setShowListBookingByOwner] = useState(false);
    const [showListHistoryRental, setShowListHistoryRental] = useState(false);

    const handUpdateUserClick = () => {
        setShowUpdateUserForm(true);
        setShowChangePasswordForm(false);
        setShowListHomes(false)
        setShowListBookingByOwner(false);
        setShowListHistoryRental(false)
        setShowListBookings(false);
        setActiveButton('profile');

    }
    const handleChangePasswordForm = () => {
        setShowUpdateUserForm(false);
        setShowChangePasswordForm(true);
        setShowListHomes(false)
        setShowListBookingByOwner(false);
        setShowListHistoryRental(false)
        setShowListBookings(false);
        setActiveButton('changePassword');
    }

    const handleShowListHomes = () => {
        setShowUpdateUserForm(false);
        setShowChangePasswordForm(false);
        setShowListHomes(true);
        setShowListBookingByOwner(false);
        setShowListHistoryRental(false);
        setShowListBookings(false);
        setActiveButton('listHomes');

    };
    const handleHistoryRental = () => {
        setShowUpdateUserForm(false);
        setShowChangePasswordForm(false);
        setShowListHomes(false);
        setShowListBookingByOwner(false);
        setShowListHistoryRental(true)
        setShowListBookings(false);
        setActiveButton('history');
    }

    const handleShowListBooking = () => {
        setShowUpdateUserForm(false);
        setShowChangePasswordForm(false);
        setShowListBookings(true);
        setShowListBookingByOwner(false);
        setShowListHistoryRental(false)
        setActiveButton1('listBookings');
    }
    const handleShowListBookingByOwner = () => {
        setShowUpdateUserForm(false);
        setShowChangePasswordForm(false);
        setShowListBookingByOwner(true);
        setShowListHomes(false)
        setShowListHistoryRental(false)
        setShowListBookings(false);
        setActiveButton('listBookingByOwner');
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
    // bat dau sua
    const data = localStorage.getItem("user");
    let role = null;
    if (data != null) {
        role = JSON.parse(localStorage.getItem("user")).roles[0].authority
        console.log(role)
    } else {
        role = null;
    }
    // ket thuc sua

    if (loading) {
        return <div>Đang lấy thông tin...</div>
    }

    return (
        <div>

            {/*Top header start*/}
            <TopHeader avatar={user.avatar}/>
            {/* Top header end */}

            {/* main header start */}
            <MainHeader/>
            {/* main header end */}


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
                                    {/*hình ảnh*/}
                                    <br/>
                                    <div className="avatar-container">
                                        <img style={{borderRadius: '50%', marginTop:50}} width={200} height={200}
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
                                            <a onClick={handUpdateUserClick}
                                               className={activeButton === "profile" ? 'active' : ''}>
                                                <i className="flaticon-user"></i>Hồ sơ
                                            </a>
                                        </li>
                                        {/*bat dau sua*/}
                                        {role ? (

                                            <>
                                                {role === "ROLE_USER" ? (
                                                    <>
                                                        <li>
                                                            <a onClick={handleShowListHomes}
                                                               className={activeButton === "listHomes" ? 'active' : ''}>
                                                                <i className="flaticon-house"></i>Danh sách nhà
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <Link to={"/create"}>
                                                                <i className="flaticon-add"></i>Tạo mới nhà
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <a onClick={handleShowListBookingByOwner}
                                                               className={activeButton === "listBookingByOwner" ? 'active' : ''}>
                                                                <i className="flaticon-user"></i>Danh sách người thuê
                                                            </a>
                                                        </li>
                                                    </>
                                                ) : (
                                                    <>
                                                        {role === "ROLE_CUSTOMER" ? (
                                                                <>
                                                                    <li>
                                                                        <a onClick={handleShowListBooking}
                                                                           className={activeButton === "listBookings" ? 'active' : ''}>
                                                                            <i className="flaticon-house"></i>Danh sách
                                                                            booking
                                                                        </a>
                                                                    </li>

                                                                    <li>
                                                                        <Link to={"/"}>
                                                                            <i className="flaticon-add"></i>Thuê nhà ngay
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <a onClick={handleHistoryRental}
                                                                           className={activeButton === "history" ? 'active' : ''}>
                                                                            <i className="flaticon-house"></i>Lịch sử thuê
                                                                            nhà
                                                                        </a>
                                                                    </li>

                                                                </>
                                                            )
                                                            : (
                                                                <>

                                                                </>
                                                            )
                                                        }
                                                    </>
                                                )
                                                }
                                            </>
                                        ) : (
                                            <>

                                            </>
                                        )}
                                        {/*ket thuc sua*/}
                                        <li>
                                            <a onClick={handleChangePasswordForm}
                                               className={activeButton === "changePassword" ? 'active' : ''}>
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
                                    {role ? (
                                        <>
                                            {role === "ROLE_USER" ? (
                                                <>
                                                    {showListHomes ? (
                                                        <div>
                                                            <h3 className="heading-3">Danh sách homestay cho thuê</h3>
                                                            <MyProperty user={user}/>
                                                        </div>
                                                    ) : null}
                                                    {showListBookingByOwner ? (
                                                        <div>
                                                            <h3 className="heading-3">Danh sách người thuê</h3>
                                                            <ListBookingByOwner user={user}/>
                                                        </div>
                                                    ) : null}
                                                </>
                                            ) : role === "ROLE_CUSTOMER" ? (
                                                <>
                                                    {showListHistoryRental ? (
                                                        <div>
                                                            <h3 className="heading-3">Lịch sử thuê nhà</h3>
                                                            <RentaHistory user={user}/>
                                                        </div>
                                                    ) : null}
                                                </>
                                            ) : null}
                                        </>
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