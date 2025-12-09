import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProvince } from "../../types/province/ProvinceType";
import provinceThunks from "./provinceThunk";

interface ProvinceState{
    provinces?: IProvince[],
    loading: boolean,
    isSubmiting:boolean,
    error?: string,
}

const initialState: ProvinceState = {
    provinces: [],
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
            state.provinces = action.payload;
            state.loading = false;
        });
        builder.addCase(provinceThunks.getAllProvinces.rejected, (state, action) => {
            state.loading = false;
        })
    },
});

export const provinceActions = {
    ...provinceSlice.actions,
    ...provinceThunks,
}

export default provinceSlice.reducer;

