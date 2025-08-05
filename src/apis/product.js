import axiosInstance from "../constants/axiosInstance";

export const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  const res = await axiosInstance.get(`/products/${id}`);
  return res.data;
};

const fetchPaginatedData = async (
  url,
  { offset = 0, limit = 10, ...filters }
) => {
  const paginatedRes = await axiosInstance.get(url, {
    params: { offset, limit, ...filters },
  });

  const countRes = await axiosInstance.get(url, {
    params: { ...filters },
  });

  return {
    data: paginatedRes.data,
    total: countRes.data.length,
  };
};

export default fetchPaginatedData;
