import ExperienceCard from "./components/ExperienceCard";
import LanguageCard from "./components/LanguageCard";
import ProfileCard from "./components/ProfileCard";
import ResumeCard from "./components/ResumeCard";
import OnlineResumeMenu from "./components/OnlineResumeMenu";
import EducationCard from "./components/EducationCard";
import SkillCard from "./components/SkillCard";
import CertificateCard from "./components/CertificateCard";

const OnelineProfilePage = () => {
  return (
    <div className="flex flex-row gap-5 mb-15">
      <div className="flex flex-col gap-4 flex-1">
        <div id="profile">
          <ProfileCard/>
        </div>
        <div id="resume">
          <ResumeCard/>
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
      <div className="sticky top-8 h-fit">
        <OnlineResumeMenu />
      </div>
    </div>
  )
}
export default OnelineProfilePage;
