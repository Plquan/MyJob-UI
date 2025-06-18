import {
    Button,
  } from "antd";

  import { useState } from "react";
import OnelineProfilePage from "./online-profile";
import { ProfilePage } from "./profile";
  
  export default function CandidateProfilePage() {
    const [editMode, setEditMode] = useState(true)
  
    return (
      <>
        {editMode ? (
         <ProfilePage onEdit={() => setEditMode(false)} />
        ) : (          
            <div className="">
            <Button
              type="default"
              onClick={() => setEditMode(true)}
              className="mb-4!"
            >
              ← Quay lại
            </Button>
            <OnelineProfilePage />
          </div>
        )}
      </>
    );
  }
  