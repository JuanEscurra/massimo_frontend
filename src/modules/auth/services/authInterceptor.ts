import axios from "axios";
import { Toast } from "shared/utilities/Alerts";

export const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/auth`,
	headers: {
		"Content-Type": "application/json",
	},
	responseType: "json",
  validateStatus: (status) => (status >= 200 && status < 300)
});

instance.interceptors.response.use(response => response,
  (error) => {
    console.log("error", error);
    Toast.fire({
      title: error.title,
      icon: 'error'
    })
    return error.response;
})
