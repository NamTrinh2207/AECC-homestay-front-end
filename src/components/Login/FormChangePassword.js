import React from 'react';
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {Formik} from "formik";
import * as Yup from "yup";

function FormChangePassword(props) {
    const user = props.user;
    const initialValue = {
        username: user.username || "",
        password: "",
        confirmPassword: ""
    };
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Vui lòng nhập mật khẩu mới')
            .min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận phải khớp với mật khẩu mới')
            .required('Vui lòng xác nhận mật khẩu mới'),
    });
    return (
        <Formik initialValues={initialValue}
                onSubmit={(values) => {
                    axios.put(`http://localhost:8080/change/${user.id}`, values)
                        .then(() => {
                            toast.success("Đổi mật khẩu tin thành công")
                        })
                        .catch(function() {
                            toast.error("Thay đổi mật khẩu thất bại")
                        })
                }}
                enableReinitialize={true}>
            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-lg-12 ">
                            <div className="form-group number">
                                <label>Tên tài khoản</label>
                                <input readOnly type="text" {...formik.getFieldProps("username")} className="form-control"
                                       placeholder="Tên tài khoản"/>
                            </div>
                        </div>
                        <div className="col-lg-12 ">
                            <div className="form-group number">
                                <label>Nhập mật khẩu cũ</label>
                                <input type="password" {...formik.getFieldProps("password")} className="form-control"
                                       placeholder="Mật khẩu cũ"/>
                            </div>
                        </div>
                        <div className="col-lg-12 ">
                            <div className="form-group number">
                                <label>Mật khẩu mới</label>
                                <input type="password" {...formik.getFieldProps("confirmPassword")} className="form-control"
                                       placeholder="Mật khẩu mới"/>
                            </div>
                        </div>
                        <div className="col-lg-12 ">
                            <div className="form-group number">
                                <label>Nhập lại mật khẩu mới</label>
                                <input type="password" {...formik.getFieldProps("confirmPassword")} className="form-control"
                                       placeholder="Nhập lại mật khẩu mới"/>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="send-btn">
                                <button type="submit" className="btn btn-4">Đổi mật khẩu
                                </button>
                                <ToastContainer
                                    autoClose={1000}
                                    hideProgressBar={true}/>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
}

export default FormChangePassword;