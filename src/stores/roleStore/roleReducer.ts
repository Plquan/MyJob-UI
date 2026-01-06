import { createSlice } from "@reduxjs/toolkit";
import type { IFunctionData, IRoleData } from "../../types/role/RoleType";
import roleThunks from "./roleThunk";
import toast from "react-hot-toast";

interface RoleState {
    functions?: IFunctionData[],
    roles?:IRoleData[],
    loading: boolean,
    isSubmiting?: boolean;
    error?: string,
}

const initialState: RoleState = {
    functions:[],
    roles:[],
    loading: false,
    error: undefined,
    isSubmiting: false,
}

export const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        //get all functions
        builder.addCase(roleThunks.getAllFunctions.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(roleThunks.getAllFunctions.fulfilled, (state, action) => {
            state.functions = action.payload;
            state.loading = false;
        });
        builder.addCase(roleThunks.getAllFunctions.rejected, (state, action) => {
            state.loading = false;
            toast.error((action.payload as { errorMessage: string }).errorMessage);
        });
        
        //get all roles
        builder.addCase(roleThunks.getAllRoles.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(roleThunks.getAllRoles.fulfilled, (state, action) => {
            state.roles = action.payload;
            state.loading = false;
        })
        builder.addCase(roleThunks.getAllRoles.rejected, (state, action) => {
            state.loading = false;
            toast.error((action.payload as { errorMessage: string }).errorMessage);
        })

        // create role
        builder.addCase(roleThunks.createRole.pending, (state) => {
            state.isSubmiting = true;
        })
        builder.addCase(roleThunks.createRole.fulfilled, (state, action) => {
            state.roles?.unshift(action.payload)
            state.isSubmiting = false
            toast.success("Tạo vai trò thành công")
        })
        builder.addCase(roleThunks.createRole.rejected, (state, action) => {
            state.isSubmiting = false;
            toast.error((action.payload as { errorMessage: string }).errorMessage);
        })

        //update role 
        builder.addCase(roleThunks.updateRole.pending, (state) => {
            state.isSubmiting = true;
        });
        builder.addCase(roleThunks.updateRole.fulfilled, (state, action) => {
            state.roles = state.roles?.map((role) => (role.id === action.payload.id ? action.payload : role));
            state.isSubmiting = false;
            toast.success("Cập nhật vai trò thành công")
        });
        builder.addCase(roleThunks.updateRole.rejected, (state, action) => {
            state.isSubmiting = false
            toast.error((action.payload as { errorMessage: string }).errorMessage)
        });

        //delete role
        builder.addCase(roleThunks.deleteRole.pending, (state) => {
            state.isSubmiting = true
        })
        builder.addCase(roleThunks.deleteRole.fulfilled, (state, action) => {   
            state.roles = state.roles?.filter((role) => role.id !== action.meta.arg);   
            state.isSubmiting = false;
            toast.success("Xóa vai trò thành công")

        });
        builder.addCase(roleThunks.deleteRole.rejected, (state, action) => {
            state.isSubmiting = false;
            toast.error((action.payload as { errorMessage: string }).errorMessage);
        })

        //update role permission
        builder.addCase(roleThunks.updateRolePermissions.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(roleThunks.updateRolePermissions.fulfilled, (state, action) => {   
            // Note: updateRolePermissions returns boolean, not role data
            // If you need to update the role in state, you should refetch it
            state.loading = false;
            toast.success("Cập nhật quyền thành công")

        });
        builder.addCase(roleThunks.updateRolePermissions.rejected, (state, action) => {
            state.loading = false;
            toast.error((action.payload as { errorMessage: string }).errorMessage);
        })



    },
});


export const roleActions = {
    ...roleSlice.actions,
    ...roleThunks,
}

export default roleSlice.reducer;
