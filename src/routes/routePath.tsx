const ROUTE_PATH = {
  //auth
  CANDIDATE_LOGIN: '/candidate/login',
  CANDIDATE_REGISTER: '/candidate/register',
  EMPLOYER_LOGIN: '/employer/login',
  EMPLOYER_REGISTER: '/employer/register',
  ADMIN_LOGIN: '/admin/login',

  //home
  HOME: '/',
  JOBS: '/jobs',
  COMPANIES: '/companies',
  GUIDE: '/guide',

  //candidate
  CANDIDATE_OVERVIEW: '/ung-vien/tong-quan',
  CANDIDATE_PROFILE: '/ung-vien/ho-so',
  CANDIDATE_MY_COMPANIES: '/candidate/cong-ty-cua-toi',
  CANDIDATE_ONLINE_RESUME: '/candidate/online-resume',
  CANDIDATE_MY_APPLIED_JOBS: '/candidate/my-applied-jobs',
  CANDIDATE_NOTIFICATIONS: '/candidate/notifications',
  CHAT: '/chat',

  //company
  COMPANY_DETAIL: '/company-detail/:companyId',

  //job
  JOB_DETAIL: '/jobs/job-detail/:jobPostId',


  //employer
  EMPLOYER_DASHBOARD: '/employer',
  EMPLOYER_COMPANY: '/employer/company',
  EMPLOYER_JOB_POST: '/employer/job-post',
  EMPLOYER_MANAGE_RESUME: '/employer/manage-resume',
  EMPLOYER_RESUME_DETAIL: '/employer/manage-resume/:resumeId',
  EMPLOYER_FIND_CANDIDATE: '/employer/find-candidate',
  EMPLOYER_FIND_CANDIDATE_DETAIL: '/employer/find-candidate/:resumeId',
  EMPLOYER_SAVED_RESUMES: '/employer/saved-resumes',
  EMPLOYER_MANAGE_PACKAGE: '/employer/manage-package',
  EMPLOYER_NOTIFICATIONS: '/employer/notifications',

  //admin
  ADMIN_DASHBOARD: '/admin',
  ADMIN_MANAGE_ROLE: '/admin/manage-role',
  ADMIN_MANAGE_PACKAGE: '/admin/manage-package',
  ADMIN_MANAGE_USER: '/admin/manage-user',
  ADMIN_MANAGE_JOB_POST: '/admin/manage-job-post',
  ADMIN_MANAGE_PROVINCE: '/admin/manage-province',
  ADMIN_MANAGE_CAREER: '/admin/manage-career',

  //packages
  PRODUCTS: '/products',
  PAYMENT_SUCCESS: '/payment/success',
  PAYMENT_CANCEL: '/payment/cancel'

}

export default ROUTE_PATH
