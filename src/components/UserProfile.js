import React from "react";

const UserProfile = ({ profileData }) => {
  console.log("Profile Data", profileData);
  const { avatarUrl, firstname, lastname, email, phone } = profileData;
  return (
    <div className="profile-info">
      <div className="profile-img">
        <img src={avatarUrl} alt={lastname} />
      </div>
      <div>
        <h3>{firstname + lastname}</h3>
        <h3>{email}</h3>
        <h3>{phone}</h3>
      </div>
    </div>
  );
};

export default UserProfile;
