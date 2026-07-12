import api from "./api";

export const getAccountDetails = async (accountNumber) => {
  const response = await api.get(`/account/${accountNumber}`);
  return response.data;
};