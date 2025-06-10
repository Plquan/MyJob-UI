export const mapRole = (roleName: string): string => {
    const map: Record<string, string> = {
      ADMIN: 'Quản trị viên',
      CANDIDATE: 'Người tìm việc',
      EMPLOYER: 'Nhà tuyển dụng',
    }
  
    return map[roleName] || roleName;
  };