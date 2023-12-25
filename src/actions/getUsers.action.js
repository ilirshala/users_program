import axios from 'axios';
export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAIL = 'GET_USERS_FAIL';
export const getUsers = () => {
  return async dispatch => {
    dispatch({type: GET_USERS});

    try {
      const response = await axios.get('https://randomuser.me/api/', {
        params: {results: 200},
      });
      if (response && response.data && response.data.results) {
        dispatch({
          type: GET_USERS_SUCCESS,
          payload: JSON.stringify(response.data.results),
        });
      } else {
        dispatch({type: GET_USERS_FAIL, payload: 'No user data found'});
      }
    } catch (error) {
      dispatch({
        type: GET_USERS_FAIL,
        payload: error.message || 'Failed to fetch users',
      });
    }
  };
};
