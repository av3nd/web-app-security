import axios from "axios";
import { server } from "../../server";

// create food
export const createFood = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "foodCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/food/create-food`,
      newForm,
      config
    );
    dispatch({
      type: "foodCreateSuccess",
      payload: data.food,
    });
  } catch (error) {
    dispatch({
      type: "foodCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get All foods of a shop
export const getAllFoodsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllFoodsShopRequest",
    });

    const { data } = await axios.get(
      `${server}/food/get-all-foods-shop/${id}`
    );
    dispatch({
      type: "getAllFoodsShopSuccess",
      payload: data.foods,
    });
  } catch (error) {
    dispatch({
      type: "getAllFoodsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// delete product of a shop
export const deleteFood = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteFoodRequest",
    });

    const { data } = await axios.delete(
      `${server}/food/delete-shop-food/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteFoodSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteFoodFailed",
      payload: error.response.data.message,
    });
  }
};

// get all products
export const getAllFoods = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllFoodsRequest",
    });

    const { data } = await axios.get(`${server}/food/get-all-foods`);
    dispatch({
      type: "getAllFoodsSuccess",
      payload: data.foods,
    });
  } catch (error) {
    dispatch({
      type: "getAllFoodsFailed",
      payload: error.response.data.message,
    });
  }
};
