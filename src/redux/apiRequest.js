import axios from "axios";
import {loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess} from "./authSlice";
import {toast} from "react-toastify";


export const loginUser = async (user, dispatch, navigate) => {

    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:8080/login", user);
        localStorage.setItem("user", JSON.stringify(res.data));
        toast.success("Đăng nhập thành công", {
            onClose: () => {
                navigate("/");
            }
        });
        dispatch(loginSuccess(res.data));
    } catch {
        toast.error("Sai tài khoản mật khẩu hoặc bạn chưa xác thực email đăng ký !");
        dispatch(loginFailed());
    }
}
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    await axios.post("http://localhost:8080/signup", user).then((res) => {
        alert(res.data.message)
        dispatch(registerSuccess());
        if (res.data.message === "Vui lòng truy cập email để xác nhận đăng ký"){
            navigate("/login")
        }
    }).catch((error) => {
        alert(error.message)
        dispatch(registerFailed())
    })
}
