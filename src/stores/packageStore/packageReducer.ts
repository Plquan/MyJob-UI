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

         // get features
         builder.addCase(packageThunks.getAllFeatures.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(packageThunks.getAllFeatures.fulfilled, (state, action) => {
            state.features = action.payload.data;
            state.loading = false;
        });
        builder.addCase(packageThunks.getAllFeatures.rejected, (state, action) => {
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
            state.isSubmiting = false;
        });
        builder.addCase(packageThunks.createPackage.rejected, (state, action) => {
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
            state.isSubmiting = true;
        });
        builder.addCase(packageThunks.updatePackageFeatures.fulfilled, (state, action) => {
            message.success("Cập nhật thành công")
            state.isSubmiting = false;
        });
        builder.addCase(packageThunks.updatePackageFeatures.rejected, (state, action) => {
            state.isSubmiting = false;
        });
    },
});

export const packageActions = {
    ...packageSlice.actions,
    ...packageThunks,
}

export default packageSlice.reducer;
