import axios from "axios";
import {loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess} from "./authSlice";
import {toast} from "react-toastify";


export const loginUser = async (user, dispatch, navigate) => {

    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:8080/login", user);
        dispatch(loginSuccess(res.data));
        localStorage.setItem("user", JSON.stringify(res.data));
        toast.success("Đăng nhập thành công");
        setTimeout(() => {
            navigate("/");
        }, 1500);
    } catch {
        toast.error("Sai tài khoản mật khẩu hoặc bạn chưa xác thực email đăng ký !");
        dispatch(loginFailed());
    }
}
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    await axios.post("http://localhost:8080/signup", user).then((res) => {
        toast.success(res.data.message)
        dispatch(registerSuccess());
        if (res.data.message === "Vui lòng truy cập email để xác nhận đăng ký"){
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        }
    }).catch((error) => {
        toast.error(error.message)
        dispatch(registerFailed())
    })
}
