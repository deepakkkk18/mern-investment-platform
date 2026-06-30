import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({
            email: "",
            password: ""
        });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response =
                await API.post(
                    "/auth/login",
                    formData
                );

            localStorage.setItem(
                "token",
                response.data.token
            );

            alert(
                "Login Successful"
            );

            navigate(
                "/dashboard"
            );

        } catch (error) {

            alert(
                error.response?.data
                    ?.message ||
                "Login Failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg,#0f172a,#1e3a8a,#7c3aed)",
                display: "flex",
                justifyContent:
                    "center",
                alignItems:
                    "center",
                padding: "20px"
            }}
        >

            <div
                style={{
                    width: "100%",
                    maxWidth:
                        "430px",
                    background:
                        "rgba(255,255,255,0.08)",
                    backdropFilter:
                        "blur(15px)",
                    padding: "40px",
                    borderRadius:
                        "20px",
                    boxShadow:
                        "0 15px 35px rgba(0,0,0,.3)",
                    border:
                        "1px solid rgba(255,255,255,.15)"
                }}
            >

                <div
                    style={{
                        textAlign:
                            "center",
                        marginBottom:
                            "30px"
                    }}
                >

                    <h1
                        style={{
                            color:
                                "#fff",
                            marginBottom:
                                "10px",
                            fontSize:
                                "35px"
                        }}
                    >
                        InvestPro
                    </h1>

                    <p
                        style={{
                            color:
                                "#cbd5e1"
                        }}
                    >
                        Login to your account
                    </p>

                </div>

                <form
                    onSubmit={
                        handleSubmit
                    }
                >

                    <div
                        style={{
                            marginBottom:
                                "20px"
                        }}
                    >

                        <label
                            style={{
                                color:
                                    "#fff",
                                display:
                                    "block",
                                marginBottom:
                                    "8px"
                            }}
                        >
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={
                                formData.email
                            }
                            onChange={
                                handleChange
                            }
                            required
                            style={{
                                width:
                                    "100%",
                                padding:
                                    "15px",
                                border:
                                    "none",
                                borderRadius:
                                    "12px",
                                outline:
                                    "none",
                                fontSize:
                                    "16px",
                                boxSizing:
                                    "border-box"
                            }}
                        />

                    </div>

                    <div
                        style={{
                            marginBottom:
                                "25px"
                        }}
                    >

                        <label
                            style={{
                                color:
                                    "#fff",
                                display:
                                    "block",
                                marginBottom:
                                    "8px"
                            }}
                        >
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={
                                formData.password
                            }
                            onChange={
                                handleChange
                            }
                            required
                            style={{
                                width:
                                    "100%",
                                padding:
                                    "15px",
                                border:
                                    "none",
                                borderRadius:
                                    "12px",
                                outline:
                                    "none",
                                fontSize:
                                    "16px",
                                boxSizing:
                                    "border-box"
                            }}
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={
                            loading
                        }
                        style={{
                            width:
                                "100%",
                            padding:
                                "15px",
                            background:
                                "linear-gradient(135deg,#2563eb,#7c3aed)",
                            color:
                                "#fff",
                            border:
                                "none",
                            borderRadius:
                                "12px",
                            fontSize:
                                "18px",
                            fontWeight:
                                "bold",
                            cursor:
                                "pointer",
                            transition:
                                ".3s"
                        }}
                    >

                        {
                            loading
                                ? "Please Wait..."
                                : "Login"
                        }

                    </button>

                </form>

                <div
                    style={{
                        marginTop:
                            "25px",
                        textAlign:
                            "center"
                    }}
                >

                    <span
                        style={{
                            color:
                                "#cbd5e1"
                        }}
                    >
                        Don't have an account?
                    </span>

                    <Link
                        to="/register"
                        style={{
                            color:
                                "#60a5fa",
                            textDecoration:
                                "none",
                            marginLeft:
                                "8px",
                            fontWeight:
                                "bold"
                        }}
                    >
                        Register
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Login;