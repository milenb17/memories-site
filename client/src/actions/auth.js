import { AUTH } from '../constants/actionTypes';
import * as api from '../api/';

// Action Creators
export const logIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(formData);

    dispatch({ type: AUTH, payload: data });
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, payload: data });
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};