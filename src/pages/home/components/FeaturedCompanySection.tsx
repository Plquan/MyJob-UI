import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Carousel, Spin } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../stores';
import { companyActions } from '../../../stores/companyStore/companyReducer';
import ROUTE_PATH from '../../../routes/routePath';
import { FileType } from '../../../constant/fileType';
import type { ICompanyWithImagesData } from '../../../types/company/CompanyType';

const getCompanyLogo = (company: ICompanyWithImagesData): string => {
  const logoImage = company.images?.find(img => img.fileType === FileType.LOGO);
  return logoImage?.url || '/assets/vinhuni.png';
};

export default function FeaturedCompanySection() {
  const dispatch = useDispatch<AppDispatch>();
  const { featuredCompanies, loadingFeaturedCompanies } = useSelector(
    (state: RootState) => state.companyStore
  );

  useEffect(() => {
    dispatch(companyActions.getFeaturedCompanies(12));
  }, [dispatch]);
  const arrowStyle = "absolute top-[40%] -translate-y-1/2 w-10 h-10 flex items-center justify-center text-black text-xl rounded-full hover:bg-gray-100 z-10";

  // Mũi tên trái
  const PrevArrow = (props: any) => (
    <div className={`${arrowStyle} left-[-35px]`} onClick={props.onClick}>
      <LeftOutlined />
    </div>
  );
  
  // Mũi tên phải
  const NextArrow = (props: any) => (
    <div className={`${arrowStyle} right-[-35px]`} onClick={props.onClick}>
      <RightOutlined />
    </div>
  );
  
  const navigate = useNavigate();

  return (
    <section className="bg-white py-16 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Công ty nổi bật</h2>

        {loadingFeaturedCompanies ? (
          <div className="flex justify-center py-10">
            <Spin size="large" />
          </div>
        ) : featuredCompanies.length > 0 ? (
          <Carousel
            slidesToShow={4}
            slidesToScroll={4}
            autoplay
            arrows
            dots={false}
            prevArrow={<PrevArrow />}
            nextArrow={<NextArrow />}
          >
            {featuredCompanies.map((company) => (
              <div key={company.company.id} className="flex justify-center">
                <div className="bg-white mb-10 mx-2 rounded-xl border border-gray-200 shadow-md p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(ROUTE_PATH.COMPANY_DETAIL.replace(':companyId', company.company.id.toString()))}>
                  <img
                    src={getCompanyLogo(company)}
                    alt={company.company.companyName}
                    className="w-16 h-16 object-contain mb-3"
                  />
                  <div className="font-semibold text-lg mb-1 w-full truncate" title={company.company.companyName}>
                    {company.company.companyName}
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="text-center py-10 text-gray-500">
            Chưa có công ty nổi bật
          </div>
        )}

        <div className="flex justify-center mt-6">
          <Button className="bg-[#6A5ACD]! text-white!  hover:opacity-90 transition" onClick={() => navigate(ROUTE_PATH.COMPANIES)}>
            Xem thêm
          </Button>
        </div>
      </div>
    </section>
  );
}
