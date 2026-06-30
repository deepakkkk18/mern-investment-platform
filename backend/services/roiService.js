const Investment = require("../models/Investment");

const calculateDailyROI = (investment) => {

    const roiAmount =
        (investment.investmentAmount *
            investment.dailyROI) / 100;

    return roiAmount;
};

module.exports = {
    calculateDailyROI
};