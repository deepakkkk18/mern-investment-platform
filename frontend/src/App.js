import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateInvestment from "./pages/CreateInvestment";
import MyInvestments from "./pages/MyInvestments";
import ROIHistory from "./pages/ROIHistory";
import ReferralIncomeHistory from "./pages/ReferralIncomeHistory";
import DirectReferrals from "./pages/DirectReferrals";
import ReferralTree from "./pages/ReferralTree";
import PrivateRoute from "./components/PrivateRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/create-investment"
          element={
            <PrivateRoute>
              <CreateInvestment />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-investments"
          element={
            <PrivateRoute>
              <MyInvestments />
            </PrivateRoute>
          }
        />

        <Route
          path="/roi-history"
          element={
            <PrivateRoute>
              <ROIHistory />
            </PrivateRoute>
          }
        />

        <Route
          path="/referral-income-history"
          element={
            <PrivateRoute>
              <ReferralIncomeHistory />
            </PrivateRoute>
          }
        />

        <Route
          path="/direct-referrals"
          element={
            <PrivateRoute>
              <DirectReferrals />
            </PrivateRoute>
          }
        />

        <Route
          path="/referral-tree"
          element={
            <PrivateRoute>
              <ReferralTree />
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;