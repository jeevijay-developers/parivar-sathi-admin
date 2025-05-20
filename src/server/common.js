import apiClient from "./axios";

// const query = process.env.NEXT_PUBLIC_API_URL_LOCAL;

export const getAllTodaysOPDCamps = async () => {
  try {
    const res = await apiClient.get(`${process.env.NEXT_PUBLIC_BASE_URL}/opds/todays-opdcamps`);
    console.log("Todays data", res.data);
    
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getAllNextOPDs = async () => {
  try {
    const res = await apiClient.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/opds/opdcamps/next`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
export const getAllPreviousOPDCamps = async () => {
  try {
    const res = await apiClient.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/opds/opdcamps/previous-all`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getUserLoggedIn = async (data) => {
  try {
    const res = await apiClient.post(`/api/auth/login`, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// export const uploadBulkCoupon = async (data) => {
//   try {
//     const res = await apiClient.post(`/api/coupon/bulk`, data);
//     return res.data;
//   } catch (err) {
//     throw err;
//   }
// };
export const uploadSingleCoupon = async (data) => {
  try {
    const res = await apiClient.post(`/api/coupon/add-single`, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};
export const getAllCoupons = async (data) => {
  try {
    const res = await apiClient.get(`/api/coupon/get-all`, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};
