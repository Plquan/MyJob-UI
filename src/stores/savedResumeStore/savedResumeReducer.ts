import toast from "react-hot-toast";
import type { IResume } from "../../types/resume/ResumeType";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import savedResumeThunks from "./savedResumeThunk";
import { message } from "antd";

interface SavedResumeState {
    savedResumes: {
        items: IResume[];
        totalItems: number;
        totalPages: number;
    };
    loading: boolean;
    error?: string;
    searchParams: {
        page: number;
        limit: number;
        title?: string;
        candidateName?: string;
    };
}

const initialState: SavedResumeState = {
    loading: false,
    error: undefined,
    savedResumes: {
        items: [],
        totalItems: 0,
        totalPages: 0,
    },
    searchParams: {
        page: 1,
        limit: 10,
    },
};

export const savedResumeSlice = createSlice({
    name: "savedResume",
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.searchParams.page = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.searchParams.limit = action.payload;
            state.searchParams.page = 1;
        },
        setSearchParams: (state, action: PayloadAction<{ title?: string; candidateName?: string }>) => {
            state.searchParams = {
                ...state.searchParams,
                ...action.payload,
                page: 1, // Reset to page 1 when search changes
            };
        },
        resetSearchParams: (state) => {
            state.searchParams = initialState.searchParams;
        },
    },
    extraReducers: (builder) => {
        // Get saved resumes
        builder.addCase(savedResumeThunks.getSavedResumes.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(savedResumeThunks.getSavedResumes.fulfilled, (state, action) => {
            if (action.payload && Array.isArray(action.payload.items)) {
                state.savedResumes.items = action.payload.items;
                state.savedResumes.totalItems = action.payload.totalItems || 0;
                state.savedResumes.totalPages = action.payload.totalPages || 0;
            } else {
                state.savedResumes.items = [];
                state.savedResumes.totalItems = 0;
                state.savedResumes.totalPages = 0;
            }
            state.loading = false;
        });
        builder.addCase(savedResumeThunks.getSavedResumes.rejected, (state, action) => {
            state.savedResumes.items = [];
            state.savedResumes.totalItems = 0;
            state.savedResumes.totalPages = 0;
            state.loading = false;
            state.error = (action.payload as { message: string })?.message || "Có lỗi xảy ra";
            message.error(state.error);
        });

        // Toggle save resume
        builder.addCase(savedResumeThunks.toggleSaveResume.pending, () => {
            // Optional: Add loading state for toggle action
        });
        builder.addCase(savedResumeThunks.toggleSaveResume.fulfilled, (state, action) => {
            const { resumeId, isSaved } = action.payload;

            if (!isSaved) {
                // Resume was unsaved, remove it from the list
                state.savedResumes.items = state.savedResumes.items.filter(
                    resume => resume.id !== resumeId
                );
                state.savedResumes.totalItems = Math.max(0, state.savedResumes.totalItems - 1);
                toast.success("Đã bỏ lưu hồ sơ");
            } else {
                toast.success("Đã lưu hồ sơ");
            }
        });
        builder.addCase(savedResumeThunks.toggleSaveResume.rejected, (state, action) => {
            state.error = (action.payload as { message: string })?.message || "Có lỗi xảy ra";
            message.error(state.error);
        });
    },
});

export const savedResumeActions = {
    ...savedResumeSlice.actions,
    ...savedResumeThunks,
};

export default savedResumeSlice.reducer;
