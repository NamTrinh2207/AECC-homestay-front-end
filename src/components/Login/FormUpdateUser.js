import React from 'react';
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {ErrorMessage, Formik} from "formik";
import * as Yup from "yup";

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
    const validate = Yup.object({
        phoneNumber: Yup.number()
            .min(10, "Số điện thoại phải có ít nhất 10 số")
            .max(11, "Số điện thoại không được vượt quá 11 số")
    });

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
                validationSchema={validate}
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
                                <span style={{color: 'red', fontSize: 12}}><ErrorMessage
                                    name={"phoneNumber"}></ErrorMessage></span>
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
                                <ToastContainer autoClose={1000}/>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
}

export default FormUpdateUser;