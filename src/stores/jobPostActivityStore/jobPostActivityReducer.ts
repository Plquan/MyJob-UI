import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import jobPostActivityThunks from "./jobPostActivityThunk";
import { message } from "antd";
import type { IJobPostActivityDto, IGetJobPostActivityRequest } from "../../types/job-post-activity/JobPostActivity";
import toast from "react-hot-toast";

interface JobPostActivityState {
    loading: boolean,
    error?: string,
    jobPostActivities: {
        items: IJobPostActivityDto[];
        totalItems: number;
        totalPages: number;
      },
    requestParams: IGetJobPostActivityRequest,
}

const initialState: JobPostActivityState = {
    loading: false,
    error: undefined,
    jobPostActivities: {
        items: [],
        totalItems: 1,
        totalPages: 10
      },
    requestParams: {
        page: 1,
        limit: 10,
        search: undefined,
        status: undefined
    },
}

export const jobPostActivitySlice = createSlice({
    name: "jobPostActivity",
    initialState,
    reducers: {
        setRequestParams: (state, action: PayloadAction<Partial<IGetJobPostActivityRequest>>) => {
            state.requestParams = {
                ...state.requestParams,
                ...action.payload
            };
            if (action.payload.search !== undefined || action.payload.status !== undefined) {
                state.requestParams.page = 1;
            }
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.requestParams.page = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.requestParams.limit = action.payload;
        },
        setSearch: (state, action: PayloadAction<string | undefined>) => {
            state.requestParams.search = action.payload;
            state.requestParams.page = 1;
        },
        setStatus: (state, action: PayloadAction<number | undefined>) => {
            state.requestParams.status = action.payload;
            state.requestParams.page = 1;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(jobPostActivityThunks.getJobPostActivities.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(jobPostActivityThunks.getJobPostActivities.fulfilled, (state, action) => {
            state.jobPostActivities.items = action.payload.items;
            state.jobPostActivities.totalItems = action.payload.totalItems;
            state.jobPostActivities.totalPages = action.payload.totalPages;
            state.loading = false;
        });
        builder.addCase(jobPostActivityThunks.getJobPostActivities.rejected, (state, action) => {
            state.loading = false;
            message.error((action.payload as { message: string })?.message || "Có lỗi xảy ra");
        })

        //delete 
        builder.addCase(jobPostActivityThunks.deleteJobPostActivity.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(jobPostActivityThunks.deleteJobPostActivity.fulfilled, (state, action) => {
            const deletedId = action.meta.arg;
            state.jobPostActivities.items = state.jobPostActivities.items.filter(
                item => item.id !== deletedId
            );
            state.loading = false;
            message.success("Xóa thành công")
        });
        builder.addCase(jobPostActivityThunks.deleteJobPostActivity.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            toast.error(action.payload.errorMessage)
        })

        //send email
        builder.addCase(jobPostActivityThunks.sendEmailToCandidate.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(jobPostActivityThunks.sendEmailToCandidate.fulfilled, (state, action) => {
            const jobPostActivityId = action.meta.arg.jobPostActivityId;
            const activity = state.jobPostActivities.items.find(item => item.id === jobPostActivityId);
            if (activity) {
                activity.isSentMail = true;
            }
            state.loading = false;
            message.success("Gửi email thành công")
        });
        builder.addCase(jobPostActivityThunks.sendEmailToCandidate.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            toast.error(action.payload?.errorMessage || "Có lỗi xảy ra khi gửi email")
        })
    }
})

export const jobPostActivityActions = {
    ...jobPostActivitySlice.actions,
    ...jobPostActivityThunks,
}

export default jobPostActivitySlice.reducer;

