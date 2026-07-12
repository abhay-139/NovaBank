import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { getMyAccount, transfer } from "../../services/accountService";

function Transfer() {
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [recipientAccountNumber, setRecipientAccountNumber] = useState("");
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

  const handleRecipientChange = (event) => {
    setRecipientAccountNumber(event.target.value);
    setValidationMessage("");
  };

  const handleAmountChange = (event) => {
    const nextAmount = event.target.value;

    if (nextAmount === "" || /^\d*(\.\d{0,2})?$/.test(nextAmount)) {
      setAmount(nextAmount);
      setValidationMessage("");
    }
  };

  const handleTransfer = async (event) => {
    event.preventDefault();

    const recipient = recipientAccountNumber.trim();
    const transferAmount = Number(amount);

    if (!recipient) {
      setValidationMessage("Recipient account number is required.");
      return;
    }

    if (recipient === account.accountNumber) {
      setValidationMessage("You cannot transfer money to your own account.");
      return;
    }

    if (!amount) {
      setValidationMessage("Transfer amount is required.");
      return;
    }

    if (!Number.isFinite(transferAmount) || transferAmount <= 0) {
      setValidationMessage("Transfer amount must be greater than 0.");
      return;
    }

    if (transferAmount > account.balance) {
      setValidationMessage("Transfer amount cannot exceed your current balance.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await transfer({
        fromAccountNumber: account.accountNumber,
        toAccountNumber: recipient,
        amount: transferAmount,
      });

      try {
        const refreshedAccount = await getMyAccount();
        setAccount(refreshedAccount);
        toast.success(response.message || "Money transferred successfully.");
      } catch {
        toast.warning(
          `${response.message || "Transfer successful."} Your balance will refresh on the Dashboard.`
        );
      }

      setRecipientAccountNumber("");
      setAmount("");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Unable to complete the transfer. Please try again."
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
            <h1 className="h3 mb-2">Transfer Money</h1>
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
              <h1 className="h3 mb-2">Transfer Money</h1>
              <p className="text-muted mb-4">
                Send money securely between NovaBank accounts.
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

              <form onSubmit={handleTransfer} noValidate>
                <Input
                  label="From Account"
                  name="fromAccountNumber"
                  value={account.accountNumber}
                  onChange={() => {}}
                  autoComplete="off"
                  readOnly
                />

                <Input
                  label="Recipient Account Number"
                  name="toAccountNumber"
                  placeholder="Enter recipient account number"
                  value={recipientAccountNumber}
                  onChange={handleRecipientChange}
                  autoComplete="off"
                  disabled={submitting}
                />

                <Input
                  label="Transfer Amount"
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
                  title={submitting ? "Transferring..." : "Transfer Money"}
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

export default Transfer;
