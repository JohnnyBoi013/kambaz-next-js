import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const signin = async (credentials: {
  username: string;
  password: string;
}) => {
  const response = await axiosWithCredentials.post(
    `${HTTP_SERVER}/api/users/signin`,
    credentials,
  );
  return response.data;
};

export const signup = async (user: object) => {
  const response = await axiosWithCredentials.post(
    `${HTTP_SERVER}/api/users/signup`,
    user,
  );
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(
    `${HTTP_SERVER}/api/users/signout`,
  );
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.get(
    `${HTTP_SERVER}/api/users/profile`,
  );
  return response.data;
};

export const updateProfile = async (user: object) => {
  const response = await axiosWithCredentials.put(
    `${HTTP_SERVER}/api/users/profile`,
    user,
  );
  return response.data;
};
