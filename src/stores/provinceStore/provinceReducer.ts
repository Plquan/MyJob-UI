import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IDistrict, IProvince } from "../../types/province/ProvinceType";
import provinceThunks from "./provinceThunk";

interface ProvinceState{
    provinces?: IProvince[],
    districts?:IDistrict[]
    loading: boolean,
    isSubmiting:boolean,
    error?: string,
}

const initialState: ProvinceState = {
    provinces: [],
    districts:[],
    loading: false,
    isSubmiting:false,
    error: undefined,
}

export const provinceSlice = createSlice({
    name: "province",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // get provinces
        builder.addCase(provinceThunks.getAllProvinces.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(provinceThunks.getAllProvinces.fulfilled, (state, action) => {
            state.provinces = action.payload.data;
            state.loading = false;
        });
        builder.addCase(provinceThunks.getAllProvinces.rejected, (state, action) => {
            state.loading = false;
        })
        // get districts by province
        builder.addCase(provinceThunks.getDistrictsByProvince.pending, (state) => {
            state.isSubmiting = true;
        });
        builder.addCase(provinceThunks.getDistrictsByProvince.fulfilled, (state, action) => {
            state.districts = action.payload.data;
            state.isSubmiting = false;
        });
        builder.addCase(provinceThunks.getDistrictsByProvince.rejected, (state, action) => {
            state.isSubmiting = false;
        });
    },
});

export const provinceActions = {
    ...provinceSlice.actions,
    ...provinceThunks,
}

export default provinceSlice.reducer;
