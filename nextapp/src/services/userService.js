
import api from "./api";

export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const getUser = async (id) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

//adduser user...
export const addUser = async (user) => {
  const res = await api.post("/users", user);
  return res.data;
};

//update usr...
export const updateUser = async (id, user) => {
  const res = await api.put(`/users/${id}`, user);
  return res.data;
};

// delete user...
export const deleteUser = async (id) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};