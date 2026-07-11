import {
  FaWallet,
  FaUniversity,
  FaCheckCircle,
  FaHistory,
} from "react-icons/fa";

function SummaryCard({ type, title, value }) {
  const icons = {
    balance: <FaWallet size={28} />,
    account: <FaUniversity size={28} />,
    status: <FaCheckCircle size={28} />,
    transactions: <FaHistory size={28} />,
  };

  return (
    <div className="dashboard-card">

      <div
        className="d-flex justify-content-between align-items-center"
      >
        <div>

          <div className="card-title">
            {title}
          </div>

          <div className="card-value mt-2">
            {value}
          </div>

        </div>

        <div
          style={{
            color: "#2563EB",
          }}
        >
          {icons[type]}
        </div>

      </div>

    </div>
  );
}

export default SummaryCard;