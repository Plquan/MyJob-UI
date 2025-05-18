import ProfileCard from "./components/ProfileCard";
import ViewedCard from "./components/ViewedCard";
import AttchedFileCard from "./components/AttchedFileCard";

export const ProfilePage = ({ onEdit }: { onEdit: () => void }) => {
    return (
        <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <ProfileCard onEdit={onEdit} />
          <ViewedCard />
        </div>
        <AttchedFileCard />
      </div>
    )
}