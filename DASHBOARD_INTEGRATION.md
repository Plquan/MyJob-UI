# Dashboard API Integration - Hướng dẫn

## ✅ Đã Hoàn Thành

### 1. Frontend Files Created/Updated

#### Created Files:
- ✅ `src/types/statistics/StatisticsType.ts` - TypeScript interfaces cho tất cả data types
- ✅ `src/services/statisticsService.ts` - Service để gọi API statistics

#### Updated Files:
- ✅ `src/pages/admin/dashboard/index.tsx` - Dashboard component đã tích hợp API

### 2. Thay Đổi Chính

#### Dashboard Component (`src/pages/admin/dashboard/index.tsx`)

**Trước (Hardcoded Data):**
```tsx
const stats = [
    { title: 'Ứng viên', value: 27820, ... },
    { title: 'Nhà tuyển dụng', value: 4828, ... },
    ...
];
```

**Sau (Dynamic Data from API):**
```tsx
const [loading, setLoading] = useState(true);
const [dashboardData, setDashboardData] = useState<IDashboardStatsDto | null>(null);

useEffect(() => {
    fetchDashboardData();
}, []);

const stats = dashboardData ? [
    { title: 'Ứng viên', value: dashboardData.stats.jobSeekers, ... },
    { title: 'Nhà tuyển dụng', value: dashboardData.stats.employers, ... },
    ...
] : [];
```

### 3. Features Mới

#### ✅ Loading State
- Hiển thị Spin component khi đang load data
- Message "Đang tải dữ liệu thống kê..."

#### ✅ Error Handling
- Catch errors và hiển thị message error
- Fallback to empty arrays nếu không có data

#### ✅ Date Range Filtering
Tất cả 5 biểu đồ đều có date range picker hoạt động:
- Biểu đồ người dùng
- Biểu đồ bài đăng tuyển dụng
- Top 5 ngành nghề
- Biểu đồ lượt ứng tuyển
- Doanh thu theo gói dịch vụ

Khi chọn date range, API sẽ tự động fetch lại data với filters.

### 4. API Endpoints Được Sử Dụng

```typescript
// Main endpoint - lấy tất cả data một lần
GET /api/statistics/dashboard
GET /api/statistics/dashboard?startDate=2024-01-01&endDate=2024-12-31
```

### 5. Data Flow

```
User opens dashboard
    ↓
useEffect() triggers
    ↓
fetchDashboardData()
    ↓
statisticsService.getDashboardStats()
    ↓
API: GET /api/statistics/dashboard
    ↓
Backend queries database
    ↓
Returns IDashboardStatsDto
    ↓
setDashboardData(data)
    ↓
Component re-renders with real data
    ↓
Charts display real data
```

### 6. Không Phá Vỡ Giao Diện

#### ✅ Giữ nguyên:
- Layout và structure
- Tất cả Card components
- Chart configurations
- Colors và styling
- DatePicker components
- Responsive grid (Row/Col)

#### ✅ Chỉ thay đổi:
- Data source (từ hardcoded → API)
- Thêm loading state
- Thêm error handling
- Date filters hoạt động thực sự

### 7. Cách Sử Dụng

#### Bước 1: Chạy Backend API
```bash
cd MyJob-API
npm run dev
```

#### Bước 2: Chạy Frontend
```bash
cd MyJob-UI
npm run dev
```

#### Bước 3: Truy cập Dashboard
1. Login với tài khoản Admin
2. Navigate to `/admin/dashboard`
3. Dashboard sẽ tự động load dữ liệu từ API

### 8. Date Filter Usage

#### Chọn Date Range:
1. Click vào date picker icon ở mỗi biểu đồ
2. Chọn start date và end date
3. Data tự động refresh với date range mới
4. Click "Clear" để xóa filter và hiển thị tất cả data

#### Presets Available:
- Today
- Yesterday
- Last 7 Days
- Last 30 Days
- This Month
- Last Month

### 9. API Response Structure

```typescript
{
  stats: {
    jobSeekers: 27820,      // Số ứng viên
    employers: 4828,        // Số nhà tuyển dụng
    jobPosts: 8779,         // Số bài đăng
    applications: 36,       // Số lượt ứng tuyển
    revenue: 125000000      // Tổng doanh thu (VNĐ)
  },
  userChart: [              // Biểu đồ người dùng theo tháng
    { date: "2024-01", jobSeeker: 1.0, employer: 0.8 }
  ],
  jobPostChart: [           // Biểu đồ bài đăng theo status
    { month: "08/2023", status: "Chờ duyệt", value: 50 }
  ],
  topCareers: [             // Top 5 ngành nghề
    { type: "IT/Software", value: 35 }
  ],
  applicationChart: [       // Lượt ứng tuyển theo tháng
    { month: "01/2024", value: 2.0 }
  ],
  revenuePackageChart: [    // Doanh thu theo gói
    { packageName: "Cơ bản", revenue: 25000000 }
  ]
}
```

### 10. Testing

#### Test Loading State:
1. Open Dashboard
2. Check if Spin appears briefly
3. Data should load within 1-2 seconds

#### Test Real Data:
1. Check if numbers match database records
2. Verify charts display correctly
3. Check if all 5 stats cards show real numbers

#### Test Date Filtering:
1. Select a date range on any chart
2. Verify data updates
3. Try clearing the filter
4. Verify all data returns

#### Test Error Handling:
1. Stop backend server
2. Open dashboard
3. Should show error message
4. Restart server
5. Refresh page - should work

### 11. Notes

- ⚠️ Backend API phải chạy trước khi test frontend
- ⚠️ User phải đăng nhập với role ADMIN để truy cập dashboard
- ⚠️ API endpoint: `/api/statistics/dashboard` yêu cầu authentication
- ✅ Giao diện giữ nguyên 100% như ban đầu
- ✅ Chỉ data source thay đổi từ hardcoded sang API
- ✅ Performance optimized: Fetch tất cả data trong 1 API call

### 12. Troubleshooting

**Nếu không load được data:**
1. Check backend đang chạy: `http://localhost:5001/api/statistics/dashboard`
2. Check authentication token trong localStorage
3. Check console logs for errors
4. Verify database có data

**Nếu charts không hiển thị:**
1. Check nếu data array rỗng
2. Verify data format match với chart config
3. Check console for chart rendering errors

**Nếu date filter không hoạt động:**
1. Check date format (YYYY-MM-DD)
2. Verify API receives correct query params
3. Check backend logs for query execution

### 13. Future Enhancements (Optional)

- [ ] Add individual chart refresh buttons
- [ ] Add export to PDF/Excel functionality
- [ ] Add real-time updates with WebSocket
- [ ] Add comparison with previous period
- [ ] Add drill-down details on chart clicks
- [ ] Add more date range presets
- [ ] Add data caching for better performance

