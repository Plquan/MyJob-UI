import { updateJobPostActivityStatusRequest } from "@/types/job-post-activity/JobPostActivity";
import http from "@/ultils/axios/axiosCustom";

class JobPostActivityService {
    async updateJobPostActivityStatus(request: updateJobPostActivityStatusRequest): Promise<boolean> {
        const response = await http.put<boolean>("/job-post-activity", request);
        return response as any;
    }

}

export default new JobPostActivityService();