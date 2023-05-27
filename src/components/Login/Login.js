import React from 'react';
import LoginGoogle from "./LoginGoogle";
import {Link, useNavigate} from "react-router-dom";
import "./login.css"
import {ErrorMessage, Formik} from "formik";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {loginUser} from "../../redux/apiRequest";
import Toast from "../toast/Toast";


function Login(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object({
        username: Yup.string().required("tên tài khoản không được để trống !"),
        password: Yup.string().required("mật khẩu không được để trống !"),
    });
    const handleLogin = (values) => {
        const newUser = {
            username: values.username,
            password: values.password,
        };
        loginUser(newUser, dispatch, navigate)
    }
    return (
        <div>
            <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
                <div className="card card0 border-0">
                    <div className="row d-flex">
                        <div className="col-lg-6">
                            <div className="card1 pb-5">
                                <div className="row px-6 justify-content-center mt-50 border-line">
                                    <img
                                        src="https://pearlriverhotel.vn/wp-content/uploads/2019/07/pearl-river-hotel-home1.jpg"
                                        style={{
                                            width: '680px',
                                            marginLeft: '100px',
                                            borderRadius: '10px',
                                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
                                        }} alt="homestay"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card2 card border-0 px-4 py-5">
                                <div className="row mb-4 px-3">
                                    <h6 className="mb-0 mr-4 mt-2"><LoginGoogle/></h6>
                                </div>
                                <div className="row px-3 mb-4">
                                    <div className="line"></div>
                                    <small className="or text-center">Or</small>
                                    <div className="line"></div>
                                </div>
                                <Formik initialValues={initialValues}
                                        onSubmit={handleLogin}
                                        validationSchema={validationSchema}>
                                    {formik => (
                                        <form onSubmit={formik.handleSubmit}>
                                            <div className="row px-3">
                                                <label className="mb-1"><h6 className="mb-0 text-xl-end">Tên tài khoản</h6></label>
                                                <input {...formik.getFieldProps("username")} type="text"/>
                                                <span style={{color: 'red', fontSize: 12}}><ErrorMessage
                                                    name={"username"}></ErrorMessage></span>
                                            </div>
                                            <br/>
                                            <div className="row px-3">
                                                <label className="mb-1"><h6 className="mb-0 text-xl-end">Mật khẩu</h6></label>
                                                <input {...formik.getFieldProps("password")} type="password"/>
                                                <span style={{color: 'red', fontSize: 12}}><ErrorMessage
                                                    name={"password"}></ErrorMessage></span>
                                            </div>
                                            <br/>
                                            <div className="row mb-3 px-3">
                                                <Toast name={"Đăng Nhập"}/>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                                <div className="row mb-4 px-3">
                                    <small className="font-weight-bold">Bạn chưa có tài khoản ?
                                        <Link to={"/register"} className="text-danger"> Đăng ký</Link></small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;