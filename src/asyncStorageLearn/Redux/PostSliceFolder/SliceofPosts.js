import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const getPosts = createAsyncThunk('post', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const final = await response.json();
  return final;
});

const PostSlice = createSlice({
  name: 'post',
  initialState: {
    data: null,
    isLoading: false,
    isError: null,
  },
  extraReducers: builder => {
    builder.addCase(getPosts.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default PostSlice.reducer;
