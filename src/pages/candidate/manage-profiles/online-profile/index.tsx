import ExperienceCard from "./components/ExperienceCard";
import AdvancedSkillCard from "./components/AdvancedSkillCard";
import LanguageCard from "./components/LanguageCard";
import CertificateSkillCard from "./components/CertificateSkillCard";
import ProfileCard from "./components/ProfileCard";
import ResumeCard from "./components/ResumeCard";
import OnlineResumeMenu from "./components/OnlineResumeMenu";
import EducationCard from "./components/EducationCard";

const OnelineProfilePage = () => {
  return (
    <div className="flex flex-row gap-5">
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
          <CertificateSkillCard/>
        </div>
        <div id="language">
          <LanguageCard/>
        </div>
        <div id="skill">
          <AdvancedSkillCard />
        </div>
      </div>
      <div className="sticky top-8 h-fit">
        <OnlineResumeMenu />
      </div>
    </div>
  )
}
export default OnelineProfilePage;
