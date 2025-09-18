import { Spin, type UploadFile } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompanyInfoForm from "./components/companyInfoForm";
import Logo from "./components/logo";
import { companyActions } from "../../../../stores/companyStore/companyReducer";
import type { RootState, AppDispatch } from "../../../../stores";
import CoverImage from "./components/coverImage";

const CompanyInfoPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { companyInfo, logo, coverImage, loading } = useSelector((state: RootState) => state.companyStore);

    const [logoFile, setLogoFile] = useState<UploadFile[]>([]);
    const [coverImageFile, setCoverImageFile] = useState<UploadFile[]>([]);


    const handleUploadCoverImage = async (options:any) => {
        const { file } = options;
        var formData = new FormData();
        formData.append('file', file);
        dispatch(companyActions.uploadCompanyCoverImage(formData));
      };

    const handleUploadLogo = async (options:any) => {
        const { file } = options;
        var formData = new FormData();
        formData.append('file', file);
        dispatch(companyActions.uploadCompanyLogo(formData));
      };

    return (
        <Spin spinning={loading}>
            <Logo 
                logoFile={logoFile} 
                onLogoUpload={handleUploadLogo}
                logoUrl={logo}
            />
            <CoverImage 
                coverImageFile={coverImageFile} 
                onCoverImageUpload={handleUploadCoverImage}
                coverImageUrl={coverImage}
            />
            <CompanyInfoForm companyData={companyInfo} />
        </Spin>
    )
}

export default CompanyInfoPage;