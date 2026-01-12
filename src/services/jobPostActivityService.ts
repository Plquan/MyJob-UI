import { updateJobPostActivityStatusRequest } from "@/types/job-post-activity/JobPostActivity";
import http from "@/ultils/axios/axiosCustom";

class JobPostActivityService {
    async updateJobPostActivityStatus(request: updateJobPostActivityStatusRequest): Promise<boolean> {
        const response = await http.put<boolean>("/job-post-activity", request);
        return response as any;
    }

    async sendEmailToCandidate(request: { to: string; subject: string; content: string }): Promise<boolean> {
        const response = await http.post<boolean>("/job-post-activity/send-email", request);
        return response as any;
    }

}

export default new JobPostActivityService();