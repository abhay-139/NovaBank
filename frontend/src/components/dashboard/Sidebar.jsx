import {
  FaHome,
  FaUniversity,
  FaArrowDown,
  FaArrowUp,
  FaExchangeAlt,
  FaHistory,
  FaUser,
  FaSignOutAlt,
} 
from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    { icon: <FaHome />, label: "Dashboard", path: "/dashboard" },
    { icon: <FaUniversity />, label: "Accounts", path: "/accounts" },
    { icon: <FaArrowDown />, label: "Deposit", path: "/deposit" },
    { icon: <FaArrowUp />, label: "Withdraw", path: "/withdraw" },
    { icon: <FaExchangeAlt />, label: "Transfer", path: "/transfer" },
    { icon: <FaHistory />, label: "Transactions", path: "/transactions" },
    { icon: <FaUser />, label: "Profile", path: "/profile" },
  ];
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};

  return (
    <div className="sidebar">

      <div className="sidebar-logo">
        🏦 NovaBank
      </div>

      <div className="sidebar-menu">
        {menuItems.map((item) => (
          item.path ? (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? "active-sidebar" : ""}`
              }
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ) : (
            <div key={item.label} className="sidebar-item">
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          )
        ))}
      </div>

      <button
  className="logout-btn"
  onClick={handleLogout}
>
  <FaSignOutAlt />
  <span className="ms-2">
    Logout
  </span>
</button>
    </div>
  );
}

export default Sidebar;
