import { useEffect, useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

function Dashboard() {

    const [dashboard, setDashboard] =
        useState(null);

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const response =
                await API.get(
                    "/dashboard"
                );

            setDashboard(
                response.data.dashboard
            );

        } catch (error) {

            console.log(error);

            alert(
                "Failed to load dashboard"
            );

        }
    };

    if (!dashboard) {

        return <Loader />;
    }

    const chartData = [
        {
            name: "Wallet",
            value:
                dashboard.walletBalance || 0
        },
        {
            name: "ROI",
            value:
                dashboard.totalROI || 0
        },
        {
            name: "Referral",
            value:
                dashboard.totalLevelIncome || 0
        }
    ];

    return (

        <>
            <Navbar />

            <div
                style={{
                    width: "95%",
                    maxWidth: "1400px",
                    margin: "20px auto"
                }}
            >

                <h1
                    style={{
                        textAlign: "center",
                        marginBottom: "30px",
                        fontSize:
                            "clamp(28px,5vw,50px)"
                    }}
                >
                    Investment Dashboard
                </h1>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(250px,1fr))",
                        gap: "20px"
                    }}
                >

                    <DashboardCard
                        title="💰 Wallet Balance"
                        value={`₹${dashboard.walletBalance}`}
                    />

                    <DashboardCard
                        title="📈 Total ROI"
                        value={`₹${dashboard.totalROI}`}
                    />

                    <DashboardCard
                        title="🤝 Referral Income"
                        value={`₹${dashboard.totalLevelIncome}`}
                    />

                    <DashboardCard
                        title="🔥 Active Investments"
                        value={
                            dashboard.activeInvestments
                        }
                    />

                    <DashboardCard
                        title="📦 Total Investments"
                        value={
                            dashboard.totalInvestments
                        }
                    />

                    <DashboardCard
                        title="🎯 Referral Code"
                        value={
                            dashboard.referralCode
                        }
                    />

                </div>

                <div
                    style={{
                        marginTop: "40px",
                        background: "#fff",
                        borderRadius: "20px",
                        padding: "20px",
                        boxShadow:
                            "0 10px 30px rgba(0,0,0,.15)"
                    }}
                >

                    <h2
                        style={{
                            textAlign: "center",
                            marginBottom: "30px"
                        }}
                    >
                        Earnings Overview
                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={400}
                    >

                        <BarChart
                            data={chartData}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="name"
                            />

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="value"
                                fill="#6366f1"
                                radius={[
                                    10,
                                    10,
                                    0,
                                    0
                                ]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </>

    );
}

function DashboardCard({
    title,
    value
}) {

    return (

        <div
            style={{
                background:
                    "linear-gradient(135deg,#2563eb,#7c3aed)",
                color: "#fff",
                padding: "25px",
                borderRadius: "20px",
                boxShadow:
                    "0 10px 20px rgba(0,0,0,.15)",
                transition: "0.3s"
            }}
        >

            <h3
                style={{
                    marginBottom: "15px",
                    fontSize: "18px"
                }}
            >
                {title}
            </h3>

            <h2
                style={{
                    margin: 0,
                    fontSize: "32px",
                    wordBreak: "break-word"
                }}
            >
                {value}
            </h2>

        </div>

    );
}

export default Dashboard;