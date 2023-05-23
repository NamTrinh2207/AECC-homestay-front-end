import React from 'react';
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {Formik} from "formik";

function FormUpdateUser(props) {
    const user = props.user;
    const imgUrl = props.imgUrl;
    const initialValue = {
        name: user.name || "",
        address: user.address || "",
        phoneNumber: user.phoneNumber || "",
        avatar: user.avatar ||  "",
        email: user.email || "",
    };
    return (
        <Formik initialValues={initialValue}
                onSubmit={(values) => {
                    values.avatar = imgUrl;
                    axios.put(`http://localhost:8080/${user.id}`, values)
                        .then(() => {
                            toast.success("Sửa thông tin thành công")
                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                }}
                enableReinitialize={true}>
            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-lg-12 ">
                            <div className="form-group name">
                                <label>Họ và tên</label>
                                <input type="text" {...formik.getFieldProps("name")} className="form-control"
                                       placeholder="..."/>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="form-group email">
                                <label>Số điện thoại</label>
                                <input type="text" {...formik.getFieldProps("phoneNumber")} className="form-control"
                                       placeholder="Nhập số điện thoại"/>
                            </div>
                        </div>
                        <div className="col-lg-12 ">
                            <div className="form-group number">
                                <label>Email</label>
                                <input readOnly type="email" {...formik.getFieldProps("email")} className="form-control"
                                       placeholder="Email"/>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="form-group message">
                                <label>Địa chỉ</label>
                                <textarea className="form-control" {...formik.getFieldProps("address")}
                                          placeholder="Nhập địa chỉ"></textarea>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="send-btn">
                                <button type="submit" className="btn btn-4">Cập nhật thông tin
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

export default FormUpdateUser;