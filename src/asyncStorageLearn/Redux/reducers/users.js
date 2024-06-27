import {DELETE_USER_DATA, SAVE_USER_DATA} from '../type';

const initialState = {
  userData: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SAVE_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case DELETE_USER_DATA:
      const newData = state.userData.filter(item => item.id !== action.payload);
      return {
        ...state,
        userData: newData,
      };
    default:
      return state;
  }
}
