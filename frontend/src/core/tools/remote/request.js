import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api";

export const sendRequest = async (
  method = "GET",
  path = "/",
  body = {},
  navigate = () => {}
) => {
  try {
    const response = await axios({
      method: method,
      url: path,
      data: body,
      headers: {
        Authorization: `Bearer ...`,
      },
    });

    return response;
  } catch (error) {
    if (error.response.status === 401) {
      navigate("/lol");
    }

    throw error;
  }
};
