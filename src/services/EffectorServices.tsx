import axios from "axios";

const apiDP = process.env.REACT_APP_DP!;

export const getEffectorList = async (params: any) => {
  try {
    const res = await axios.get(apiDP + "effectors", { params });
    return res.data.data;
  } catch (err) {
    console.error(err);
  }
};

export const getEffectorCategory = async () => {
  try {
    const res = await axios.get(apiDP + "effector-categories");
    return res.data.data;
  } catch (e) {
    console.error(e);
  }
};

export const postCreateEffector = async (data: any) => {
  try {
    const response = await axios.post(apiDP + "create-effector", data);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const getDetailEffector = async (id: string) => {
  try {
    const response = await axios.get(apiDP + `effectors/${id}`);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const deleteEffectorById = async (id: string) => {
  try {
    const response = await axios.delete(apiDP + `delete-effector/${id}`);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const deleteSelectedEffector = async (data: any) => {
  try {
    const response = await axios.post(apiDP + "delete-effectors", data);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const updateEffector = async (id: string, data: any) => {
  try {
    const response = await axios.put(apiDP + `update-effector/${id}`, data);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
