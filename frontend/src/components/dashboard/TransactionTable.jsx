const transactionStyles = {
  DEPOSIT: "bg-success-subtle text-success-emphasis",
  WITHDRAW: "bg-danger-subtle text-danger-emphasis",
  TRANSFER: "bg-primary-subtle text-primary-emphasis",
};

const formatCurrency = (amount) => {
  if (amount == null) return "₹0.00";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatDateTime = (dateTime) => {
  if (!dateTime) return "-";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateTime));
};

const formatType = (type) => {
  if (!type) return "Unknown";

  return type.charAt(0) + type.slice(1).toLowerCase();
};

function TransactionTable({ transactions }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th scope="col">Transaction ID</th>
            <th scope="col">Date &amp; Time</th>
            <th scope="col">Type</th>
            <th scope="col">Description</th>
            <th scope="col" className="text-end">Amount</th>
            <th scope="col" className="text-end">Balance After Transaction</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.transactionId}>
              <td className="fw-semibold text-nowrap">{transaction.transactionId}</td>
              <td className="text-nowrap">{formatDateTime(transaction.transactionDate)}</td>
              <td>
                <span
                  className={`badge rounded-pill ${
                    transactionStyles[transaction.transactionType] || "bg-secondary"
                  }`}
                >
                  {formatType(transaction.transactionType)}
                </span>
              </td>
              <td>{transaction.description}</td>
              <td className="text-end text-nowrap fw-semibold">
                {formatCurrency(transaction.amount)}
              </td>
              <td className="text-end text-nowrap">
                {formatCurrency(transaction.balanceAfterTransaction)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
