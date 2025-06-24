
import ViewedCard from "./components/ViewedCard";
import AttchedFileCard from "./components/AttachedResumeCard";
import ProfileCard from "./components/ProfileCard";
import { Row, Col } from "antd";

export const ProfilePage = ({ onEdit }: { onEdit: () => void }) => {
    return (
        <>
       <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} md={16}>
          <div className="flex flex-col gap-6">
            <ProfileCard onEdit={onEdit} />
            <AttchedFileCard />
          </div>
        </Col>
        <Col xs={24} md={8}>
          <ViewedCard />
        </Col>
      </Row>

      </>
    )
}