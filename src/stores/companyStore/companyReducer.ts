import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ICompanyData, ICompanyDetail, ICompanyWithImagesData } from "../../types/company/CompanyType";
import companyThunks from "./companyThunk";
import type { IMyJobFile } from "../../types/myJobFile/myJobFileType";
import { FileType } from "../../constant/fileType";
import { message } from "antd";

interface CompanyState {
    companyInfo?: ICompanyData,
    companies: {
        items: ICompanyWithImagesData[];
        totalItems: number;
        totalPages: number;
    },
    savedCompanies: ICompanyWithImagesData[],
    requestParams: {
        page: number;
        limit: number;
        companyName?: string;
    },
    logo?: IMyJobFile,
    coverImage?: IMyJobFile,
    companyImages: IMyJobFile[],
    companyDetail?: ICompanyDetail
    loading: boolean,
    submitting: {
        logo: boolean;
        cover: boolean;
        images: boolean;
        company: boolean;
        followCompany: Record<number, boolean>;
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
        followCompany: {},
    },
    error: undefined,
    companyImages: [],
    companies: {
        items: [],
        totalItems: 0,
        totalPages: 0
    },
    savedCompanies: [],
    requestParams: {
        page: 1,
        limit: 10,
        companyName: undefined
    },

}
export const companySlice = createSlice({
    name: "Company",
    initialState,
    reducers: {
        setRequestParams: (state, action: PayloadAction<Partial<{ page: number; limit: number; companyName?: string }>>) => {
            state.requestParams = {
                ...state.requestParams,
                ...action.payload
            };
            if (action.payload.companyName !== undefined) {
                state.requestParams.page = 1;
            }
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.requestParams.page = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.requestParams.limit = action.payload;
        },
        setCompanyName: (state, action: PayloadAction<string | undefined>) => {
            state.requestParams.companyName = action.payload;
            state.requestParams.page = 1;
        },
    },
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
        builder.addCase(companyThunks.deleteCompanyImage.fulfilled, (state) => {
            state.submitting.images = false;
        });
        builder.addCase(companyThunks.deleteCompanyImage.rejected, (state) => {
            state.submitting.images = false;
            message.error("Xóa ảnh thất bại");
        })

        // get companies
        builder.addCase(companyThunks.getCompanies.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(companyThunks.getCompanies.fulfilled, (state, action) => {
            if (action.payload && Array.isArray(action.payload.items)) {
                state.companies.items = action.payload.items;
                state.companies.totalItems = action.payload.totalItems || 0;
                state.companies.totalPages = action.payload.totalPages || 0;
            } else {
                state.companies.items = [];
                state.companies.totalItems = 0;
                state.companies.totalPages = 0;
            }
            state.loading = false;
        });
        builder.addCase(companyThunks.getCompanies.rejected, (state, action) => {
            state.companies.items = [];
            state.companies.totalItems = 0;
            state.companies.totalPages = 0;
            state.loading = false;
            message.error((action.payload as { message: string })?.message || "Có lỗi xảy ra");
        })

        // get company detail
        builder.addCase(companyThunks.getCompanyDetail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(companyThunks.getCompanyDetail.fulfilled, (state, action) => {
            state.companyDetail = action.payload
            state.loading = false;
        });
        builder.addCase(companyThunks.getCompanyDetail.rejected, (state, action) => {
            state.loading = false;
            message.error((action.payload as { message: string }).message);
        })

         // toggle follow company
         builder.addCase(companyThunks.toggleFollowCompany.pending, (state, action) => {
            const companyId = action.meta.arg;
            state.submitting.followCompany[companyId] = true;
        });
        builder.addCase(companyThunks.toggleFollowCompany.fulfilled, (state, action) => {
            const companyId = action.meta.arg;
            const isFollowed = action.payload;
            
            // Update in companies list
            const company = state.companies.items.find(c => c.company.id === companyId);
            if (company) {
                company.isFollowed = isFollowed;
            }
            
            // Update in savedCompanies list
            if (isFollowed) {
                // Add to savedCompanies if not already there
                const existsInSaved = state.savedCompanies.find(c => c.company.id === companyId);
                if (!existsInSaved && company) {
                    state.savedCompanies.push({ ...company, isFollowed: true });
                }
            } else {
                // Remove from savedCompanies
                state.savedCompanies = state.savedCompanies.filter(c => c.company.id !== companyId);
            }
            
            state.submitting.followCompany[companyId] = false;
        });
        builder.addCase(companyThunks.toggleFollowCompany.rejected, (state, action) => {
            const companyId = action.meta.arg;
            state.submitting.followCompany[companyId] = false;
            message.error((action.payload as { message: string }).message);
        })

        // get saved companies
        builder.addCase(companyThunks.getSavedCompanies.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(companyThunks.getSavedCompanies.fulfilled, (state, action) => {
            state.savedCompanies = action.payload
            state.loading = false;
        });
        builder.addCase(companyThunks.getSavedCompanies.rejected, (state, action) => {
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