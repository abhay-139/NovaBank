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
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    { icon: <FaHome />, label: "Dashboard" },
    { icon: <FaUniversity />, label: "Accounts" },
    { icon: <FaArrowDown />, label: "Deposit" },
    { icon: <FaArrowUp />, label: "Withdraw" },
    { icon: <FaExchangeAlt />, label: "Transfer" },
    { icon: <FaHistory />, label: "Transactions" },
    { icon: <FaUser />, label: "Profile" },
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
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`sidebar-item ${
              index === 0 ? "active-sidebar" : ""
            }`}
          >
            <span className="sidebar-icon">
              {item.icon}
            </span>

            <span>
              {item.label}
            </span>
          </div>
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