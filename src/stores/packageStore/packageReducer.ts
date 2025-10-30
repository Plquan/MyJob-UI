import { createSlice } from "@reduxjs/toolkit";
import type { IPackageDto } from "../../types/package/PackageType";
import packageThunks from "./packageThunk";
import { message } from "antd";

interface PackageState {
    allPackages: IPackageDto[],
    packages: IPackageDto[],
    loading: boolean,
    isSubmiting: boolean,
    error?: string,
}

const initialState: PackageState = {
    allPackages: [],
    packages: [],
    loading: false,
    isSubmiting: false,
    error: undefined,
}

export const packageSlice = createSlice({
    name: "package",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // get all packages
        builder.addCase(packageThunks.getAllPackages.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(packageThunks.getAllPackages.fulfilled, (state, action) => {
            state.allPackages = action.payload;
            state.loading = false;
        });
        builder.addCase(packageThunks.getAllPackages.rejected, (state, action) => {
            state.loading = false;
            message.error((action.payload as { message: string }).message);
        });
        // create package
        builder.addCase(packageThunks.createPackage.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(packageThunks.createPackage.fulfilled, (state, action) => {
            state.allPackages.push(action.payload)
            state.loading = false;
            message.success("Thêm mới gói thành công");
        });
        builder.addCase(packageThunks.createPackage.rejected, (state, action) => {
            state.loading = false;
            message.error((action.payload as { message: string }).message);
        });

        // update package
        builder.addCase(packageThunks.updatePackage.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(packageThunks.updatePackage.fulfilled, (state, action) => {
            const updated = action.payload;
            state.allPackages = state.allPackages.map(pkg =>
                pkg.id === updated.id ? updated : pkg
            );
            state.loading = false;
            message.success("Cập nhật gói thành công");
        });
        builder.addCase(packageThunks.updatePackage.rejected, (state, action) => {
            state.loading = false;
            message.error((action.payload as { message: string }).message);
        });

        // delete package
        builder.addCase(packageThunks.deletePackage.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(packageThunks.deletePackage.fulfilled, (state, action) => {
            state.allPackages = state.allPackages.filter(pkg => pkg.id !== action.meta.arg);
            state.loading = false;
            message.success("Xóa gói thành công");
        });
        builder.addCase(packageThunks.deletePackage.rejected, (state, action) => {
            state.loading = false;
            message.error((action.payload as { message: string }).message);
        });

        // get  packages
        builder.addCase(packageThunks.getPackages.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(packageThunks.getPackages.fulfilled, (state, action) => {
            state.packages = action.payload;
            state.loading = false;
        });
        builder.addCase(packageThunks.getPackages.rejected, (state, action) => {
            state.loading = false;
            message.error((action.payload as { message: string }).message);
        });

        // purchase  package
        builder.addCase(packageThunks.purchasePackage.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(packageThunks.purchasePackage.fulfilled, (state, action) => {
            state.loading = false;
            message.success("Mua gói thành công");
        });
        builder.addCase(packageThunks.purchasePackage.rejected, (state, action) => {
            state.loading = false;
            message.error((action.payload as { message: string }).message);
        });
    },
});

export const packageActions = {
    ...packageSlice.actions,
    ...packageThunks,
}

export default packageSlice.reducer;
