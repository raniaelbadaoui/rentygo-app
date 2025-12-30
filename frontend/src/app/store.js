import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import vehicleReducer from '../features/vehicles/vehicleSlice';
import bookingReducer from '../features/bookings/bookingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vehicles: vehicleReducer,
    booking: bookingReducer, 
  },
});