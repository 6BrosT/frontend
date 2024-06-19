import { createSlice } from "@reduxjs/toolkit";
import { User } from "models/authService/entity/user";

interface InitialState {
  isLoading: boolean;
  users: {
    users: User[];
    currentPage: number;
    totalItems: number;
    totalPages: number;
  };
  org_users: {
    users: User[];
    currentPage: number;
    totalItems: number;
    totalPages: number;
  };
  org_assign_users: {
    users: User[];
    currentPage: number;
    totalItems: number;
    totalPages: number;
  };
}

const initialState: InitialState = {
  isLoading: false,
  users: {
    users: [],
    currentPage: 0,
    totalItems: 0,
    totalPages: 0
  },
  org_users: {
    users: [],
    currentPage: 0,
    totalItems: 0,
    totalPages: 0
  },
  org_assign_users: {
    users: [],
    currentPage: 0,
    totalItems: 0,
    totalPages: 0
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
    setUsers: (state, action) => {
      state.users.users = action.payload.users;
      state.users.currentPage = action.payload.currentPage;
      state.users.totalItems = action.payload.totalItems;
      state.users.totalPages = action.payload.totalPages;
    },
    clearUsers: (state) => {
      state.users.users = [];
      state.users.currentPage = 0;
      state.users.totalItems = 0;
      state.users.totalPages = 0;
    },
    setOrgUsers: (state, action) => {
      state.org_users.users = action.payload.users;
      state.org_users.currentPage = action.payload.currentPage;
      state.org_users.totalItems = action.payload.totalItems;
      state.org_users.totalPages = action.payload.totalPages;
    },
    clearOrgUsers: (state) => {
      state.org_users.users = [];
      state.org_users.currentPage = 0;
      state.org_users.totalItems = 0;
      state.org_users.totalPages = 0;
    },
    setOrgAssignUsers: (state, action) => {
      state.org_assign_users.users = action.payload.users;
      state.org_assign_users.currentPage = action.payload.currentPage;
      state.org_assign_users.totalItems = action.payload.totalItems;
      state.org_assign_users.totalPages = action.payload.totalPages;
    }
  }
});

export const { setLoading, setUsers, clearUsers, setOrgUsers, clearOrgUsers, setOrgAssignUsers } =
  userSlice.actions;

export default userSlice.reducer;
