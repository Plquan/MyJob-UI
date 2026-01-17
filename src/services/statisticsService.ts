import axiosCustom from '@/ultils/axios/axiosCustom';
import {
  IStatsDto,
  IUserChartDataDto,
  IJobPostChartDataDto,
  ITopCareerDto,
  IApplicationChartDataDto,
  IRevenuePackageChartDataDto,
  IDashboardStatsDto,
  IStatisticsQueryParams,
} from '@/types/statistics/StatisticsType';

class StatisticsService {
  async getStats(params?: IStatisticsQueryParams): Promise<IStatsDto> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    const response = await axiosCustom.get<IStatsDto>(`/statistics/stats${queryString}`);
    return response as any;
  }

  async getUserChart(params?: IStatisticsQueryParams): Promise<IUserChartDataDto[]> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    const response = await axiosCustom.get<IUserChartDataDto[]>(`/statistics/user-chart${queryString}`);
    return response as any;
  }

  async getJobPostChart(params?: IStatisticsQueryParams): Promise<IJobPostChartDataDto[]> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    const response = await axiosCustom.get<IJobPostChartDataDto[]>(`/statistics/job-post-chart${queryString}`);
    return response as any;
  }

  async getTopCareers(params?: IStatisticsQueryParams): Promise<ITopCareerDto[]> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    const response = await axiosCustom.get<ITopCareerDto[]>(`/statistics/top-careers${queryString}`);
    return response as any;
  }

  async getApplicationChart(params?: IStatisticsQueryParams): Promise<IApplicationChartDataDto[]> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    const response = await axiosCustom.get<IApplicationChartDataDto[]>(`/statistics/application-chart${queryString}`);
    return response as any;
  }

  async getRevenuePackageChart(params?: IStatisticsQueryParams): Promise<IRevenuePackageChartDataDto[]> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    const response = await axiosCustom.get<IRevenuePackageChartDataDto[]>(`/statistics/revenue-package-chart${queryString}`);
    return response as any;
  }

  async getDashboardStats(params?: IStatisticsQueryParams): Promise<IDashboardStatsDto> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    const response = await axiosCustom.get<IDashboardStatsDto>(`/statistics/dashboard${queryString}`);
    return response as any;
  }
}

export default new StatisticsService();

