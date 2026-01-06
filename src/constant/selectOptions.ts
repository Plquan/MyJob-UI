export const POSITION_OPTIONS = [
  { value: 1, label: "Nhân viên" },
  { value: 2, label: "Trưởng nhóm" },
  { value: 3, label: "Quản lý" },
]

export const ACADEMICLEVEL_OPTIONS = [
  { value: 1, label: "Đại học" },
  { value: 2, label: "Cao đẳng" },
  { value: 3, label: "Trung cấp" },
]

export const EXPERIENCE_OPTIONS = [
  { value: 1, label: "Chưa có kinh nghiệm" },
  { value: 2, label: "1 năm kinh nghiệm" },
  { value: 3, label: "2 năm kinh nghiệm" },
  { value: 4, label: "3+ năm kinh nghiệm" },
]

export const WORKPLACE_OPTIONS = [
  { value: 1, label: "Làm việc tại văn phòng" },
  { value: 2, label: "Làm việc từ xa (Remote)" },
  { value: 3, label: "Làm việc linh hoạt (Hybrid)" },
]

export const JOBTYPE_OPTIONS = [
  { value: 1, label: "Toàn thời gian (Full-time)" },
  { value: 2, label: "Bán thời gian (Part-time)" },
  { value: 3, label: "Thực tập (Intern)" },
  { value: 4, label: "Freelance (Tự do)" },
]

export const LANGUAGE_OPTIONS = [
  { value: 1, label: "Anh" },
  { value: 2, label: "Nhật" },
  { value: 3, label: "Tây ba nha" },
  { value: 4, label: "Trung quốc" }
]

export const MARTIALSTATUS_OPTIONS = [
  { value: 1, label: "Độc thân" },
  { value: 2, label: "Đã kết hôn" }
]

export const GENDER_OPTIONS = [
  { value: 1, label: "Nam" },
  { value: 2, label: "Nữ" },
  { value: 3, label: "Khác" }
]

export const JOB_POST_STATUS_OPTIONS = [
  { value: 1, label: "Chờ phê duyệt" },
  { value: 2, label: "Đã phê duyệt" },
  { value: 3, label: "Từ chối" },
  { value: 4, label: "Đã đóng" },
];

export const SALARY_RANGE_OPTIONS = [
  { value: { min: 0, max: 10000000 }, label: "Dưới 10 triệu" },
  { value: { min: 10000000, max: 15000000 }, label: "10 - 15 triệu" },
  { value: { min: 15000000, max: 20000000 }, label: "15 - 20 triệu" },
  { value: { min: 20000000, max: 30000000 }, label: "20 - 30 triệu" },
  { value: { min: 30000000, max: 50000000 }, label: "30 - 50 triệu" },
  { value: { min: 50000000, max: 999999999 }, label: "Trên 50 triệu" },
];

export const POSTED_WITHIN_OPTIONS = [
  { value: 1, label: "Hôm nay" },
  { value: 3, label: "3 ngày qua" },
  { value: 7, label: "1 tuần qua" },
  { value: 30, label: "1 tháng qua" },
];
