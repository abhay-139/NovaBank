import { FaBell, FaUserCircle } from "react-icons/fa";

function Topbar() {
  return (
    <div
      style={{
        height: "75px",
        background: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 35px",
        boxShadow: "0 4px 15px rgba(0,0,0,.05)",
      }}
    >
      <h4
        style={{
          margin: 0,
          color: "#0F172A",
          fontWeight: "700",
        }}
      >
        Dashboard
      </h4>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "25px",
          fontSize: "24px",
          color: "#2563EB",
        }}
      >
        <FaBell />
        <FaUserCircle />
      </div>
    </div>
  );
}

export default Topbar;