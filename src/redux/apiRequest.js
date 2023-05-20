import axios from "axios";
import {loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess} from "./authSlice";

export const loginUser = async (user, dispatch, navigate) => {

    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:8080/login", user)
        dispatch(loginSuccess(res.data));
        localStorage.setItem("user", JSON.stringify(res.data))
        alert("Đăng nhập thành công")
        navigate("/")
    } catch (error) {
        alert("Sai tài khoản hoặc mật khẩu")
        dispatch(loginFailed())
    }
}
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    await axios.post("http://localhost:8080/signup", user).then(() => {
        alert("Vui lòng truy cập vào email của bạn để xác nhân đăng ký")
        dispatch(registerSuccess());
        navigate("/login")
    }).catch((error) => {
        alert(error.getMessage)
        dispatch(registerFailed())
    })
}
