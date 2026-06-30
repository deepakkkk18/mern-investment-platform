const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const investmentRoutes = require("./routes/investmentRoutes");
const referralRoutes =
require("./routes/referralRoutes");
const dashboardRoutes =
require("./routes/dashboardRoutes");
const startROICron = require("./cron/roiCron");

dotenv.config();

connectDB();

startROICron();


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/investments", investmentRoutes);
app.use(
    "/api/referrals",
    referralRoutes
);

app.use(
    "/api/dashboard",
    dashboardRoutes
);

app.get("/", (req, res) => {
  res.send("Investment Platform API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});