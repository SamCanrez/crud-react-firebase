import {createSlice } from "@reduxjs/toolkit";
import {fetchUsers, createUser, updateUser, deleteUser } from "./usersApi";

const usersSlice = createSlice({
    name: "users",
    initialState: {
      users: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUsers.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
          state.loading = false;
          state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(createUser.fulfilled, (state, action) => {
          state.users.push(action.payload);
        })
        .addCase(updateUser.fulfilled, (state, action) => {
          const index = state.users.findIndex((user) => user.id === action.payload.id);
          if (index !== -1) {
            state.users[index] = action.payload;
          }
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
          state.users = state.users.filter((user) => user.id !== action.payload);
        })
        .addMatcher(
          (action) => action.type.endsWith("/rejected"),
          (state, action) => {
            state.error = action.payload;
          }
        );
    },
  });
  
  export default usersSlice.reducer;