import TopHeader from "../header/TopHeader";
import MainHeader from "../header/MainHeader";
import Footer from "../footer/Footer";
import React, { useEffect, useState} from 'react'
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