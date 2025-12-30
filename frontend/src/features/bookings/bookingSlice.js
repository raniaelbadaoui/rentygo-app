// src/features/booking/bookingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentBooking: {
    vehicle: null,
    insurance: null,
    options: [],
    dates: {
      start_date: '',
      end_date: '',
      pickup_location: '',
      dropoff_location: '',
    },
    calculatedPrices: {
      vehiclePrice: 0,
      insurancePrice: 0,
      optionsPrice: 0,
      totalPrice: 0,
      days: 0,
    }
  },
  availableInsurances: [],
  availableOptions: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setVehicle: (state, action) => {
      console.log('🚗 Setting vehicle:', action.payload);
      state.currentBooking.vehicle = action.payload;
    },
    setInsurance: (state, action) => {
      console.log('🛡️ Setting insurance:', action.payload);
      state.currentBooking.insurance = action.payload;
    },
    toggleOption: (state, action) => {
      const optionId = action.payload;
      const index = state.currentBooking.options.findIndex(opt => opt.id === optionId);
      
      if (index === -1) {
        const option = state.availableOptions.find(opt => opt.id === optionId);
        if (option) {
          state.currentBooking.options.push(option);
        }
      } else {
        state.currentBooking.options.splice(index, 1);
      }
    },
    setDates: (state, action) => {
      state.currentBooking.dates = {
        ...state.currentBooking.dates,
        ...action.payload
      };
    },
    setPickupLocation: (state, action) => {
      state.currentBooking.dates.pickup_location = action.payload;
    },
    setDropoffLocation: (state, action) => {
      state.currentBooking.dates.dropoff_location = action.payload;
    },
    setAvailableInsurances: (state, action) => {
      state.availableInsurances = action.payload;
    },
    setAvailableOptions: (state, action) => {
      state.availableOptions = action.payload;
    },
    calculatePrices: (state) => {
      const { vehicle, insurance, options, dates } = state.currentBooking;
      
      if (!vehicle || !insurance || !dates.start_date || !dates.end_date) {
        return;
      }
      
      const start = new Date(dates.start_date);
      const end = new Date(dates.end_date);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      
      const vehiclePrice = vehicle.price_per_day * days;
      const insurancePrice = insurance.daily_rate * days;
      const optionsPrice = options.reduce((sum, opt) => sum + (opt.daily_rate * days), 0);
      const totalPrice = vehiclePrice + insurancePrice + optionsPrice;
      
      state.currentBooking.calculatedPrices = {
        vehiclePrice,
        insurancePrice,
        optionsPrice,
        totalPrice,
        days,
      };
    },
    clearBooking: (state) => {
      state.currentBooking = initialState.currentBooking;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setVehicle,
  setInsurance,
  toggleOption,
  setDates,
  setPickupLocation,
  setDropoffLocation,
  setAvailableInsurances,
  setAvailableOptions,
  calculatePrices,
  clearBooking,
  clearError,
} = bookingSlice.actions;

export default bookingSlice.reducer;