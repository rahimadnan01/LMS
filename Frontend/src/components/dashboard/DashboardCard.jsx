import React from "react";

const DashboardCard = () => {
  return (
    <div className="sm-w sm-h-1 w-[30%] h-[60%] py-3 bg-orange-200 rounded-md flex flex-col items-center justify-evenly">
      {/* logo */}
      <div className="w-[5rem] h-[5rem] rounded-full bg-orange-300 flex justify-center items-center">
        <i className="fa-regular fa-user text-2xl text-orange-400"></i>
      </div>
      {/* Data */}
      <div className="text-center">
        <p className="font-bold text-[2rem] text-orange-400">30</p>
        <p className="text-orange-400">Courses</p>
      </div>
    </div>
  );
};

export default DashboardCard;
