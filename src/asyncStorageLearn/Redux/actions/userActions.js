import {DELETE_USER_DATA, SAVE_USER_DATA, UPDATE_USER_DATA} from '../type';

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
