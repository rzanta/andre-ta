import axios from "axios";

const list = async (params: any) => {
  const { data } = await axios.get("http://localhost:9000/api/v1/dp/sensors", {
    params,
  });
  return data;
};

const getCategorySensor = async () => {
  try {
    const response = await axios.get(
      "http://localhost:9000/api/v1/dp/sensor-categories"
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const getSensorById = async (id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:9000/api/v1/dp/sensors/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const createSensor = async (data: any) => {
  try {
    const response = await axios.post(
      "http://localhost:9000/api/v1/dp/create-sensor",
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteSensorById = async (id: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:9000/api/v1/dp/delete-sensor/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteAllDataSensors = async (data: any) => {
  try {
    const response = await axios.post(
      "http://localhost:9000/api/v1/dp/delete-sensors",
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const updateSensor = async (data: any, id: string) => {
  try {
    const response = await axios.put(
      `http://localhost:9000/api/v1/dp/update-sensor/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default {
  list,
  getCategorySensor,
  createSensor,
  deleteSensorById,
  deleteAllDataSensors,
  getSensorById,
  updateSensor,
};
