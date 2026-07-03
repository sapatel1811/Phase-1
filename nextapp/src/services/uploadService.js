import axios from "axios";

export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const res = await axios.post(
    "/api/upload",
    formData
  );

  return res.data.image;
};