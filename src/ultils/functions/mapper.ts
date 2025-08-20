export const mapRole = (roleName: string): string => {
    const map: Record<string, string> = {
      ADMIN: 'Quản trị viên',
      CANDIDATE: 'Người tìm việc',
      EMPLOYER: 'Nhà tuyển dụng',
    }
  
    return map[roleName] || roleName;
  }

  export const mapGender = (gender: number |  null | undefined): string | undefined => {
    if (!gender) return undefined; 
    const map: Record<number, string> = {
      1: 'Nam',
      2: 'Nữ',
      3: 'Khác',
    }
    return map[gender]
  }
  export const mapMaritalStatus = (maritalStatus: number |  null | undefined): string | undefined => {
    if (!maritalStatus) return undefined; 
    const map: Record<number, string> = {
      1: 'Độc thân',
      2: 'Đã kết hôn',
    }
  
    return map[maritalStatus]
  } 