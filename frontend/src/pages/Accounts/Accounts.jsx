import DashboardLayout from "../../components/dashboard/DashboardLayout";

function Accounts() {
  return (
    <DashboardLayout>
      <div className="container-fluid">
        <div className="dashboard-card mt-2">
          <h1 className="h3 mb-2">My Accounts</h1>
          <p className="text-muted mb-0">
            View and manage your NovaBank accounts in one secure place. Account
            management will be available here soon.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Accounts;
