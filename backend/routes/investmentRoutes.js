const express = require("express");
const {
    createInvestment,
    getMyInvestments,
    creditROI,
    getROIHistory,
    getReferralIncomeHistory
} = require("../controllers/investmentController");


const {
    protect
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/create",
    protect,
    createInvestment
);

router.get(
    "/my-investments",
    protect,
    getMyInvestments
);

router.post(
    "/credit-roi/:investmentId",
    protect,
    creditROI
);

router.get(
    "/roi-history",
    protect,
    getROIHistory
);

router.get(
    "/referral-income-history",
    protect,
    getReferralIncomeHistory
);


module.exports = router;