import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {registerUser} from "../../redux/apiRequest";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        username: "",
        password: "",
        email: "",
        roles: ["ROLE_USER"]
    };

    const validationSchema = Yup.object({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
    });

    const handleRegister = (values) => {
        const newUser = {
            username: values.username,
            password: values.password,
            email: values.email,
            roles: [values.roles]
        };
        registerUser(newUser, dispatch, navigate);
    };

    return (
        <>
            <div className="contact-section">
                <div className="container-fluid">
                    <div className="row login-box">
                        <div className="col-lg-12 align-self-center pad-0 form-section">
                            <div className="form-inner">
                                <a href="index.html" className="logos">
                                    <img src="assets/img/logos/black-logo.png" alt="logo"/>
                                </a>
                                <h3>Sign Into Your Account</h3>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleRegister}
                                >
                                    {formik => (
                                        <Form onSubmit={formik.handleSubmit}>
                                            <div className="form-group form-box">
                                                <Field
                                                    type="text"
                                                    name="username"
                                                    className="input-text"
                                                    placeholder="User Name"
                                                />
                                                <ErrorMessage
                                                    name="username"
                                                    component="div"
                                                    className="error-message"
                                                />
                                            </div>
                                            <div className="form-group form-box">
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    className="input-text"
                                                    placeholder="Password"
                                                />
                                                <ErrorMessage
                                                    name="password"
                                                    component="div"
                                                    className="error-message"
                                                />
                                            </div>
                                            <div className="form-group form-box">
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    className="input-text"
                                                    placeholder="Email"
                                                />
                                                <ErrorMessage
                                                    name="email"
                                                    component="div"
                                                    className="error-message"
                                                />
                                            </div>
                                            <select {...formik.getFieldProps("roles")}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}>
                                                <option value={"ROLE_USER"}>USER</option>
                                                <option value={"ROLE_CUSTOMER"}>CUSTOMER</option>
                                            </select>
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-4 btn-block">
                                                    Signup
                                                </button>
                                            </div>
                                        </Form>
                                    )}

                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
