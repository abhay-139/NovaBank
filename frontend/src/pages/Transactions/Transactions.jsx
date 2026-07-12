import DashboardLayout from "../../components/dashboard/DashboardLayout";

function Transactions() {
  return (
    <DashboardLayout>
      <div className="container-fluid">
        <div className="dashboard-card mt-2">
          <h1 className="h3 mb-2">Transaction History</h1>
          <p className="text-muted mb-0">
            Review your recent account activity and transaction records.
            Transaction history will be available here soon.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Transactions;
