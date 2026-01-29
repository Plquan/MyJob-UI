import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../stores';
import { packageActions } from '../../stores/packageStore/packageReducer';
import ROUTE_PATH from '../../routes/routePath';

const PaymentRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const isSuccess = location.pathname === ROUTE_PATH.PAYMENT_SUCCESS;
    const isCancel = location.pathname === ROUTE_PATH.PAYMENT_CANCEL;

    if (isSuccess) {
      // Refresh company package info after successful payment
      dispatch(packageActions.getCompanyPackage());
      message.success('Thanh toán thành công! Gói dịch vụ của bạn đã được kích hoạt.');
      // Redirect to manage package page to see updated package info
      navigate(ROUTE_PATH.EMPLOYER_MANAGE_PACKAGE, { replace: true });
    } else if (isCancel) {
      message.warning('Thanh toán đã bị hủy. Vui lòng thử lại nếu bạn muốn tiếp tục.');
      // Redirect to manage package page
      navigate(ROUTE_PATH.EMPLOYER_MANAGE_PACKAGE, { replace: true });
    }
  }, [location.pathname, navigate, dispatch]);

  return null;
};

export default PaymentRedirect;


