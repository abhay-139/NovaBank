import DashboardLayout from "../../components/dashboard/DashboardLayout";

function Deposit() {
  return (
    <DashboardLayout>
      <div className="container-fluid">
        <div className="dashboard-card mt-2">
          <h1 className="h3 mb-2">Deposit Funds</h1>
          <p className="text-muted mb-0">
            Add money to your NovaBank account securely. Deposit functionality
            will be available here soon.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Deposit;
