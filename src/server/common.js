import apiClient from "./axios.js";
import { axiosInstance } from "../lib/axiosInstance";

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

export const getAllConsultatEnquiry = async () => {
  try {
    const res = await apiClient.get(`${process.env.NEXT_PUBLIC_BASE_URL}/consult/get-consults`);
    console.log("Consultation Enquiry Data", res.data);    
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
    const res = await apiClient.post(`/admin/login`, data);
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
    const res = await apiClient.post(`/coupon/add-single`, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getAllCoupons = async (data) => {
  try {
    const res = await apiClient.get(`/coupon/get-all`, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getRegisteredPatients = async (data) => {
  try{
    const res = await apiClient.get('/registered-patients', { params: data });
    return res.data;
  }catch(err){
    throw err;
  }
}

export const getRegisteredClinics = async(data) => {
  try {
    const res = await apiClient.get('/registered-clinics', { params: data });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const editClinic = async(clinicId, data) => {
  try {
    const res = await apiClient.put(`/clinic/${clinicId}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const deleteClinic = async(clinicId) => {
  try {
    const res = await apiClient.delete(`/clinic/${clinicId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const getBlogs = async(data) => {
  try {
    const res = await apiClient.get('/blogs/getAllBlogs', data);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const updateBlog = async(id, formData) => {
  try {
    const res = await axiosInstance.put(`/blogs/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const deleteBlog = async(id) => {
  try {
    const res = await axiosInstance.delete(`/blogs/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const getAllProfessionals = async(data) => {
  try {
    const res = await apiClient.get('/joinus/', data);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const getProfessionalById = async(id) => {
  try {
    const res = await apiClient.get(`/joinus/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const deleteProfessionalById = async(id) => {
  try {
    const res = await apiClient.delete(`/joinus/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}