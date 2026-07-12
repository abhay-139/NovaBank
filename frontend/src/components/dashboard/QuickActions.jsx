import {
  FaArrowDown,
  FaArrowUp,
  FaExchangeAlt,
  FaHistory,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "Deposit",
    description: "Add funds to your account",
    icon: FaArrowDown,
    path: "/deposit",
  },
  {
    title: "Withdraw",
    description: "Access your available balance",
    icon: FaArrowUp,
    path: "/withdraw",
  },
  {
    title: "Transfer",
    description: "Send money securely",
    icon: FaExchangeAlt,
    path: "/transfer",
  },
  {
    title: "Transactions",
    description: "Review account activity",
    icon: FaHistory,
    path: "/transactions",
  },
];

function QuickActions() {
  const navigate = useNavigate();

  return (
    <section className="quick-actions-section mt-5" aria-labelledby="quick-actions-title">
      <div className="mb-4">
        <h2 id="quick-actions-title" className="h4 mb-1">Quick Actions</h2>
        <p className="text-muted mb-0">
          Manage your everyday banking in one place.
        </p>
      </div>

      <div className="row g-4">
        {actions.map(({ title, description, icon: Icon, path }) => (
          <div className="col-12 col-sm-6 col-xl-3" key={title}>
            <button
              type="button"
              className="dashboard-card quick-action-card w-100 text-start"
              onClick={() => navigate(path)}
            >
              <span className="quick-action-icon">
                <Icon aria-hidden="true" />
              </span>
              <span className="d-block mt-4 fw-semibold">{title}</span>
              <span className="quick-action-description d-block mt-1">
                {description}
              </span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;
