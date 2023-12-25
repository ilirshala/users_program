import {
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
} from '../actions/getUsers.action';

const INITIAL_STATE = {
  users: [],
  success: false,
  isLoading: false,
  error: null,
};

const getUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS: {
      return {
        ...state,
        success: false,
        isLoading: true,
        error: null,
      };
    }
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        success: true,
        isLoading: false,
        error: null,
        users: action.payload,
      };
    }
    case GET_USERS_FAIL: {
      return {
        ...state,
        success: false,
        isLoading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default getUserReducer;
