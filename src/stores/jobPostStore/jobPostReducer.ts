import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import jobPostThunks from "./jobPostThunk";
import { message } from "antd";
import type { IJobPostData } from "../../types/job-post/JobPostType";


interface JobPostState {
    loading: boolean,
    isSubmiting: boolean,
    error?: string,
    companyJobPost: IJobPostData[],
    page: number,
    limit: number,
    search: string,
    totalItems: number;
    totalPages: number;
    jobPostStatus?: number | undefined,

}

const initialState: JobPostState = {
    loading: false,
    isSubmiting: false,
    error: undefined,
    companyJobPost: [],
    page: 1,
    limit: 10,
    search: "",
    totalItems: 0,
    totalPages: 0

}
export const jobPostSlice = createSlice({
    name: "jobPost",
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
            state.page = 1
        },
        setJobPostStatus: (state, action: PayloadAction<number | undefined>) => {
            state.jobPostStatus = action.payload;
            state.page = 1
        },
    },
    extraReducers: (builder) => {
        builder.addCase(jobPostThunks.createJobPost.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(jobPostThunks.createJobPost.fulfilled, (state, action) => {
            state.companyJobPost.push(action.payload)
            state.loading = false;
            message.success("Thêm tin tuyển dụng thành công")
        });
        builder.addCase(jobPostThunks.createJobPost.rejected, (state, action) => {
            state.loading = false;
            message.error((action.payload as { message: string }).message);
        })

        //get company job post
        builder.addCase(jobPostThunks.getCompanyJobPosts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(jobPostThunks.getCompanyJobPosts.fulfilled, (state, action) => {
            state.companyJobPost = action.payload.items,
                state.totalItems = action.payload.totalItems,
                state.totalPages = action.payload.totalPages
            state.loading = false;
        });
        builder.addCase(jobPostThunks.getCompanyJobPosts.rejected, (state, action) => {
            state.loading = false;
            message.error((action.payload as { message: string }).message);
        })

        builder.addCase(jobPostThunks.updateJobPost.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(jobPostThunks.updateJobPost.fulfilled, (state, action) => {
            const updated = action.payload; 
            const index = state.companyJobPost.findIndex(job => job.id === updated.id);
            if (index !== -1) {
                state.companyJobPost[index] = {
                    ...state.companyJobPost[index],
                    ...updated,
                };
            }
            state.loading = false;
            message.success("Cập nhật tin thành công")
        });
        builder.addCase(jobPostThunks.updateJobPost.rejected, (state, action) => {
            state.loading = false;
            message.error((action.payload as { message: string }).message);
        })


    }
})

export const jobPostActions = {
    ...jobPostSlice.actions,
    ...jobPostThunks,
}

export default jobPostSlice.reducer;