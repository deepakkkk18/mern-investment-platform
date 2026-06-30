const mongoose = require("mongoose");

const roiHistorySchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    investment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Investment",
        required: true
    },

    roiAmount: {
        type: Number,
        required: true
    },

    roiDate: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        enum: ["Credited", "Pending"],
        default: "Credited"
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("ROIHistory", roiHistorySchema);