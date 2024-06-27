import axios from 'axios';
import {DELETE_USER_DATA, GET_POST_DATA, SAVE_USER_DATA} from '../type';

export const saveUserData = data => {
  return {
    type: SAVE_USER_DATA,
    payload: data,
  };
};

export const deleteUserData = id => {
  return {
    type: DELETE_USER_DATA,
    payload: id,
  };
};

export const getPostData = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(
        'https://jsonplaceholder.typicode.com/posts',
      );
      dispatch({
        type: GET_POST_DATA,
        payload: data,
      });
    } catch (error) {
      console.log('error', error);
    }
  };
};
