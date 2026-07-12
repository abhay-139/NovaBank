import DashboardLayout from "../../components/dashboard/DashboardLayout";

function Withdraw() {
  return (
    <DashboardLayout>
      <div className="container-fluid">
        <div className="dashboard-card mt-2">
          <h1 className="h3 mb-2">Withdraw Funds</h1>
          <p className="text-muted mb-0">
            Review and manage withdrawals from your NovaBank account. Withdrawal
            functionality will be available here soon.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Withdraw;
