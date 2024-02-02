import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const foodReducer = createReducer(initialState, {
  foodCreateRequest: (state) => {
    state.isLoading = true;
  },
  foodCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.success = true;
  },
  foodCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // get all foods of shop
  getAllFoodsShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllFoodsShopSuccess: (state, action) => {
    state.isLoading = false;
    state.foods = action.payload;
  },
  getAllFoodsShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete food of a shop
  deleteFoodRequest: (state) => {
    state.isLoading = true;
  },
  deleteFoodSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteFoodFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all products
  getAllFoodsRequest: (state) => {
    state.isLoading = true;
  },
  getAllFoodsSuccess: (state, action) => {
    state.isLoading = false;
    state.allFoods = action.payload;
  },
  getAllFoodsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  
  clearErrors: (state) => {
    state.error = null;
  },
});
