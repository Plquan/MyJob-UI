import toast from "react-hot-toast";
import type { IResume } from "../../types/resume/ResumeType";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import attachedResumeThunks from "./attachedResumeThunk";
import { EResumeType } from "../../enums/resume/EResumeType";
import { message } from "antd";

interface AttachedResumeState {
    attachedResumes: IResume[]
    loading: boolean,
    error?: string,
    isSubmitting: boolean,
    searchResults: {
        items: IResume[];
        totalItems: number;
        totalPages: number;
    };
    searchParams: {
        page: number;
        limit: number;
        title?: string;
        provinceId?: number;
        careerId?: number;
        position?: number;
        typeOfWorkPlace?: number;
        experience?: number;
        academicLevel?: number;
        jobType?: number;
        gender?: number;
        maritalStatus?: number;
    };
}

const initialState: AttachedResumeState = {
    loading: false,
    error: undefined,
    isSubmitting: false,
    attachedResumes: [],
    searchResults: {
        items: [],
        totalItems: 0,
        totalPages: 0,
    },
    searchParams: {
        page: 1,
        limit: 10,
    },
}

export const attachedResumeSlice = createSlice({
    name: "attachedResume",
    initialState,
    reducers: {
        setSearchParams: (
            state,
            action: PayloadAction<
                Partial<{
                    page: number;
                    limit: number;
                    title?: string;
                    provinceId?: number;
                    careerId?: number;
                    position?: number;
                    typeOfWorkPlace?: number;
                    experience?: number;
                    academicLevel?: number;
                    jobType?: number;
                    gender?: number;
                    maritalStatus?: number;
                }>
            >
        ) => {
            state.searchParams = {
                ...state.searchParams,
                ...action.payload,
            };
            // Reset to page 1 when filters change (except when only page is changing)
            if (Object.keys(action.payload).some(key => key !== 'page' && key !== 'limit')) {
                state.searchParams.page = 1;
            }
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.searchParams.page = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.searchParams.limit = action.payload;
            state.searchParams.page = 1;
        },
        resetSearchParams: (state) => {
            state.searchParams = initialState.searchParams;
        },
    },
    extraReducers: (builder) => {

        // get all attached resumse
        builder.addCase(attachedResumeThunks.getResumes.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(attachedResumeThunks.getResumes.fulfilled, (state, action) => {
            state.attachedResumes = action.payload
            state.loading = false;
        })
        builder.addCase(attachedResumeThunks.getResumes.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            toast.error(action.payload.message)
        })

        //upload attached resume
        builder.addCase(attachedResumeThunks.uploadAttachedResume.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(attachedResumeThunks.uploadAttachedResume.fulfilled, (state, action) => {
            console.log(action.payload)
            state.attachedResumes.push(action.payload)
            state.loading = false;
            toast.success("Thêm hồ sơ đính kèm thành công")
        })
        builder.addCase(attachedResumeThunks.uploadAttachedResume.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            toast.error(action.payload.message)
        })

        //delete attached Resume 
        builder.addCase(attachedResumeThunks.deleteAttachedResume.pending, (state) => {
            state.isSubmitting = true;
        })
        builder.addCase(
            attachedResumeThunks.deleteAttachedResume.fulfilled,
            (state, action) => {
                const deletedResumeId = action.meta.arg;

                const deletedResume = state.attachedResumes.find(
                    resume => resume.id === deletedResumeId
                );

                state.attachedResumes = state.attachedResumes.filter(
                    resume => resume.id !== deletedResumeId
                );

                if (deletedResume?.selected) {
                    const onlineResume = state.attachedResumes.find(
                        resume => resume.type === EResumeType.ONLINE
                    );

                    if (onlineResume) {
                        onlineResume.selected = true;
                    }
                }

                state.isSubmitting = false;
                toast.success("Xóa hồ sơ thành công");
            }
        );
        builder.addCase(attachedResumeThunks.deleteAttachedResume.rejected, (state, action: PayloadAction<any>) => {
            state.isSubmitting = false;
            toast.error(action.payload.message)
        })

        //update attached Resume 
        builder.addCase(attachedResumeThunks.updateAttachedResume.pending, (state) => {
            state.isSubmitting = true;
        })
        builder.addCase(attachedResumeThunks.updateAttachedResume.fulfilled, (state, action) => {
            state.attachedResumes = state.attachedResumes?.map(
                (resume) => (resume.id === action.payload.id ? action.payload : resume)
            )
            state.isSubmitting = false
            toast.success("Cập nhật hồ sơ thành công")
        })
        builder.addCase(attachedResumeThunks.updateAttachedResume.rejected, (state, action: PayloadAction<any>) => {
            state.isSubmitting = false;
            toast.error(action.payload.errorMessage)
        })

        //set selected Resume 
        builder.addCase(attachedResumeThunks.setSelectedResume.pending, (state) => {
            state.isSubmitting = true;
        })
        builder.addCase(attachedResumeThunks.setSelectedResume.fulfilled, (state, action) => {
            state.attachedResumes = state.attachedResumes?.map(
                (resume) =>
                    resume.id === action.meta.arg
                        ? { ...resume, selected: true }
                        : { ...resume, selected: false }
            );
            state.isSubmitting = false;
        })
        builder.addCase(attachedResumeThunks.setSelectedResume.rejected, (state, action: PayloadAction<any>) => {
            state.isSubmitting = false;
            toast.error(action.payload.errorMessage)
        })

        // search resumes
        builder.addCase(attachedResumeThunks.searchResumes.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(attachedResumeThunks.searchResumes.fulfilled, (state, action) => {
            if (action.payload && Array.isArray(action.payload.items)) {
                state.searchResults.items = action.payload.items;
                state.searchResults.totalItems = action.payload.totalItems || 0;
                state.searchResults.totalPages = action.payload.totalPages || 0;
            } else {
                state.searchResults.items = [];
                state.searchResults.totalItems = 0;
                state.searchResults.totalPages = 0;
            }
            state.loading = false;
        });
        builder.addCase(attachedResumeThunks.searchResumes.rejected, (state, action) => {
            state.searchResults.items = [];
            state.searchResults.totalItems = 0;
            state.searchResults.totalPages = 0;
            state.loading = false;
            state.error = (action.payload as { message: string })?.message || "Có lỗi xảy ra";
            message.error(state.error);
        });

    }
});

export const attachedResumeActions = {
    ...attachedResumeSlice.actions,
    ...attachedResumeThunks,
}

export default attachedResumeSlice.reducer;