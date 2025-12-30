import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';

// Fetch all vehicles
export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/vehicles', { params: filters }); // AJOUT /api/
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch single vehicle
export const fetchVehicleById = createAsyncThunk(
  'vehicles/fetchVehicleById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/vehicles/${id}`); // AJOUT /api/
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState: {
    vehicles: [],
    currentVehicle: null,
    loading: false,
    error: null,
    total: 0,
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    clearCurrentVehicle: (state) => {
      state.currentVehicle = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch vehicles
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload.data || action.payload;
        state.total = action.payload.total || action.payload.length;
        state.currentPage = action.payload.current_page || 1;
        state.totalPages = action.payload.last_page || 1;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single vehicle
      .addCase(fetchVehicleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicleById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentVehicle = action.payload;
      })
      .addCase(fetchVehicleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentVehicle, clearError } = vehicleSlice.actions;
export default vehicleSlice.reducer;