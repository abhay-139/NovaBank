import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getMyAccount } from "../../services/accountService";

const statusStyles = {
  ACTIVE: "bg-success-subtle text-success-emphasis",
  BLOCKED: "bg-warning-subtle text-warning-emphasis",
  CLOSED: "bg-secondary-subtle text-secondary-emphasis",
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-IN", {
    dateStyle: "long",
  }).format(new Date(date));

const maskAccountNumber = (accountNumber) => {
  if (accountNumber.length <= 4) {
    return accountNumber;
  }

  return `•••• •••• ${accountNumber.slice(-4)}`;
};

function Accounts() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    getMyAccount()
      .then((accountData) => {
        if (isActive) {
          setAccount(accountData);
        }
      })
      .catch((error) => {
        if (isActive) {
          toast.error(
            error.response?.data?.error ||
              "Unable to load your account details. Please try again."
          );
        }
      })
      .finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  const copyToClipboard = async (value, label) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${label} copied to clipboard.`);
    } catch {
      toast.error(`Unable to copy ${label.toLowerCase()}.`);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container-fluid">
          <div className="dashboard-card mt-2">
            <h1 className="h3 mb-0">Loading account details...</h1>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!account) {
    return (
      <DashboardLayout>
        <div className="container-fluid">
          <div className="dashboard-card mt-2">
            <h1 className="h3 mb-2">My Accounts</h1>
            <p className="text-muted mb-0">
              Your account details are currently unavailable. Please try again later.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container-fluid">
        <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mt-2 mb-4">
          <div>
            <h1 className="h3 mb-1">My Account</h1>
            <p className="text-muted mb-0">
              View your NovaBank account information at a glance.
            </p>
          </div>
          <span className="text-muted small align-self-md-center">
            {account.accountType} account
          </span>
        </div>

        <div className="dashboard-card mb-4">
          <div className="row g-4 align-items-center">
            <div className="col-lg-5">
              <span className="text-muted d-block small mb-1">Current Balance</span>
              <strong className="display-6">{formatCurrency(account.balance)}</strong>
            </div>

            <div className="col-lg-7">
              <span className="text-muted d-block small mb-1">Account Number</span>
              <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-2">
                <strong className="fs-4 text-nowrap">
                  {maskAccountNumber(account.accountNumber)}
                </strong>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm align-self-start"
                  onClick={() => copyToClipboard(account.accountNumber, "Account number")}
                >
                  Copy Account Number
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2 className="h4 mb-4">Account Details</h2>

          <div className="row g-4">
            <div className="col-md-6">
              <span className="text-muted d-block small mb-1">IFSC Code</span>
              <div className="d-flex align-items-center gap-2">
                <strong>{account.ifscCode}</strong>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => copyToClipboard(account.ifscCode, "IFSC code")}
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="col-md-6">
              <span className="text-muted d-block small mb-1">Account Type</span>
              <strong>{account.accountType}</strong>
            </div>

            <div className="col-md-6">
              <span className="text-muted d-block small mb-1">Account Status</span>
              <span
                className={`badge rounded-pill ${
                  statusStyles[account.accountStatus] || "bg-secondary"
                }`}
              >
                {account.accountStatus}
              </span>
            </div>

            {account.createdAt && (
              <div className="col-md-6">
                <span className="text-muted d-block small mb-1">Account Creation Date</span>
                <strong>{formatDate(account.createdAt)}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Accounts;
