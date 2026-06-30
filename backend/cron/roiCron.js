const cron = require("node-cron");

const Investment = require("../models/Investment");
const User = require("../models/User");
const ROIHistory = require("../models/ROIHistory");

const {
    calculateDailyROI
} = require("../services/roiService");

const startROICron = () => {

    // Every day at midnight
    cron.schedule("0 0 * * *", async () => {

        console.log("ROI Cron Running...");

        try {

            const today = new Date();

            const investments =
                await Investment.find({
                    status: "Active"
                });

            for (const investment of investments) {

                // Investment expired
                if (today > investment.endDate) {

                    investment.status =
                        "Completed";

                    await investment.save();

                    continue;
                }

                const startOfDay =
                    new Date();

                startOfDay.setHours(
                    0,
                    0,
                    0,
                    0
                );

                const endOfDay =
                    new Date();

                endOfDay.setHours(
                    23,
                    59,
                    59,
                    999
                );

                const alreadyCredited =
                    await ROIHistory.findOne({
                        investment:
                            investment._id,
                        roiDate: {
                            $gte: startOfDay,
                            $lte: endOfDay
                        }
                    });

                if (alreadyCredited) {
                    continue;
                }

                const roiAmount =
                    calculateDailyROI(
                        investment
                    );

                await ROIHistory.create({
                    user:
                        investment.user,
                    investment:
                        investment._id,
                    roiAmount
                });

                await User.findByIdAndUpdate(
                    investment.user,
                    {
                        $inc: {
                            walletBalance:
                                roiAmount,
                            totalROI:
                                roiAmount
                        }
                    }
                );
            }

            console.log(
                "Daily ROI credited successfully"
            );

        } catch (error) {

            console.log(
                "Cron Error:",
                error.message
            );

        }

    });

};

module.exports = startROICron;