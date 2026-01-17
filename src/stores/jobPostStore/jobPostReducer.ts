import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import jobPostThunks from "./jobPostThunk";
import { message } from "antd";
import type { ICompanyJobPost, IJobPost } from "../../types/job-post/JobPostType";


interface JobPostState {
    loading: boolean,
    isSubmiting: Record<number, boolean>,
    error?: string,
    companyJobPost: {
        items: ICompanyJobPost[];
        totalItems: number;
        totalPages: number;
    },
    adminJobPosts: {
        items: ICompanyJobPost[];
        totalItems: number;
        totalPages: number;
    },
    jobPosts: {
        items: IJobPost[];
        totalItems: number;
        totalPages: number;
    },
    savedJobPosts: IJobPost[],
    requestParams: {
        page: number;
        limit: number;
        jobName?: string;
    },
    companyJobPostRequestParams: {
        page: number;
        limit: number;
        search?: string;
        jobPostStatus?: number;
    },
    adminJobPostRequestParams: {
        page: number;
        limit: number;
        search?: string;
        jobPostStatus?: number;
    },
    jobPostDetail?: IJobPost

}

const initialState: JobPostState = {
    loading: false,
    isSubmiting: {},
    error: undefined,
    companyJobPost: {
        items: [],
        totalItems: 0,
        totalPages: 0
    },
    adminJobPosts: {
        items: [],
        totalItems: 0,
        totalPages: 0
    },
    jobPosts: {
        items: [],
        totalItems: 0,
        totalPages: 0
    },
    savedJobPosts: [],
    requestParams: {
        page: 1,
        limit: 10,
        jobName: undefined
    },
    companyJobPostRequestParams: {
        page: 1,
        limit: 10,
        search: undefined,
        jobPostStatus: undefined
    },
    adminJobPostRequestParams: {
        page: 1,
        limit: 10,
        search: undefined,
        jobPostStatus: undefined
    }

}
export const jobPostSlice = createSlice({
    name: "jobPost",
    initialState,
    reducers: {
        setRequestParams: (state, action: PayloadAction<Partial<{ page: number; limit: number; jobName?: string }>>) => {
            state.requestParams = {
                ...state.requestParams,
                ...action.payload
            };
            if (action.payload.jobName !== undefined) {
                state.requestParams.page = 1;
            }
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.requestParams.page = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.requestParams.limit = action.payload;
        },
        setJobName: (state, action: PayloadAction<string | undefined>) => {
            state.requestParams.jobName = action.payload;
            state.requestParams.page = 1;
        },
        setCompanyJobPostRequestParams: (state, action: PayloadAction<Partial<{ page: number; limit: number; search?: string; jobPostStatus?: number }>>) => {
            state.companyJobPostRequestParams = {
                ...state.companyJobPostRequestParams,
                ...action.payload
            };
            if (action.payload.search !== undefined || action.payload.jobPostStatus !== undefined) {
                state.companyJobPostRequestParams.page = 1;
            }
        },
        setCompanyJobPostPage: (state, action: PayloadAction<number>) => {
            state.companyJobPostRequestParams.page = action.payload;
        },
        setCompanyJobPostLimit: (state, action: PayloadAction<number>) => {
            state.companyJobPostRequestParams.limit = action.payload;
        },
        setCompanyJobPostSearch: (state, action: PayloadAction<string | undefined>) => {
            state.companyJobPostRequestParams.search = action.payload;
            state.companyJobPostRequestParams.page = 1;
        },
        setJobPostStatus: (state, action: PayloadAction<number | undefined>) => {
            state.companyJobPostRequestParams.jobPostStatus = action.payload;
            state.companyJobPostRequestParams.page = 1;
        },
        setAdminJobPostRequestParams: (state, action: PayloadAction<Partial<{ page: number; limit: number; search?: string; jobPostStatus?: number }>>) => {
            state.adminJobPostRequestParams = {
                ...state.adminJobPostRequestParams,
                ...action.payload
            };
            if (action.payload.search !== undefined || action.payload.jobPostStatus !== undefined) {
                state.adminJobPostRequestParams.page = 1;
            }
        },
        setAdminJobPostPage: (state, action: PayloadAction<number>) => {
            state.adminJobPostRequestParams.page = action.payload;
        },
        setAdminJobPostLimit: (state, action: PayloadAction<number>) => {
            state.adminJobPostRequestParams.limit = action.payload;
        },
        setAdminJobPostSearch: (state, action: PayloadAction<string | undefined>) => {
            state.adminJobPostRequestParams.search = action.payload;
            state.adminJobPostRequestParams.page = 1;
        },
        setAdminJobPostStatus: (state, action: PayloadAction<number | undefined>) => {
            state.adminJobPostRequestParams.jobPostStatus = action.payload;
            state.adminJobPostRequestParams.page = 1;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(jobPostThunks.createJobPost.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(jobPostThunks.createJobPost.fulfilled, (state, action) => {
            state.companyJobPost.items.push(action.payload)
            state.companyJobPost.totalItems += 1;
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
            if (action.payload && Array.isArray(action.payload.items)) {
                state.companyJobPost.items = action.payload.items;
                state.companyJobPost.totalItems = action.payload.totalItems || 0;
                state.companyJobPost.totalPages = action.payload.totalPages || 0;
            } else {
                state.companyJobPost.items = [];
                state.companyJobPost.totalItems = 0;
                state.companyJobPost.totalPages = 0;
            }
            state.loading = false;
        });
        builder.addCase(jobPostThunks.getCompanyJobPosts.rejected, (state, action) => {
            state.companyJobPost.items = [];
            state.companyJobPost.totalItems = 0;
            state.companyJobPost.totalPages = 0;
            state.loading = false;
            message.error((action.payload as { message: string }).message);
        })

        builder.addCase(jobPostThunks.updateJobPost.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(jobPostThunks.updateJobPost.fulfilled, (state, action) => {
            const updated = action.payload;
            const index = state.companyJobPost.items.findIndex(job => job.id === updated.id);
            if (index !== -1) {
                state.companyJobPost.items[index] = {
                    ...state.companyJobPost.items[index],
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

        builder.addCase(jobPostThunks.getJobPost.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(jobPostThunks.getJobPost.fulfilled, (state, action) => {
            if (action.payload && Array.isArray(action.payload.items)) {
                state.jobPosts.items = action.payload.items;
                state.jobPosts.totalItems = action.payload.totalItems || 0;
                state.jobPosts.totalPages = action.payload.totalPages || 0;
            } else {
                state.jobPosts.items = [];
                state.jobPosts.totalItems = 0;
                state.jobPosts.totalPages = 0;
            }
            state.loading = false;
        });
        builder.addCase(jobPostThunks.getJobPost.rejected, (state) => {
            state.jobPosts.items = [];
            state.jobPosts.totalItems = 0;
            state.jobPosts.totalPages = 0;
            state.loading = false;
        })

        builder.addCase(jobPostThunks.toggleSaveJobPost.pending, (state, action) => {
            const jobPostId = action.meta.arg;
            state.isSubmiting[jobPostId] = true;
        });
        builder.addCase(jobPostThunks.toggleSaveJobPost.fulfilled, (state, action) => {
            const jobPostId = action.meta.arg;
            const isSaved = action.payload;

            // Update in jobPosts list
            const jobPost = state.jobPosts.items.find(c => c.id === jobPostId);
            if (jobPost) {
                jobPost.isSaved = isSaved;
            }

            // Update in jobPostDetail
            if (state.jobPostDetail && state.jobPostDetail.id === jobPostId) {
                state.jobPostDetail.isSaved = isSaved;
            }

            // Update in savedJobPosts list
            if (isSaved) {
                // Add to savedJobPosts if not already there
                const existsInSaved = state.savedJobPosts.find(j => j.id === jobPostId);
                if (!existsInSaved) {
                    const jobToAdd = jobPost || state.jobPostDetail;
                    if (jobToAdd) {
                        state.savedJobPosts.push({ ...jobToAdd, isSaved: true });
                    }
                }
            } else {
                // Remove from savedJobPosts
                state.savedJobPosts = state.savedJobPosts.filter(j => j.id !== jobPostId);
            }

            state.isSubmiting[jobPostId] = false;
        });
        builder.addCase(jobPostThunks.toggleSaveJobPost.rejected, (state, action) => {
            const jobPostId = action.meta.arg;
            state.isSubmiting[jobPostId] = false;
            message.error((action.payload as { message: string })?.message || "Có lỗi xảy ra");
        })

        builder.addCase(jobPostThunks.getJobPostById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(jobPostThunks.getJobPostById.fulfilled, (state, action) => {
            state.jobPostDetail = action.payload
            state.loading = false;
        });
        builder.addCase(jobPostThunks.getJobPostById.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(jobPostThunks.applyJob.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(jobPostThunks.applyJob.fulfilled, (state, action) => {
            if (state.jobPostDetail) {
                state.jobPostDetail.isApplied = action.payload
            }
            state.loading = false;
        });
        builder.addCase(jobPostThunks.applyJob.rejected, (state) => {
            state.loading = false;
        })

        // get saved job posts
        builder.addCase(jobPostThunks.getSavedJobPosts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(jobPostThunks.getSavedJobPosts.fulfilled, (state, action) => {
            state.savedJobPosts = action.payload
            state.loading = false;
        });
        builder.addCase(jobPostThunks.getSavedJobPosts.rejected, (state, action) => {
            state.loading = false;
            message.error((action.payload as { message: string })?.message || "Có lỗi xảy ra");
        })

        // get all job posts for admin
        builder.addCase(jobPostThunks.getAllJobPosts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(jobPostThunks.getAllJobPosts.fulfilled, (state, action) => {
            if (action.payload && Array.isArray(action.payload.items)) {
                state.adminJobPosts.items = action.payload.items;
                state.adminJobPosts.totalItems = action.payload.totalItems || 0;
                state.adminJobPosts.totalPages = action.payload.totalPages || 0;
            } else {
                state.adminJobPosts.items = [];
                state.adminJobPosts.totalItems = 0;
                state.adminJobPosts.totalPages = 0;
            }
            state.loading = false;
        });
        builder.addCase(jobPostThunks.getAllJobPosts.rejected, (state, action) => {
            state.adminJobPosts.items = [];
            state.adminJobPosts.totalItems = 0;
            state.adminJobPosts.totalPages = 0;
            state.loading = false;
            message.error((action.payload as { message: string })?.message || "Có lỗi xảy ra");
        })

    }
})

export const jobPostActions = {
    ...jobPostSlice.actions,
    ...jobPostThunks,
}

export default jobPostSlice.reducer;