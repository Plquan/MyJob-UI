const ROUTE_PATH = {
    //auth
    CANDIDATE_LOGIN: '/candidate/login',
    CANDIDATE_REGISTER: '/candidate/register',
    EMPLOYER_LOGIN: '/employer/login',
    EMPLOYER_REGISTER: '/employer/register',

    //home
    HOME: '/',
    JOBS: '/jobs',
    COMPANIES: '/companies',

    //candidate
    CANDIDATE_OVERVIEW: '/ung-vien/tong-quan',
    CANDIDATE_PROFILE: '/ung-vien/ho-so',
    CANDIDATE_MY_COMPANIES: '/candidate/cong-ty-cua-toi',
    CANDIDATE_ONLINE_RESUME: '/candidate/online-resume',

    //company
    COMPANY_DETAIL: '/company-detail/:companyId',

    //job
    JOB_DETAIL: '/job-detail',


    //employer
    EMPLOYER_DASHBOARD: '/employer',
    EMPLOYER_COMPANY: '/employer/company',
    EMPLOYER_JOB_POST: '/employer/job-post',

    //admin
    ADMIN_DASHBOARD: '/admin/dashboard',
    ADMIN_MANAGE_ROLE: '/admin/manage-role',
    ADMIN_MANAGE_PACKAGE: '/admin/manage-package',
    ADMIN_MANAGE_USER: '/admin/manage-user',

    //packages
    PACKAGES: '/packages'

  }

export default ROUTE_PATH
