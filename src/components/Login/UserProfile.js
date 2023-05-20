import React, {useEffect, useState} from 'react'
import {ErrorMessage, Field, Formik} from "formik";
import axios from "axios";
import {storage} from '../../firebase';
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";

function UserProfile(props) {
    const [imgUrl, setImgUrl] = useState(null);
    const [progressPercent, setProgressPercent] = useState(0);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

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
        <Formik
            initialValues={
                {
                    name: user.name || "",
                    address: user.address || "",
                    phoneNumber: user.phoneNumber || "",
                    avatar: user.avatar || "",
                    email: user.email || "",
                }
            }
            onSubmit={(values) => {
                values.avatar = imgUrl;
                axios.put(`http://localhost:8080/${user.id}`, values)
                    .then(() => {
                        alert("update profile thành công")
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            }}
            enableReinitialize={true}>
            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <table>
                        <tbody>
                        <tr>
                            <td>Name:</td>
                            <td>
                                <Field name='name' className="input-field"/>
                            </td>
                            <td>
                                <ErrorMessage name='name' className="error-message"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>
                                <Field name='address' className="input-field"/>
                            </td>
                            <td>
                                <ErrorMessage name='address' className="error-message"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>
                                <Field readOnly name='email' className="input-field"/>
                            </td>
                            <td>
                                <ErrorMessage name='email' className="error-message"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Phone:</td>
                            <td>
                                <Field name='phoneNumber' className="input-field"/>
                            </td>
                            <td>
                                <ErrorMessage name='phoneNumber' className="error-message"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Avatar:</td>
                            <td>
                                <div className="avatar-container">
                                    <img width={100} height={100} src={imgUrl || user.avatar} alt=""/>
                                    <div className="edit-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" viewBox="0 0 16 16">
                                            <path
                                                d="M15.854 2.146a.5.5 0 0 0-.707 0L10 6.793 8.707 5.5a.5.5 0 0 0-.707 0L6 6.793 1.854 2.646a.5.5 0 0 0-.708.708L5.293 7l-1.792 1.292a.5.5 0 0 0 0 .708l4.146 4.146a.498.498 0 0 0 .708 0L13 9.207l1.292 1.792a.5.5 0 0 0 .708 0L16 9.207l1.146 1.146a.5.5 0 0 0 .708-.708L14.707 7l1.792-1.292a.5.5 0 0 0 0-.708L15.854 2.146zM7.5 10.793L2.207 5.5 7.5.207l5.293 5.293L7.5 10.793z"/>
                                        </svg>
                                    </div>
                                    <input type={'file'} name="avatar" onChange={uploadFile} className="avatar-input"/>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{width: `${progressPercent}%`}}></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Status:</td>
                            <td>
                                <div className="verification-status">
                                    <div className={`status-icon ${user.verified ? 'active' : 'unconfirmed'}`
                                    }></div>
                                    <span>{user.verified ? "Active" : "Unconfirmed"}</span>

                                </div>
                            </td>
                        </tr>
                        </tbody>

                    </table>
                    <button
                        className="btn btn-primary waves-effect waves-light btn-sm"
                        id="sa-success">Click me
                    </button>
                </form>
            )}
        </Formik>
    )

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