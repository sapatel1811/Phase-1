export const getAdmin = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const admin = localStorage.getItem("admin");

  return admin ? JSON.parse(admin) : null;
};

export const saveAdmin = (admin) => {
  localStorage.setItem("admin", JSON.stringify(admin));
};

export const isAuthenticated = () => {
  return !!getAdmin();
};

export const logout = () => {
  localStorage.removeItem("admin");
};