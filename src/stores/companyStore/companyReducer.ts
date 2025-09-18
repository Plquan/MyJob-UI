import { createSlice } from "@reduxjs/toolkit"
import type { ICompanyDetail } from "../../types/company/CompanyType";
import companyThunks from "./companyThunk";
import type { IMyJobFile } from "../../types/myJobFile/myJobFileType";
import { FileType } from "../../constant/fileType";

interface CompanyState {
    companyInfo?: ICompanyDetail,
    logo?: IMyJobFile,
    coverImage?: IMyJobFile,
    companyImages: IMyJobFile[]
    loading: boolean,
    isSubmiting: boolean,
    error?: string,
}

const initialState: CompanyState = {
    loading: false,
    isSubmiting: false,
    error: undefined,
    companyImages: []
}
export const companySlice = createSlice({
    name: "Company",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //get employer company
        builder.addCase(companyThunks.getEmployerCompany.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(companyThunks.getEmployerCompany.fulfilled, (state, action) => {
            state.companyInfo = action.payload;
            state.logo = action.payload.images?.find(image => image.fileType === FileType.LOGO);
            state.coverImage = action.payload.images?.find(image => image.fileType === FileType.COVER_IMAGE);
            state.companyImages = action.payload.images?.filter(
                image => image.fileType === FileType.COMPANY_IMAGE
            ) ?? [];
            state.loading = false;
        });
        builder.addCase(companyThunks.getEmployerCompany.rejected, (state, action) => {
            state.loading = false;
        })
        // upload company logo
        builder.addCase(companyThunks.uploadCompanyLogo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(companyThunks.uploadCompanyLogo.fulfilled, (state, action) => {
            state.logo = action.payload
            state.loading = false;
        });
        builder.addCase(companyThunks.uploadCompanyLogo.rejected, (state, action) => {
            state.loading = false;
        })
        // upload company cover image
        builder.addCase(companyThunks.uploadCompanyCoverImage.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(companyThunks.uploadCompanyCoverImage.fulfilled, (state, action) => {
            state.coverImage = action.payload
            state.loading = false;
        });
        builder.addCase(companyThunks.uploadCompanyCoverImage.rejected, (state, action) => {
            state.loading = false;
        })

        // upload company images
        builder.addCase(companyThunks.uploadCompanyImages.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(companyThunks.uploadCompanyImages.fulfilled, (state, action) => {
            state.companyImages = [action.payload, ...state.companyImages];
            state.loading = false;
        });
        builder.addCase(companyThunks.uploadCompanyImages.rejected, (state, action) => {
            state.loading = false;
        })
    }
})

export const companyActions = {
    ...companySlice.actions,
    ...companyThunks,
}
export default companySlice.reducer;