import ExperienceCard from "./components/ExperienceCard";
import AdvancedSkillCard from "./components/AdvancedSkillCard";
import LanguageCard from "./components/LanguageCard";
import CertificateSkillCard from "./components/CertificateSkillCard";
import ProfileCard from "./components/ProfileCard";
import GeneralInfoCard from "./components/GeneralInfoCard";

const OnelineProfilePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <ProfileCard/>
      <GeneralInfoCard/>
      <ExperienceCard />
      <LanguageCard/>
      <CertificateSkillCard/>
      <AdvancedSkillCard />
    </div>
  );
};
export default OnelineProfilePage;
