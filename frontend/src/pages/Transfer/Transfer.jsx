import DashboardLayout from "../../components/dashboard/DashboardLayout";

function Transfer() {
  return (
    <DashboardLayout>
      <div className="container-fluid">
        <div className="dashboard-card mt-2">
          <h1 className="h3 mb-2">Transfer Money</h1>
          <p className="text-muted mb-0">
            Send money between NovaBank accounts from one secure place. Transfer
            functionality will be available here soon.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Transfer;
