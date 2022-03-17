import { FETCH_ALL, GET_USER, CREATE } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const getAttempts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAttempts();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createAttempt = (attempt) => async (dispatch) => {
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
