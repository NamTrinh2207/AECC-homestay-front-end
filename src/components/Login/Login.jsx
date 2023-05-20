import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {loginUser} from "../../redux/apiRequest";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        const newUser = {
            username: username,
            password: password,
        };
        loginUser(newUser, dispatch, navigate)
    }
    return (
        <div className="contact-section">
            <div className="container-fluid">
                <div className="row login-box">
                    <div className="col-lg-12 align-self-center pad-0 form-section">
                        <div className="form-inner">
                            <a href="index.html" className="logos">
                                <img src="assets/img/logos/black-logo.png" alt="logo"/>
                            </a>
                            <h3>Sign Into Your Account</h3>
                            <form onSubmit={handleLogin}>
                                <div className="form-group form-box">
                                    <input type="text" name="username" className="input-text" placeholder="User Name"
                                           onChange={(e) => setUsername(e.target.value)}/>
                                    <i className="flaticon-mail-2"></i>
                                </div>
                                <div className="form-group form-box">
                                    <input type="password" name="Password" className="input-text"
                                           placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                    <i className="flaticon-password"></i>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-4 btn-block">Login</button>
                                </div>
                                <div className="">
                                    <Link to={"/"} className="btn btn-4 btn-block">Back</Link>
                                </div>

                                <div className="clearfix"></div>
                                <ul className="social-list clearfix">
                                    <li><a href="#" className="google-bg">Google</a></li>
                                </ul>
                            </form>
                            <div className="clearfix"></div>
                            <p>Don't have an account? <a href="register.html" className="thembo"> Register here</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;