import { IOnlineResume } from "@/types/resume/ResumeType";
import http from "@/ultils/axios/axiosCustom";

class ResumeService {
    async getResumeForDownload(resumeId: number): Promise<IOnlineResume> {
        const response = await http.get<IOnlineResume>(`/resume/get-resume-for-download/${resumeId}`);
        return response as any;
    }

}

export default new ResumeService();