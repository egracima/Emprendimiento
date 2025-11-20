import axios from "axios";

const apiLogin = "http://localhost:3000/auth/login"
const apiRegister = "http://localhost:3000/auth/register"
const apiLogout = "http://localhost:3000/auth/logout"

export const LoginUser = async (form) => {
  const response = await axios.post(apiLogin, form, {
    withCredentials: true,
  });
  return response.data;
}

export const RegisterUser = async (form) => {
  const response = await axios.post(apiRegister, form, {
    withCredentials: true,
  });
  return response.data;
}

export const Logout = async (form) => {
  const response = await axios.post(apiLogout, form, {
    withCredentials: true,
  });
  return response.data;
}