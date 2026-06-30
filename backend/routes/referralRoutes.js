const express = require("express");

const {
    getMyReferralIncome,
    getDirectReferrals,
    getReferralTree
} = require("../controllers/referralController");

const {
    protect
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
    "/my-income",
    protect,
    getMyReferralIncome
);

router.get(
    "/direct-referrals",
    protect,
    getDirectReferrals
);

router.get(
    "/referral-tree",
    protect,
    getReferralTree
);

module.exports = router;