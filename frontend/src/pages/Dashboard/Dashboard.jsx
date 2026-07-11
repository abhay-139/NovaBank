import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/userService";
import Navbar from "../../components/common/Navbar";

function Dashboard() {

  const [user, setUser] = useState(null);

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
  <>
    <Navbar />

    <div className="container mt-5">

      <h1 className="mb-4">
        Welcome, {user.fullName}
      </h1>

      <div className="card p-4 shadow">

        <h4>User Information</h4>

        <p>
          <strong>ID:</strong> {user.id}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Role:</strong> {user.role}
        </p>

      </div>

    </div>
    </>
  );
}

export default Dashboard;