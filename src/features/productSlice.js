import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../constants/axiosInstance";

// Async thunk to fetch products with pagination and filters
export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async (params, { rejectWithValue }) => {
    const { url, offset, limit, filters } = params;
    
    // Destructure filters to get search and categoryId
    const { search, categoryId } = filters;

    // Construct API parameters, mapping 'search' to 'title'
    const apiParams = {
      offset,
      limit,
      ...(search && { title: search }), // Use 'title' for search
      ...(categoryId && { categoryId: categoryId }),
    };

    try {
      // First, get the paginated data
      const paginatedRes = await axiosInstance.get(url, {
        params: apiParams, // Use the constructed apiParams
      });

      // Then, get the total count based on the same filters
      // For total count, we also need to use the 'title' parameter if 'search' is present
      const countApiParams = {
        ...(search && { title: search }),
        ...(categoryId && { categoryId: categoryId }),
      };
      const countRes = await axiosInstance.get(url, {
        params: countApiParams, // Use the constructed countApiParams
      });

      return {
        data: paginatedRes.data,
        total: countRes.data.length,
      };
    } catch (error) {
      // Use the rejectWithValue utility to return the error message
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch products');
      }
      return rejectWithValue('An unexpected error occurred.');
    }
  }
);

// Async thunk to fetch a single product by ID
export const fetchProductByIdAsync = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/products/${id}`);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch product details');
      }
      return rejectWithValue('An unexpected error occurred.');
    }
  }
);

const initialState = {
  products: [],
  totalCount: 0,
  selectedProduct: null,
  loading: false,
  error: null,
  filters: {
    search: '', // Keep 'search' in Redux state for clarity in your app
    categoryId: '',
  },
  pagination: {
    currentPage: 1,
    limit: 12, // You can make this configurable
  }
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Reducer to update filters
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    // Reducer to update current page
    setCurrentPage(state, action) {
      state.pagination.currentPage = action.payload;
    },
    // Reducer to reset all product state
    resetProductState(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchProductsAsync pending state
      .addCase(fetchProductsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.products = [];
      })
      // Handle fetchProductsAsync fulfilled state
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.totalCount = action.payload.total;
      })
      // Handle fetchProductsAsync rejected state
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products';
        state.products = [];
      })
      // Handle fetchProductByIdAsync fulfilled state
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })
      // Handle fetchProductByIdAsync rejected state
      .addCase(fetchProductByIdAsync.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch product details';
        state.selectedProduct = null;
      });
  },
});

// Export the actions and the reducer
export const { setFilters, setCurrentPage, resetProductState } = productSlice.actions;
export default productSlice.reducer;