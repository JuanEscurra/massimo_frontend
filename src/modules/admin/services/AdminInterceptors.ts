import axios from "axios";
import { Profile } from "shared/models/User";
import { Toast } from "shared/utilities/Alerts";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
  validateStatus: (status) => (status >= 200 && status < 300)
});


instance.interceptors.response.use(response => response,
  (error) => {
    Toast.fire({ title: error.response.data.message, icon: 'error' });
    return error.response;
  }
);

instance.interceptors.request.use(config => {
  const stringProfile = localStorage.getItem('auth');
  const profile: Profile | null = stringProfile ? JSON.parse(stringProfile) : null;
  return {
    ...config,
    headers: {
      ...config.headers,
      "authorization": `Bearer ${profile?.token}`
    }
  }
})