import { createSlice } from "@reduxjs/toolkit"
import type { ICareerData } from "../../types/career/CareerType"
import careerThunks from "./careerThunk"


interface CareerState{
    careers?:ICareerData[]
    loading: boolean,
    isSubmiting:boolean,
    error?: string,
}

const initialState: CareerState = {
    careers:[],
    loading: false,
    isSubmiting:false,
    error: undefined,
}
export const careerSlice = createSlice({
    name: "career",
    initialState,
    reducers: {},
    extraReducers: (builder) => { 
        builder.addCase(careerThunks.getAllCareers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(careerThunks.getAllCareers.fulfilled, (state, action) => {
            state.careers = action.payload;
            state.loading = false;
        });
        builder.addCase(careerThunks.getAllCareers.rejected, (state, action) => {
            state.loading = false;
        })


    }
})

export const careerActions = {
    ...careerSlice.actions,
    ...careerThunks,
}

export default careerSlice.reducer;