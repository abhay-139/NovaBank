import DashboardLayout from "../../components/dashboard/DashboardLayout";

function Profile() {
  return (
    <DashboardLayout>
      <div className="container-fluid">
        <div className="dashboard-card mt-2">
          <h1 className="h3 mb-2">My Profile</h1>
          <p className="text-muted mb-0">
            Review and manage your NovaBank profile details. Profile management
            will be available here soon.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;
