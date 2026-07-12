import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCurrentUser } from "../../services/userService";
import { getMyAccount } from "../../services/accountService";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import SummaryCard from "../../components/dashboard/SummaryCard";
import QuickActions from "../../components/dashboard/QuickActions";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    Promise.all([getCurrentUser(), getMyAccount()])
      .then(([userData, accountData]) => {
        if (isActive) {
          setUser(userData);
          setAccount(accountData);
        }
      })
      .catch((error) => {
        if (isActive) {
          toast.error(
            error.response?.data?.error || "Unable to load dashboard details."
          );
        }
      })
      .finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  if (loading) {
    return (
      <h2 className="text-center mt-5">
        Loading...
      </h2>
    );
  }

  if (!user || !account) {
    return null;
  }

  const formattedBalance = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(account.balance);

  return (
    <DashboardLayout>
      <div className="container mt-5">
        <h1 className="mb-4">
          Welcome, {user.fullName}
        </h1>
      </div>

      <div className="summary-grid">
        <SummaryCard
          type="balance"
          title="Current Balance"
          value={formattedBalance}
        />

        <SummaryCard
          type="account"
          title="Account Number"
          value={account.accountNumber}
        />

        <SummaryCard
          type="status"
          title="Status"
          value={account.accountStatus}
        />
      </div>

      <QuickActions />
    </DashboardLayout>
  );
}

export default Dashboard;
