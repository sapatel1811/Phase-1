


export const paginate = (data, page, limit) => {
  const start = (page - 1) * limit;

  return data.slice(start, start + limit);
};

export const totalPages = (data, limit) => {
  return Math.ceil(data.length / limit);
};
