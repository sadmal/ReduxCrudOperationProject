import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { urls } from "../utils/constants";
import { toast } from 'react-toastify';

export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      urls.CREATE_USER,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();
      return result;

    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const showUser = createAsyncThunk(
  "showUser",
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      urls.CREATE_USER,
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `${urls.CREATE_USER}/${id}`,
      { method: "DELETE" }
    );
    try {
      const notify = () => toast.error("user Deleted!");
      notify()
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const dataUpdate = createAsyncThunk(
  "upadte",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      `${urls.CREATE_USER}/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData: []
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload
    }
  },

  extraReducers: {
    [createUser.pending]: (state) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [showUser.pending]: (state) => {
      state.loading = true;
    },
    [showUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [showUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.payload
      state.users = state.users.filter((ele) => ele.id !== id)
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [dataUpdate.pending]: (state) => {
      state.loading = true;
    },
    [dataUpdate.fulfilled]: (state, action) => {
      state.users = state.users.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
    },
    [dataUpdate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { searchUser } = userDetail.actions

export default userDetail.reducer;

