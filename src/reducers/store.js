import {configureStore} from '@reduxjs/toolkit';

import getUserReducer from './getUsers.reducer';

const store = configureStore({
  reducer: {
    getUserReducer: getUserReducer,
  },
});

export default store;
