
const User = require("../models/User");
const ROIHistory = require("../models/ROIHistory");

const {
    calculateDailyROI
} = require("../services/roiService");
const ReferralIncome =
require("../models/ReferralIncome");
const Investment = require("../models/Investment");


const createInvestment = async (req, res) => {
    try {

        const {
            investmentAmount,
            planName,
            endDate,
            dailyROI
        } = req.body;

        const investment = await Investment.create({
            user: req.user.id,
            investmentAmount,
            planName,
            endDate,
            dailyROI
        });

const currentUser = await User.findById(req.user.id);

const LEVEL_PERCENTAGES = {
    1: 5,
    2: 3,
    3: 2
};

let parentUserId = currentUser.referredBy;
let level = 1;

while (
    parentUserId &&
    LEVEL_PERCENTAGES[level]
) {

    const parentUser =
        await User.findById(parentUserId);

    if (!parentUser) {
        break;
    }

    const referralIncome =
        (investmentAmount *
            LEVEL_PERCENTAGES[level]) / 100;

    await ReferralIncome.create({
        receiverUser: parentUser._id,
        sourceUser: currentUser._id,
        level,
        incomeAmount: referralIncome
    });

    await User.findByIdAndUpdate(
        parentUser._id,
        {
            $inc: {
                walletBalance:
                    referralIncome,
                totalLevelIncome:
                    referralIncome
            }
        }
    );

    parentUserId =
        parentUser.referredBy;

    level++;
}

        res.status(201).json({
            success: true,
            message: "Investment Created Successfully",
            investment
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const getMyInvestments = async (req, res) => {
    try {

        const investments = await Investment
            .find({
                user: req.user.id
            })
            .sort({
                createdAt: -1
            });

        res.status(200).json({
            success: true,
            count: investments.length,
            investments
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const creditROI = async (req, res) => {

    try {

        const { investmentId } = req.params;

        const investment = await Investment.findById(
            investmentId
        );

        if (!investment) {
            return res.status(404).json({
                success: false,
                message: "Investment not found"
            });
        }

        const roiAmount =
            calculateDailyROI(investment);

        await ROIHistory.create({
            user: investment.user,
            investment: investment._id,
            roiAmount
        });

        await User.findByIdAndUpdate(
            investment.user,
            {
                $inc: {
                    totalROI: roiAmount,
                    walletBalance: roiAmount
                }
            }
        );

        res.status(200).json({
            success: true,
            message: "ROI Credited Successfully",
            roiAmount
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getROIHistory = async (req, res) => {

    try {

        const history =
            await ROIHistory
                .find({
                    user: req.user.id
                })
                .populate(
                    "investment",
                    "planName investmentAmount"
                )
                .sort({
                    createdAt: -1
                });

        res.status(200).json({
            success: true,
            count: history.length,
            history
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getReferralIncomeHistory =
async (req, res) => {

    try {

        const incomes =
            await ReferralIncome
                .find({
                    receiverUser:
                        req.user.id
                })
                .populate(
                    "sourceUser",
                    "fullName email"
                )
                .sort({
                    createdAt: -1
                });

        res.status(200).json({
            success: true,
            count: incomes.length,
            incomes
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


module.exports = {
    createInvestment,
    getMyInvestments,
    creditROI,
    getROIHistory,
    getReferralIncomeHistory
};