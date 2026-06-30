import { useEffect, useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

function ROIHistory() {

    const [history, setHistory] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchHistory();

    }, []);

    const fetchHistory = async () => {

        try {

            const response =
                await API.get(
                    "/investments/roi-history"
                );

            setHistory(
                response.data.history
            );

        } catch (error) {

            console.log(error);

            alert(
                "Failed to load ROI History"
            );

        } finally {

            setLoading(false);

        }
    };

    const totalROI =
        history.reduce(
            (sum, item) =>
                sum + item.roiAmount,
            0
        );

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
                ROI History
            </h1>

            {/* SUMMARY CARDS */}

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

                    <h3>Total ROI Earned</h3>

                    <h1>
                        ₹{totalROI}
                    </h1>

                </div>

                <div style={cardStyle}>

                    <h3>Total Records</h3>

                    <h1>
                        {history.length}
                    </h1>

                </div>

            </div>

            {/* ROI CARDS */}

            {
                history.length === 0 ? (

                    <div
                        style={{
                            textAlign: "center",
                            background: "#fff",
                            padding: "40px",
                            borderRadius: "15px",
                            boxShadow:
                                "0 5px 15px rgba(0,0,0,0.1)"
                        }}
                    >

                        <h2>
                            No ROI History Found
                        </h2>

                        <p>
                            ROI will appear after
                            cron job credits ROI.
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
                            history.map(
                                (item) => (

                                    <div
                                        key={
                                            item._id
                                        }
                                        style={{
                                            background:
                                                "#fff",
                                            borderRadius:
                                                "15px",
                                            padding:
                                                "20px",
                                            boxShadow:
                                                "0 5px 15px rgba(0,0,0,0.12)"
                                        }}
                                    >

                                        <h2
                                            style={{
                                                marginBottom:
                                                    "10px"
                                            }}
                                        >
                                            {
                                                item
                                                .investment
                                                ?.planName
                                            }
                                        </h2>

                                        <p>

                                            <strong>
                                                Investment :
                                            </strong>

                                            {" "}
                                            ₹
                                            {
                                                item
                                                .investment
                                                ?.investmentAmount
                                            }

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
                                                        "25px",
                                                    fontWeight:
                                                        "bold"
                                                }}
                                            >

                                                ROI +
                                                ₹
                                                {
                                                    item.roiAmount
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
                                                    item.createdAt
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

    boxShadow:
        "0 5px 15px rgba(0,0,0,0.2)",

    textAlign: "center"

};

export default ROIHistory;