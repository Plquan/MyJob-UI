import ExperienceCard from "./components/ExperienceCard";
import LanguageCard from "./components/LanguageCard";
import ProfileCard from "./components/ProfileCard";
import OnlineResumeMenu from "./components/OnlineResumeMenu";
import EducationCard from "./components/EducationCard";
import SkillCard from "./components/SkillCard";
import CertificateCard from "./components/CertificateCard";
import GeneralInfoCard from "./components/GeneralInfoCard";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../stores";
import { useEffect } from "react";
import { onlineResumeActions } from "../../../stores/onlineResumeStore/onlineResumeReducer";

const OnelineResumePage = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
      dispatch(onlineResumeActions.getOnlineResume())
  },[dispatch])
  
  return (
    <div className="flex flex-row gap-5 mb-15">
      <div className="flex flex-col gap-4 flex-1 pr-[300px]">
        <div id="profile">
          <ProfileCard/>
        </div>
        <div id="resume">
          <GeneralInfoCard/>
        </div>
        <div id="experience">
          <ExperienceCard />
        </div>
        <div id="education">
          <EducationCard />
        </div>
        <div id="certificate">
          <CertificateCard/>
        </div>
        <div id="language">
          <LanguageCard/>
        </div>
        <div id="skill">
          <SkillCard />
        </div>
      </div>
      <div className="fixed right-12 w-[250px]">
        <OnlineResumeMenu />
      </div>
    </div>
  )
}
export default OnelineResumePage
