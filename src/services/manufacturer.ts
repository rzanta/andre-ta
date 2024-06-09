import axios from "axios";

const list = async () => {
  try {
    const response = await axios.get("http://localhost:9000/api/v1/dp/manufacturers");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default {
  list
}