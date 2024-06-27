import {applyMiddleware, legacy_createStore as createstore} from 'redux';
import {rootReducer} from '../reducers';
import {thunk} from 'redux-thunk';

// import {configureStore} from '@reduxjs/toolkit';
// import PostReducer from '../PostSliceFolder/SliceofPosts';

export default store = createstore(rootReducer, applyMiddleware(thunk));

// export default store = configureStore({
//   reducer: PostReducer,
// });
