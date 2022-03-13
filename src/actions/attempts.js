import { FETCH_ALL, GET_USER, CREATE, DELETE } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const getAttempts = () => async (dispatch) => {
  try {
    const { data } = await api.getAttempts();

    dispatch({ type: FETCH_ALL, data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (attempt) => async (dispatch) => {
  try {
    const { data } = await api.createPost(attempt);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUserAttempts = (email) => async (dispatch) => {
  try {
    const { data } = await api.fetchUserAttempts(email);

    dispatch({ type: GET_USER, data });
  } catch (error) {
    console.log(error);
  }
};
