import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/userService";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import SummaryCard from "../../components/dashboard/SummaryCard";

function Dashboard() {

  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const data = await getCurrentUser();
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return (
      <h2 className="text-center mt-5">
        Loading...
      </h2>
    );
  }

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
    value="₹3,500"
  />

  <SummaryCard
    type="account"
    title="Account Number"
    value="1001004054"
  />

  <SummaryCard
    type="status"
    title="Status"
    value="ACTIVE"
  />

  <SummaryCard
    type="transactions"
    title="Transactions"
    value="15"
  />

</div>

  </DashboardLayout>
);
}

export default Dashboard;