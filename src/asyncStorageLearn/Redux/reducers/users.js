import {DELETE_USER_DATA, GET_POST_DATA, SAVE_USER_DATA} from '../type';

const initialState = {
  userData: [],
  postData: [],
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
    case GET_POST_DATA:
      return {
        ...state,
        postData: action.payload,
      };
    default:
      return state;
  }
}
