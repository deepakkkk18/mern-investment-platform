import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({
            fullName: "",
            email: "",
            mobile: "",
            password: "",
            referralCodeUsed: ""
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

            await API.post(
                "/auth/register",
                formData
            );

            alert(
                "Registration Successful"
            );

            navigate("/");

        } catch (error) {

            alert(
                error.response?.data
                    ?.message ||
                "Registration Failed"
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
                    maxWidth: "500px",
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

                {/* HEADER */}

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
                            fontSize:
                                "40px",
                            marginBottom:
                                "10px"
                        }}
                    >
                        InvestPro
                    </h1>

                    <p
                        style={{
                            color:
                                "#cbd5e1",
                            fontSize:
                                "18px"
                        }}
                    >
                        Create your account
                    </p>

                </div>

                <form
                    onSubmit={
                        handleSubmit
                    }
                >

                    {/* FULL NAME */}

                    <div
                        style={{
                            marginBottom:
                                "18px"
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
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="fullName"
                            placeholder="Enter Full Name"
                            value={
                                formData.fullName
                            }
                            onChange={
                                handleChange
                            }
                            required
                            style={
                                inputStyle
                            }
                        />

                    </div>

                    {/* EMAIL */}

                    <div
                        style={{
                            marginBottom:
                                "18px"
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
                            style={
                                inputStyle
                            }
                        />

                    </div>

                    {/* MOBILE */}

                    <div
                        style={{
                            marginBottom:
                                "18px"
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
                            Mobile Number
                        </label>

                        <input
                            type="text"
                            name="mobile"
                            placeholder="Enter Mobile Number"
                            value={
                                formData.mobile
                            }
                            onChange={
                                handleChange
                            }
                            required
                            style={
                                inputStyle
                            }
                        />

                    </div>

                    {/* PASSWORD */}

                    <div
                        style={{
                            marginBottom:
                                "18px"
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
                            style={
                                inputStyle
                            }
                        />

                    </div>

                    {/* REFERRAL */}

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
                            Referral Code
                            (Optional)
                        </label>

                        <input
                            type="text"
                            name="referralCodeUsed"
                            placeholder="Enter Referral Code"
                            value={
                                formData.referralCodeUsed
                            }
                            onChange={
                                handleChange
                            }
                            style={
                                inputStyle
                            }
                        />

                    </div>

                    {/* BUTTON */}

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
                                "pointer"
                        }}
                    >

                        {
                            loading
                                ? "Please Wait..."
                                : "Register"
                        }

                    </button>

                </form>

                {/* LOGIN */}

                <div
                    style={{
                        textAlign:
                            "center",
                        marginTop:
                            "25px"
                    }}
                >

                    <span
                        style={{
                            color:
                                "#cbd5e1"
                        }}
                    >
                        Already have an account?
                    </span>

                    <Link
                        to="/"
                        style={{
                            color:
                                "#60a5fa",
                            marginLeft:
                                "8px",
                            textDecoration:
                                "none",
                            fontWeight:
                                "bold"
                        }}
                    >
                        Login
                    </Link>

                </div>

            </div>

        </div>
    );
}

const inputStyle = {

    width: "100%",

    padding: "15px",

    border: "none",

    borderRadius: "12px",

    outline: "none",

    fontSize: "16px",

    boxSizing: "border-box"
};

export default Register;