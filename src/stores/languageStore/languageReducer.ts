import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import type { ILanguage } from "../../types/resume/LanguageType";
import languageThunks from "./languageThunk";


interface LanguageState{
    languages: ILanguage[];
    loading: boolean,
    error?: string,
    isSubmitting: boolean
}

const initialState: LanguageState = {
    loading: false,
    error: undefined,
    isSubmitting:false,
    languages: []

}

export const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        //get all Languages
        builder.addCase(languageThunks.getAllLanguages.pending, (state) => {
            state.loading = true
        })
        builder.addCase(languageThunks.getAllLanguages.fulfilled, (state, action) => {
            state.languages = action.payload.data
            state.loading = false
        })
        builder.addCase(languageThunks.getAllLanguages.rejected, (state, action:PayloadAction<any>) => {
            state.loading = false
            toast.error(action.payload.errorMessage)
        })

        //create Language
        builder.addCase(languageThunks.createLanguage.pending, (state) => {
            state.loading = true
        })
        builder.addCase(languageThunks.createLanguage.fulfilled, (state, action) => {
            state.languages.push(action.payload.data)
            state.loading = false
            toast.success("Thêm ngôn ngữ thành công")
        })
        builder.addCase(languageThunks.createLanguage.rejected, (state, action:PayloadAction<any>) => {
            state.loading = false
            toast.error(action.payload.errorMessage)
        })

         //update Language
        builder.addCase(languageThunks.updateLanguage.pending, (state) => {
            state.isSubmitting = true
        })
        builder.addCase(languageThunks.updateLanguage.fulfilled, (state, action) => {
            state.languages = state.languages?.map(
                (lang) => (lang.id === action.payload.data.id ? action.payload.data : lang)
            )
            state.isSubmitting = false
            toast.success("Cập nhật ngôn ngữ thành công")
        })
        builder.addCase(languageThunks.updateLanguage.rejected, (state, action:PayloadAction<any>) => {
            state.isSubmitting = false
            toast.error(action.payload.errorMessage)
        })

         //delete
        builder.addCase(languageThunks.deleteLanguage.pending, (state) => {
            state.isSubmitting = true
        })
        builder.addCase(languageThunks.deleteLanguage.fulfilled, (state, action) => {
            state.languages = state.languages.filter(lang => lang.id !== action.meta.arg);
            state.isSubmitting = false
            toast.success("Xóa ngôn ngữ thành công")
        })
        builder.addCase(languageThunks.deleteLanguage.rejected, (state, action:PayloadAction<any>) => {
            state.isSubmitting = false
            toast.error(action.payload.errorMessage)
        })


    }
})

export const languageActions = {
    ...languageSlice.actions,
    ...languageThunks,
}

export default languageSlice.reducer;