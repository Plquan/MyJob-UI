import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IFeature, IFeatureOfPackage, IPackage, IPackageType } from "../../types/package/PackageType";
import packageThunks from "./packageThunk";
import { message } from "antd";

interface PackageState{
    packages: IPackage[]
    packageTypes: IPackageType[]
    features:IFeature[]
    featuresOfPackage: IFeatureOfPackage[]

    loading: boolean,
    isSubmiting:boolean,
    error?: string,
}

const initialState: PackageState = {
    packages: [],
    packageTypes: [],
    features:[],
    featuresOfPackage:[],

    loading: false,
    isSubmiting:false,
    error: undefined,
}

export const packageSlice = createSlice({
    name: "package",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // get packages
        builder.addCase(packageThunks.getAllPackages.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(packageThunks.getAllPackages.fulfilled, (state, action) => {
            state.packages = action.payload.data;
            state.loading = false;
        });
        builder.addCase(packageThunks.getAllPackages.rejected, (state, action) => {
            state.loading = false;
        });

        // get package types
        builder.addCase(packageThunks.getAllPackageTypes.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(packageThunks.getAllPackageTypes.fulfilled, (state, action) => {
            state.packageTypes = action.payload.data;
            state.loading = false;
        });
        builder.addCase(packageThunks.getAllPackageTypes.rejected, (state, action) => {
            state.loading = false;
        });

        // create package
        builder.addCase(packageThunks.createPackage.pending, (state) => {
            state.isSubmiting = true;
        });
        builder.addCase(packageThunks.createPackage.fulfilled, (state, action) => {
            state.packages?.push(action.payload.data)
            message.success("Thêm gói dịch vụ thành công")
            state.isSubmiting = false;
        });
        builder.addCase(packageThunks.createPackage.rejected, (state, action) => {
            state.isSubmiting = false;
        });

        // update package
        builder.addCase(packageThunks.updatePackage.pending, (state) => {
            state.isSubmiting = true;
        });
        builder.addCase(packageThunks.updatePackage.fulfilled, (state, action) => {
            state.packages = state.packages?.map(
                (pkg) => (pkg.id === action.payload.data.id ? action.payload.data : pkg)
            )
            message.success("Cập nhật gói dịch vụ thành công")
            state.isSubmiting = false;
        });
        builder.addCase(packageThunks.updatePackage.rejected, (state, action) => {
            state.isSubmiting = false;
        });

        
        // delete package
        builder.addCase(packageThunks.deletePackage.pending, (state) => {
            state.isSubmiting = true;
        });
        builder.addCase(packageThunks.deletePackage.fulfilled, (state, action) => {
            state.packages = state.packages.filter(pkg => pkg.id !== action.meta.arg);
            message.success("Xóa gói dịch vụ thành công")
            state.isSubmiting = false;
        });
        builder.addCase(packageThunks.deletePackage.rejected, (state, action) => {
            state.isSubmiting = false;
        });

          // get features of package
          builder.addCase(packageThunks.getFeaturesOfPackage.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(packageThunks.getFeaturesOfPackage.fulfilled, (state, action) => {
            state.featuresOfPackage = action.payload.data;
            state.loading = false;
        });
        builder.addCase(packageThunks.getFeaturesOfPackage.rejected, (state, action) => {
            state.loading = false;
        });

        // update package features
        builder.addCase(packageThunks.updatePackageFeatures.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(packageThunks.updatePackageFeatures.fulfilled, (state, action) => {
            message.success("Cập nhật gói tính năng thành công")
            state.loading = false;
        });
        builder.addCase(packageThunks.updatePackageFeatures.rejected, (state, action) => {
            state.loading = false;
        });
    },
});

export const packageActions = {
    ...packageSlice.actions,
    ...packageThunks,
}

export default packageSlice.reducer;
