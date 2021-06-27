import React, { useContext, useState } from "react";
import List from "./List";
import { Context } from "../context";
import UserProfile from "./UserProfile";

const UserList = () => {
  const { state } = useContext(Context);
  const { user } = state;
  return (
    <div className="container">
      <div className="user-list_container">
        <div className="table-heading">
          <h3>Name</h3>
          <h3>Email</h3>
          <h3>Contact</h3>
        </div>
        {user && user.length > 0 ? (
          <>
            {user.map((data) => (
              <List data={data} />
            ))}
          </>
        ) : (
          <>
            {" "}
            <h1>No Record Available</h1>
          </>
        )}
      </div>
      {/* <div className="user-profile_container">
        <UserProfile profileData={profileData} />
      </div> */}
    </div>
  );
};

export default UserList;
