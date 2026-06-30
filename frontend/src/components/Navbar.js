import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        navigate("/");
    };

    return (

        <div
            style={{
                background:
                    "linear-gradient(90deg,#0f172a,#1e3a8a)",
                padding: "15px 30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow:
                    "0 4px 10px rgba(0,0,0,0.2)"
            }}
        >

            <h2
                style={{
                    color: "#fff",
                    margin: 0,
                    fontWeight: "700"
                }}
            >
                Next Chain
            </h2>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px"
                }}
            >

                <Link
                    to="/dashboard"
                    style={linkStyle}
                >
                    Dashboard
                </Link>

                <Link
                    to="/create-investment"
                    style={linkStyle}
                >
                    Invest
                </Link>

                <Link
                    to="/my-investments"
                    style={linkStyle}
                >
                    My Plans
                </Link>

                <Link
                    to="/roi-history"
                    style={linkStyle}
                >
                    ROI
                </Link>

                <Link
                    to="/referral-income-history"
                    style={linkStyle}
                >
                    Income
                </Link>

                <Link
                    to="/direct-referrals"
                    style={linkStyle}
                >
                    Team
                </Link>

                <Link
                    to="/referral-tree"
                    style={linkStyle}
                >
                    Tree
                </Link>

                <button
                    onClick={logout}
                    style={{
                        background:
                            "linear-gradient(45deg,#ef4444,#dc2626)",
                        color: "#fff",
                        border: "none",
                        padding:
                            "10px 18px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "600"
                    }}
                >
                    Logout
                </button>

            </div>

        </div>

    );
}

const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "600"
};

export default Navbar;