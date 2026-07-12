import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { getMyAccount, withdraw } from "../../services/accountService";

function Withdraw() {
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

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

  const handleAmountChange = (event) => {
    const nextAmount = event.target.value;

    if (nextAmount === "" || /^\d*(\.\d{0,2})?$/.test(nextAmount)) {
      setAmount(nextAmount);
      setValidationMessage("");
    }
  };

  const handleWithdraw = async (event) => {
    event.preventDefault();

    const withdrawalAmount = Number(amount);

    if (!amount) {
      setValidationMessage("Withdrawal amount is required.");
      return;
    }

    if (!Number.isFinite(withdrawalAmount) || withdrawalAmount <= 0) {
      setValidationMessage("Withdrawal amount must be greater than 0.");
      return;
    }

    if (withdrawalAmount > account.balance) {
      setValidationMessage("Withdrawal amount cannot exceed your current balance.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await withdraw({
        accountNumber: account.accountNumber,
        amount: withdrawalAmount,
      });

      try {
        const refreshedAccount = await getMyAccount();
        setAccount(refreshedAccount);
        toast.success(response.message || "Amount withdrawn successfully.");
      } catch {
        toast.warning(
          `${response.message || "Withdrawal successful."} Your balance will refresh on the Dashboard.`
        );
      }

      setAmount("");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Unable to complete the withdrawal. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const formattedBalance = account
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
      }).format(account.balance)
    : "";

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
            <h1 className="h3 mb-2">Withdraw Funds</h1>
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
        <div className="row justify-content-center mt-2">
          <div className="col-12 col-lg-8 col-xl-6">
            <div className="dashboard-card">
              <h1 className="h3 mb-2">Withdraw Funds</h1>
              <p className="text-muted mb-4">
                Withdraw funds securely from your NovaBank account.
              </p>

              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <div className="border rounded-3 p-3 h-100">
                    <span className="text-muted d-block small">Current Balance</span>
                    <strong className="fs-5">{formattedBalance}</strong>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="border rounded-3 p-3 h-100">
                    <span className="text-muted d-block small">Account Status</span>
                    <strong className="fs-5">{account.accountStatus}</strong>
                  </div>
                </div>
              </div>

              <form onSubmit={handleWithdraw} noValidate>
                <Input
                  label="Account Number"
                  name="accountNumber"
                  value={account.accountNumber}
                  onChange={() => {}}
                  autoComplete="off"
                  readOnly
                />

                <Input
                  label="Withdrawal Amount"
                  type="number"
                  name="amount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={handleAmountChange}
                  autoComplete="off"
                  min="0.01"
                  step="0.01"
                  inputMode="decimal"
                  disabled={submitting}
                />

                {validationMessage && (
                  <p className="text-danger small mb-0">{validationMessage}</p>
                )}

                <Button
                  title={submitting ? "Withdrawing..." : "Withdraw"}
                  type="submit"
                  disabled={submitting}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Withdraw;
