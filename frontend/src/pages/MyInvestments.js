import { useEffect, useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

function MyInvestments() {

    const [investments, setInvestments] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchInvestments();

    }, []);

    const fetchInvestments = async () => {

        try {

            const response =
                await API.get(
                    "/investments/my-investments"
                );

            setInvestments(
                response.data.investments
            );

        } catch (error) {

            console.log(error);

            alert(
                "Failed to load investments"
            );

        } finally {

            setLoading(false);

        }
    };

    if (loading) {

        return <Loader />;

    }

    const totalInvestment =
        investments.reduce(
            (sum, item) =>
                sum +
                item.investmentAmount,
            0
        );

    return (

        <>
            <Navbar />

            <div
                style={{
                    width: "95%",
                    maxWidth: "1400px",
                    margin: "30px auto"
                }}
            >

            <h1
                style={{
                    textAlign: "center",
                    marginBottom: "30px"
                }}
            >
                My Investments
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
                        Total Plans
                    </h3>

                    <h1>
                        {
                            investments.length
                        }
                    </h1>

                </div>

                <div style={cardStyle}>

                    <h3>
                        Total Invested
                    </h3>

                    <h1>
                        ₹
                        {
                            totalInvestment
                        }
                    </h1>

                </div>

            </div>

            {/* EMPTY */}

            {
                investments.length ===
                0 ? (

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
                            No Investments
                            Found
                        </h2>

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

                            investments.map(
                                (item) => (

                                    <div
                                        key={
                                            item._id
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
                                                item.planName
                                            }
                                        </h2>

                                        <p>

                                            <strong>
                                                Amount:
                                            </strong>

                                            {" "}
                                            ₹
                                            {
                                                item.investmentAmount
                                            }

                                        </p>

                                        <p>

                                            <strong>
                                                Daily ROI:
                                            </strong>

                                            {" "}
                                            {
                                                item.dailyROI
                                            }%

                                        </p>

                                        <p>

                                            <strong>
                                                End Date:
                                            </strong>

                                            {" "}
                                            {
                                                new Date(
                                                    item.endDate
                                                )
                                                .toLocaleDateString()
                                            }

                                        </p>

                                        <div
                                            style={{
                                                marginTop:
                                                    "15px"
                                            }}
                                        >

                                            <span
                                                style={{
                                                    background:
                                                        item.status ===
                                                        "Active"
                                                            ? "#22c55e"
                                                            : "#ef4444",

                                                    color:
                                                        "#fff",

                                                    padding:
                                                        "6px 15px",

                                                    borderRadius:
                                                        "20px",

                                                    fontWeight:
                                                        "bold"
                                                }}
                                            >

                                                {
                                                    item.status
                                                }

                                            </span>

                                        </div>

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

export default MyInvestments;