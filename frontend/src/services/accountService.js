import api from "./api";

export const getAccountDetails = async (accountNumber) => {
  const response = await api.get(`/account/${accountNumber}`);
  return response.data;
};

export const getMyAccount = async () => {
  const response = await api.get("/account/me");
  return response.data;
};

export const deposit = async ({ accountNumber, amount }) => {
  const response = await api.post("/account/deposit", {
    accountNumber,
    amount,
  });

  return response.data;
};

export const withdraw = async ({ accountNumber, amount }) => {
  const response = await api.post("/account/withdraw", {
    accountNumber,
    amount,
  });

  return response.data;
};
