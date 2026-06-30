import { useEffect, useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

function ReferralIncomeHistory() {

    const [incomes, setIncomes] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchIncomeHistory();

    }, []);

    const fetchIncomeHistory = async () => {

        try {

            const response =
                await API.get(
                    "/investments/referral-income-history"
                );

            setIncomes(
                response.data.incomes
            );

        } catch (error) {

            console.log(error);

            alert(
                "Failed to load income history"
            );

        } finally {

            setLoading(false);

        }
    };

    if (loading) {

        return <Loader />;

    }

    const totalIncome =
        incomes.reduce(
            (sum, item) =>
                sum + item.incomeAmount,
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
                Referral Income History
            </h1>

            {/* SUMMARY */}

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
                        Total Income
                    </h3>

                    <h1>
                        ₹{totalIncome}
                    </h1>

                </div>

                <div style={cardStyle}>

                    <h3>
                        Total Referrals
                    </h3>

                    <h1>
                        {incomes.length}
                    </h1>

                </div>

            </div>

            {/* EMPTY */}

            {
                incomes.length === 0 ? (

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
                            No Referral Income Found
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
                            incomes.map(
                                (income) => (

                                    <div
                                        key={
                                            income._id
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
                                                income
                                                .sourceUser
                                                ?.fullName
                                            }
                                        </h2>

                                        <p>

                                            <strong>
                                                Email:
                                            </strong>

                                            {" "}
                                            {
                                                income
                                                .sourceUser
                                                ?.email
                                            }

                                        </p>

                                        <p>

                                            <strong>
                                                Level:
                                            </strong>

                                            {" "}

                                            <span
                                                style={{
                                                    background:
                                                        "#2563eb",
                                                    color:
                                                        "#fff",
                                                    padding:
                                                        "5px 12px",
                                                    borderRadius:
                                                        "20px"
                                                }}
                                            >

                                                L
                                                {
                                                    income.level
                                                }

                                            </span>

                                        </p>

                                        <div
                                            style={{
                                                margin:
                                                    "15px 0"
                                            }}
                                        >

                                            <span
                                                style={{
                                                    background:
                                                        "#22c55e",
                                                    color:
                                                        "#fff",
                                                    padding:
                                                        "8px 15px",
                                                    borderRadius:
                                                        "20px",
                                                    fontWeight:
                                                        "bold"
                                                }}
                                            >

                                                +
                                                ₹
                                                {
                                                    income.incomeAmount
                                                }

                                            </span>

                                        </div>

                                        <p
                                            style={{
                                                color:
                                                    "#666"
                                            }}
                                        >

                                            {
                                                new Date(
                                                    income.createdAt
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

export default ReferralIncomeHistory;