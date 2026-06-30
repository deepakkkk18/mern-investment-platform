const User = require("../models/User");
const Investment = require("../models/Investment");

const getDashboard = async (req, res) => {
    try {

        const user = await User.findById(req.user.id);

        const totalInvestments =
            await Investment.countDocuments({
                user: req.user.id
            });

        const activeInvestments =
            await Investment.countDocuments({
                user: req.user.id,
                status: "Active"
            });

        res.status(200).json({
            success: true,

            dashboard: {
                walletBalance:
                    user.walletBalance,

                totalROI:
                    user.totalROI,

                totalLevelIncome:
                    user.totalLevelIncome,

                totalInvestments,

                activeInvestments,

                referralCode:
                    user.referralCode
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    getDashboard
};