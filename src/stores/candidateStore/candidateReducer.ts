import { createSlice } from '@reduxjs/toolkit';
import type { IUserActivityStatistics } from '../../types/candidate/CandidateType';
import type { IJobPost } from '../../types/job-post/JobPostType';
import candidateThunks from './candidateThunk';

interface CandidateState {
  activityStatistics: IUserActivityStatistics | null;
  recommendedJobs: IJobPost[];
  loading: boolean;
  loadingRecommendations: boolean;
  error: string | null;
}

const initialState: CandidateState = {
  activityStatistics: null,
  recommendedJobs: [],
  loading: false,
  loadingRecommendations: false,
  error: null,
};

export const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get activity statistics
    builder.addCase(candidateThunks.getActivityStatistics.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(candidateThunks.getActivityStatistics.fulfilled, (state, action) => {
      state.loading = false;
      state.activityStatistics = action.payload;
    });
    builder.addCase(candidateThunks.getActivityStatistics.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get recommended jobs
    builder.addCase(candidateThunks.getRecommendedJobs.pending, (state) => {
      state.loadingRecommendations = true;
      state.error = null;
    });
    builder.addCase(candidateThunks.getRecommendedJobs.fulfilled, (state, action) => {
      state.loadingRecommendations = false;
      state.recommendedJobs = action.payload;
    });
    builder.addCase(candidateThunks.getRecommendedJobs.rejected, (state, action) => {
      state.loadingRecommendations = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError } = candidateSlice.actions;
export default candidateSlice.reducer;

