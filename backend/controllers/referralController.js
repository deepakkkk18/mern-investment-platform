const ReferralIncome = require("../models/ReferralIncome");
const User = require("../models/User");

const getMyReferralIncome = async (req, res) => {
    try {

        const referralIncome = await ReferralIncome
            .find({
                receiverUser: req.user.id
            })
            .populate(
                "sourceUser",
                "fullName email mobile"
            )
            .sort({
                createdAt: -1
            });

        const totalIncome = referralIncome.reduce(
            (sum, item) => sum + item.incomeAmount,
            0
        );

        res.status(200).json({
            success: true,
            count: referralIncome.length,
            totalIncome,
            referralIncome
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getDirectReferrals = async (req, res) => {
    try {

        const referrals = await User.find({
            referredBy: req.user.id
        }).select(
            "fullName email mobile referralCode createdAt"
        );

        res.status(200).json({
            success: true,
            count: referrals.length,
            referrals
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const buildReferralTree = async (userId) => {

    const referrals = await User.find({
        referredBy: userId
    }).select(
        "fullName email mobile referralCode"
    );

    const tree = [];

    for (const referral of referrals) {

        tree.push({
            _id: referral._id,
            fullName: referral.fullName,
            email: referral.email,
            mobile: referral.mobile,
            referralCode: referral.referralCode,
            children: await buildReferralTree(
                referral._id
            )
        });

    }

    return tree;
};

const getReferralTree = async (req, res) => {
    try {

        const tree = await buildReferralTree(
            req.user.id
        );

        res.status(200).json({
            success: true,
            referralTree: tree
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


module.exports = {
    getMyReferralIncome,
    getDirectReferrals,
    getReferralTree
};