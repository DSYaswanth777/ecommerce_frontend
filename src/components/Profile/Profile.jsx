import React, { useState, useEffect } from "react";
import { Button, Input, Label } from "reactstrap";
import { Edit } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  changePasswordAsync,
  fetchUserprofileAsync,
  profileEditAsync,
} from "../../redux/slice/profileSlice";
import { Shimmer } from "react-shimmer";
import { useForm, Controller } from "react-hook-form";
import { profileEditSchema } from "../../schema/validationSchema";

const Profile = () => {
  const profileData = useSelector((state) => state.profile?.profile);
  const status = useSelector((state) => state.profile?.status);
  const dispatch = useDispatch();
  const [editedEmail, setEditedEmail] = useState(profileData?.email);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: profileData?.name,
      email: profileData?.email,
    },
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserprofileAsync());
    }
  }, [status, dispatch]);

  const handleEditClick = () => {
    setIsEditing(true);
    setIsChangingPassword(false);
  };

  const handleSaveChanges = async (data) => {
    if (!isEditing) return;

    if (data.name !== profileData.name || data.email !== profileData.email) {
      await dispatch(profileEditAsync({ name: data.name, email: data.email }));
      dispatch(fetchUserprofileAsync());
    }
    setIsEditing(false);
  };

  const handleChangePassword = async () => {
    await dispatch(
      changePasswordAsync({
        currentPassword: currentPassword,
        newPassword: newPassword,
      })
    );
  };

  const handleChangePasswordClick = () => {
    setIsEditing(false); // Disable profile editing
    setIsChangingPassword(true); // Enable password change mode
  };
  return (
    <>
      <div className="container pt-5 pb-5">
        <div className="border p-4">
          <div className="d-flex justify-content-between py-3">
            <h4 className="text-center"> PROFILE</h4>
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
          {!isChangingPassword ? (
            <>
              <Label for="name">Name</Label>
              <Controller
                name="name"
                control={control}
                defaultValue={profileData?.name || ""}
                rules={profileEditSchema.name}
                render={({ field }) => (
                  <>
                    {status === "loading" ? (
                      <Shimmer width={200} height={20} />
                    ) : (
                      <Input
                        type="text"
                        name="name"
                        {...field}
                        value={
                          isEditing ? field.value : profileData?.name || ""
                        }
                        className={`mb-3 ${errors.name ? "is-invalid" : ""}`}
                        disabled={!isEditing}
                      />
                    )}
                    {errors.name && (
                      <div className="invalid-feedback">
                        {errors.name.message}
                      </div>
                    )}
                  </>
                )}
              />

              <Label for="email">Email</Label>
              <Controller
                name="email"
                control={control}
                defaultValue={profileData?.email || ""}
                rules={profileEditSchema.email}
                render={({ field }) => (
                  <>
                    {status === "loading" ? (
                      <Shimmer width={200} height={20} />
                    ) : (
                      <Input
                        type="text"
                        name="email"
                        {...field}
                        value={
                          isEditing ? field.value : profileData?.email || ""
                        }
                        className={`mb-3 ${errors.email ? "is-invalid" : ""}`}
                        disabled={!isEditing}
                      />
                    )}
                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email.message}
                      </div>
                    )}
                  </>
                )}
              />

              <Label for="mobile">Mobile</Label>
              <Input
                type="number"
                name="mobile"
                value={profileData.mobile || ""}
                className="mb-3"
                disabled
              />
              <Button
                className=" text-right"
                color="success"
                onClick={handleSubmit(handleSaveChanges)}
                disabled={
                  !isEditing ||
                  (editedEmail === profileData.name &&
                    editedEmail === profileData.email)
                }
              >
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Label for="currentPassword">Current Password</Label>
              <Input
                type="password"
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mb-3"
              />

              <Label for="newPassword">New Password</Label>
              <Input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mb-3"
              />
            </>
          )}

          {!isChangingPassword ? (
            <Button
              color="success"
              className="ms-3"
              onClick={handleChangePasswordClick}
              disabled={isChangingPassword}
            >
              Change Password
            </Button>
          ) : (
            <Button color="success" className="" onClick={handleChangePassword}>
              Save
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
