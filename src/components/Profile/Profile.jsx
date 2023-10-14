import React, { useState, useEffect } from "react";
import { Button, Input, Label } from "reactstrap";
import Header from "../Header/Header";
import { Edit } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserprofileAsync,
  profileEditAsync,
} from "../../redux/slice/ProfileSlice";

const Profile = () => {
  const profileData = useSelector((state) => state.profile?.profile);
  const status = useSelector((state) => state.profile?.status);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(profileData?.name);
  const [editedEmail, setEditedEmail] = useState(profileData?.email);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserprofileAsync());
    }
  }, [status, dispatch]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    // Check if there are changes in the name or email
    if (editedName !== profileData.name || editedEmail !== profileData.email) {
      // Dispatch the edited data to update the profile
      await dispatch(profileEditAsync({ name: editedName, email: editedEmail }));
      
      // After successfully updating the profile, fetch the user profile again
      dispatch(fetchUserprofileAsync());
    }
    setIsEditing(false);
  };
  

  return (
    <div className="">
      <Header />
      <div className="container pt-5">
        <div className="border p-4">
          <div className="d-flex justify-content-between py-3">
            <h4 className="text-center">MY PROFILE</h4>
            <div className="d-flex"></div>
            <p
              className="fs-5 d-flex gap-2 justify-content-center align-items-center"
              style={{ cursor: "pointer" }}
              onClick={handleEditClick}
            >
              <Edit size={16} className="text-primary" />
              Edit
            </p>
          </div>

          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            value={isEditing ? editedName : profileData?.name}
            onChange={(e) => setEditedName(e.target.value)}
            className="mb-3"
            disabled={!isEditing}
          />
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            value={isEditing ? editedEmail : profileData?.email}
            onChange={(e) => setEditedEmail(e.target.value)}
            className="mb-3"
            disabled={!isEditing}
          />
          <Label for="mobile">Mobile</Label>
          <Input
            type="number"
            name="mobile"
            value={profileData.mobile}
            className="mb-3"
            disabled
          />
          <Button
            className="mt-3 text-right"
            color="success"
            onClick={handleSaveChanges}
            disabled={
              !isEditing ||
              (editedName === profileData.name &&
                editedEmail === profileData.email)
            }
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
