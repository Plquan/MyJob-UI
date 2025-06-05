import { createSlice } from "@reduxjs/toolkit";
import type { IFunction, IRoleData } from "../../types/role/RoleType";
import roleThunks from "./roleThunk";

interface RoleState {
    functions?: IFunction[],
    roles?:IRoleData[],
    loading: boolean,
    error?: string,
}

const initialState: RoleState = {
    loading: false,
    error: undefined,
}

export const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(roleThunks.getAllFunctions.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(roleThunks.getAllFunctions.fulfilled, (state, action) => {
            state.functions = action.payload.data;
            state.loading = false;
        });
        builder.addCase(roleThunks.getAllFunctions.rejected, (state, action) => {
            state.loading = false;
        });

        builder.addCase(roleThunks.getAllRoles.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(roleThunks.getAllRoles.fulfilled, (state, action) => {
            state.roles = action.payload.data;
            state.loading = false;
        });
        builder.addCase(roleThunks.getAllRoles.rejected, (state, action) => {
            state.loading = false;
        });
    },
});

export const roleActions = {
    ...roleSlice.actions,
    ...roleThunks,
}

export default roleSlice.reducer;
