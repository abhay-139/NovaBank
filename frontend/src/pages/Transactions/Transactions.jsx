import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import TransactionTable from "../../components/dashboard/TransactionTable";
import {
  getMyAccount,
  getTransactionHistory,
} from "../../services/accountService";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    getMyAccount()
      .then((account) => getTransactionHistory(account.accountNumber))
      .then((transactionData) => {
        if (isActive) {
          setTransactions(transactionData);
        }
      })
      .catch((error) => {
        if (isActive) {
          toast.error(
            error.response?.data?.error ||
              "Unable to load transaction history. Please try again."
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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container-fluid">
          <div className="dashboard-card mt-2">
            <h1 className="h3 mb-0">Loading transaction history...</h1>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container-fluid">
        <div className="dashboard-card mt-2">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mb-4">
            <div>
              <h1 className="h3 mb-1">Transaction History</h1>
              <p className="text-muted mb-0">
                Review your recent NovaBank account activity.
              </p>
            </div>
            <span className="text-muted small align-self-md-center">
              {transactions.length} transaction{transactions.length === 1 ? "" : "s"}
            </span>
          </div>

          {transactions.length === 0 ? (
            <div className="border rounded-3 p-4 text-center">
              <h2 className="h5 mb-2">No transactions yet</h2>
              <p className="text-muted mb-0">
                Your deposit, withdrawal, and transfer activity will appear here.
              </p>
            </div>
          ) : (
            <TransactionTable transactions={transactions} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Transactions;
