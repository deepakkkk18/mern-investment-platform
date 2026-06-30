import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function CreateInvestment() {

    const navigate = useNavigate();

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({
            investmentAmount: "",
            planName: "",
            endDate: "",
            dailyROI: ""
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
                "/investments/create",
                formData
            );

            alert(
                "Investment Created Successfully"
            );

            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Investment Creation Failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <>
            <Navbar />

            <div
                style={{
                    width: "95%",
                    maxWidth: "550px",
                    margin: "50px auto",
                    background: "#fff",
                    padding: "30px",
                    borderRadius: "20px",
                    boxShadow:
                        "0 10px 25px rgba(0,0,0,.1)"
                }}
            >

            <h1
                style={{
                    textAlign: "center",
                    marginBottom: "30px"
                }}
            >
                Create Investment
            </h1>

            <form
                onSubmit={handleSubmit}
            >

                <input
                    type="number"
                    name="investmentAmount"
                    placeholder="Investment Amount"
                    value={
                        formData.investmentAmount
                    }
                    onChange={
                        handleChange
                    }
                    style={inputStyle}
                />

                <input
                    type="text"
                    name="planName"
                    placeholder="Plan Name"
                    value={
                        formData.planName
                    }
                    onChange={
                        handleChange
                    }
                    style={inputStyle}
                />

                <input
                    type="date"
                    name="endDate"
                    value={
                        formData.endDate
                    }
                    onChange={
                        handleChange
                    }
                    style={inputStyle}
                />

                <input
                    type="number"
                    name="dailyROI"
                    placeholder="Daily ROI %"
                    value={
                        formData.dailyROI
                    }
                    onChange={
                        handleChange
                    }
                    style={inputStyle}
                />

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "15px",
                        background:
                            "linear-gradient(135deg,#2563eb,#7c3aed)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "12px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold"
                    }}
                >

                    {
                        loading
                            ? "Creating..."
                            : "Create Investment"
                    }

                </button>

            </form>

            </div>

        </>

    );
}

const inputStyle = {

    width: "100%",

    padding: "15px",

    marginBottom: "15px",

    border:
        "1px solid #ddd",

    borderRadius: "10px",

    boxSizing:
        "border-box",

    fontSize: "16px"

};

export default CreateInvestment;