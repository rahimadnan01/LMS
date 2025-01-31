import React from "react";
import { profileData } from "../index.js";
const Profile = () => {
  return (
    <div className=" sm-flex-col w-[65%] h-[100%]  ml-10  overflow-y-auto hide-scrollbar  items-center justify-center shadow-2xl">
      <div className=" w-full h-[15%] flex items-center pl-8 pt-5  ">
        <h1 className="text-1xl font-bold">My Profile</h1>
      </div>
      <div className="w-full h-[80%]  p-5 ">
        {profileData.map((profile) => (
          <div className="sm-flex-col flex justify-evenly text-[#6b7385] mb-2">
            <div className="sm-w-full w-[20%]">
              <p>{profile.headline}</p>
            </div>
            <div className="sm-w-full w-[70%]">
              <p>{profile.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
