

import api from "./api";

/*
==========================
GET ALL ADMINS...
==========================
*/

export const getAdmins = async () => {
  const res = await api.get("/admins");
  return res.data;
};

/*
==========================
CHECK EMAIL....
==========================
*/

export const checkEmailExists = async (email) => {
  const res = await api.get("/admins");

  return res.data.some(
    (admin) =>
      admin.email.toLowerCase() === email.toLowerCase()
  );
};

/*
==========================
SIGNUP....
==========================
*/

export const signupAdmin = async (admin) => {
  const res = await api.post("/admins", {
    ...admin,
    phone: "",
    address: "",
    image: "",
    role: "Super Admin",
    createdAt: new Date().toISOString(),
  });

  return res.data;
};

/*
==========================
LOGIN....
==========================
*/

export const loginAdmin = async (email, password) => {
  //  console.log("STEP 4");
  const res = await api.get("/admins");
    // console.log("STEP 5");
  const admin = res.data.find(
    (item) =>
      item.email.toLowerCase() === email.toLowerCase() &&
      item.password === password
  );
    // console.log("STEP 6");

  return admin || null;
};

/*
==========================
GET ADMIN....
==========================
*/

export const getAdminById = async (id) => {
  const res = await api.get(`/admins/${id}`);
  return res.data;
};

/*
==========================
UPDATE PROFILE....
==========================
*/

export const updateAdmin = async (id, data) => {
  const res = await api.patch(`/admins/${id}`, data);
  return res.data;
};

/*
==========================
CHANGE PASSWORD....
==========================
*/

export const changePassword = async (id, password) => {
  const res = await api.patch(`/admins/${id}`, {
    password,
  });

  return res.data;
};