import { useEffect, useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

function DirectReferrals() {

    const [referrals, setReferrals] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchReferrals();

    }, []);

    const fetchReferrals = async () => {

        try {

            const response =
                await API.get(
                    "/referrals/direct-referrals"
                );

            setReferrals(
                response.data.referrals
            );

        } catch (error) {

            console.log(error);

            alert(
                "Failed to load team"
            );

        } finally {

            setLoading(false);

        }
    };

    const copyReferralLink = () => {

        // navigator.clipboard.writeText(
        //     "http://localhost:3000/register"
        // );
        navigator.clipboard.writeText(
    `${window.location.origin}/register`
);

        alert(
            "Referral Link Copied"
        );
    };

    // if (loading) {

    //     return (

    //         <h2
    //             style={{
    //                 textAlign: "center",
    //                 marginTop: "100px"
    //             }}
    //         >
    //             Loading Team...
    //         </h2>

    //     );
    // }

    if (loading) {

    return <Loader />;

}

    return (

        <>
            <Navbar />

            <div
                style={{
                    width: "95%",
                    maxWidth: "1300px",
                    margin: "30px auto"
                }}
            >

            <h1
                style={{
                    textAlign: "center",
                    marginBottom: "30px"
                }}
            >
                My Referral Team
            </h1>

            {/* TOP CARDS */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(250px,1fr))",
                    gap: "20px",
                    marginBottom: "30px"
                }}
            >

                <div style={cardStyle}>

                    <h3>
                        Team Members
                    </h3>

                    <h1>
                        {referrals.length}
                    </h1>

                </div>

                <div style={cardStyle}>

                    <h3>
                        Referral Link
                    </h3>

                    <button
                        onClick={
                            copyReferralLink
                        }
                        style={{
                            background:
                                "#fff",
                            color:
                                "#2563eb",
                            border:
                                "none",
                            padding:
                                "10px 15px",
                            borderRadius:
                                "10px",
                            cursor:
                                "pointer",
                            fontWeight:
                                "bold"
                        }}
                    >
                        Copy Link
                    </button>

                </div>

            </div>

            {/* MEMBERS */}

            {
                referrals.length === 0 ? (

                    <div
                        style={{
                            background:
                                "#fff",
                            padding:
                                "40px",
                            borderRadius:
                                "15px",
                            textAlign:
                                "center",
                            boxShadow:
                                "0 5px 15px rgba(0,0,0,.1)"
                        }}
                    >

                        <h2>
                            No Team Members Yet
                        </h2>

                        <p>
                            Share your
                            referral code
                            and grow
                            your team.
                        </p>

                    </div>

                ) : (

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(320px,1fr))",
                            gap: "20px"
                        }}
                    >

                        {
                            referrals.map(
                                (user) => (

                                    <div
                                        key={
                                            user._id
                                        }
                                        style={{
                                            background:
                                                "#fff",
                                            padding:
                                                "20px",
                                            borderRadius:
                                                "15px",
                                            boxShadow:
                                                "0 5px 15px rgba(0,0,0,.12)"
                                        }}
                                    >

                                        <h2>
                                            {
                                                user.fullName
                                            }
                                        </h2>

                                        <p>

                                            <strong>
                                                Email :
                                            </strong>

                                            {" "}
                                            {
                                                user.email
                                            }

                                        </p>

                                        <p>

                                            <strong>
                                                Mobile :
                                            </strong>

                                            {" "}
                                            {
                                                user.mobile
                                            }

                                        </p>

                                        <p>

                                            <strong>
                                                Referral :
                                            </strong>

                                            {" "}
                                            {
                                                user.referralCode
                                            }

                                        </p>

                                        <span
                                            style={{
                                                background:
                                                    "#22c55e",
                                                color:
                                                    "#fff",
                                                padding:
                                                    "6px 15px",
                                                borderRadius:
                                                    "20px"
                                            }}
                                        >

                                            Joined

                                        </span>

                                        <p
                                            style={{
                                                marginTop:
                                                    "15px",
                                                color:
                                                    "#666"
                                            }}
                                        >

                                            {
                                                new Date(
                                                    user.createdAt
                                                )
                                                .toLocaleDateString()
                                            }

                                        </p>

                                    </div>

                                )
                            )
                        }

                    </div>

                )
            }

            </div>

        </>

    );
}

const cardStyle = {

    background:
        "linear-gradient(135deg,#2563eb,#7c3aed)",

    color: "#fff",

    padding: "25px",

    borderRadius: "15px",

    textAlign: "center",

    boxShadow:
        "0 5px 15px rgba(0,0,0,.2)"

};

export default DirectReferrals;