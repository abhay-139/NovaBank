import api from "./api";

export const getAccountDetails = async (accountNumber) => {
  const response = await api.get(`/account/${accountNumber}`);
  return response.data;
};

export const getMyAccount = async () => {
  const response = await api.get("/account/me");
  return response.data;
};
