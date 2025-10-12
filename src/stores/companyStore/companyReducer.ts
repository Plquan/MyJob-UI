import { createSlice } from "@reduxjs/toolkit"
import type { ICompanyData, ICompanyWithImagesData } from "../../types/company/CompanyType";
import companyThunks from "./companyThunk";
import type { IMyJobFile } from "../../types/myJobFile/myJobFileType";
import { FileType } from "../../constant/fileType";
import { message } from "antd";
import type { IJobPostData } from "../../types/job-post/JobPostType";

interface CompanyState {
    companyInfo?: ICompanyData,
    companies: ICompanyWithImagesData[],
    logo?: IMyJobFile,
    coverImage?: IMyJobFile,
    companyImages: IMyJobFile[],
    loading: boolean,
    submitting: {
        logo: boolean;
        cover: boolean;
        images: boolean;
        company: boolean;
    };
    error?: string,
}

const initialState: CompanyState = {
    loading: false,
    submitting: {
        logo: false,
        cover: false,
        images: false,
        company: false,
    },
    error: undefined,
    companyImages: [],
    companies: [],

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
            state.companyInfo = action.payload.company;
            state.logo = action.payload.images?.find(image => image && image.fileType === FileType.LOGO);
            state.coverImage = action.payload.images?.find(image => image && image.fileType === FileType.COVER_IMAGE);
            state.companyImages = action.payload.images?.filter(
                image => image && image.fileType === FileType.COMPANY_IMAGE
            ) ?? [];
            state.loading = false;
        });
        builder.addCase(companyThunks.getEmployerCompany.rejected, (state, action) => {
            state.loading = false;
            message.error((action.payload as { message: string }).message);
        })
        // upload company logo
        builder.addCase(companyThunks.uploadCompanyLogo.pending, (state) => {
            state.submitting.logo = true;
        });
        builder.addCase(companyThunks.uploadCompanyLogo.fulfilled, (state, action) => {
            state.logo = action.payload
            state.submitting.logo = false;
            message.success("Cập nhật logo thành công")
        });
        builder.addCase(companyThunks.uploadCompanyLogo.rejected, (state, action) => {
            state.submitting.logo = false;
            message.error((action.payload as { message: string }).message);
        })
        // upload company cover image
        builder.addCase(companyThunks.uploadCompanyCoverImage.pending, (state) => {
            state.submitting.cover = true;
        });
        builder.addCase(companyThunks.uploadCompanyCoverImage.fulfilled, (state, action) => {
            state.coverImage = action.payload
            state.submitting.cover = false;
            message.success("Cập nhật ảnh bìa thành công")
        });
        builder.addCase(companyThunks.uploadCompanyCoverImage.rejected, (state, action) => {
            state.submitting.cover = false;
            message.error((action.payload as { message: string }).message);
        })

        // upload company images
        builder.addCase(companyThunks.uploadCompanyImages.pending, (state) => {
            state.submitting.images = true;
        });
        builder.addCase(companyThunks.uploadCompanyImages.fulfilled, (state, action) => {
            state.companyImages = [action.payload, ...state.companyImages];
            state.submitting.images = false;
        });
        builder.addCase(companyThunks.uploadCompanyImages.rejected, (state, action) => {
            state.submitting.images = false;
            message.error((action.payload as { message: string }).message);
        })

        // delete company image
        builder.addCase(companyThunks.deleteCompanyImage.pending, (state) => {
            state.submitting.images = true;
        });
        builder.addCase(companyThunks.deleteCompanyImage.fulfilled, (state, action) => {
            state.submitting.images = false;
        });
        builder.addCase(companyThunks.deleteCompanyImage.rejected, (state, action) => {
            state.submitting.images = false;
            message.error((action.payload as { message: string }).message);
        })

        // get companies
        builder.addCase(companyThunks.getCompanies.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(companyThunks.getCompanies.fulfilled, (state, action) => {
            state.companies = action.payload
            state.loading = false;
        });
        builder.addCase(companyThunks.getCompanies.rejected, (state, action) => {
            state.loading = false;
            message.error((action.payload as { message: string }).message);
        })
      
    }
})

export const companyActions = {
    ...companySlice.actions,
    ...companyThunks,
}
export default companySlice.reducer;