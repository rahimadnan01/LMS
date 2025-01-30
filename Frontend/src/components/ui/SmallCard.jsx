import React, { useRef } from "react";
import { course_elegant01, avatar_02 } from "../../assets/index.js";
import { reviews, scaleBig, scaleNormal } from "../index.js";
import ListItem from "../navigation/ListItem.jsx";
import TagButton from "../ui/TagButton.jsx";
import ListUnderline from "../navigation/ListUnderline.jsx";
function SmallCard({ classes }) {
  const courseRef = useRef(null);
  const handleHover = () => {
    scaleBig(courseRef);
  };
  const handleMouseLeave = () => {
    scaleNormal(courseRef);
  };
  return (
    <>
      {/* course card */}
      <div
        ref={courseRef}
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
        className={`sm-w md:w-[80%]  lg:w-[30%] lg:h-[30%] bg-white  mt-8 flex flex-col rounded-md overflow-hidden  shadow-xl  pb-4 ${classes}`}
      >
        {/* left */}
        <div className="lg:w-full lg:h-1/2 ">
          <img
            className="object-cover object-center"
            src={course_elegant01}
            alt=""
          />
        </div>
        {/* right */}
        <div className="lg:w-full lg:h-1/2  ">
          {/* reviews */}
          <div className="lg:w-full lg:h-8  py-2 px-5 flex items-center justify-between">
            <div className="flex">
              <span>
                {reviews.map((review, index) => (
                  <i
                    key={index}
                    className="fa-solid fa-star text-[1rem] text-[#FFD43B] mr-[2px]"
                  ></i>
                ))}
              </span>
              <p className="ml-1 text-[14px] font-semibold text-[#6b7385]">
                (5 reviews)
              </p>
            </div>

            <ListItem>
              <i className="fa-regular fa-bookmark"></i>
            </ListItem>
          </div>
          <ListItem
            classes={" sm-text text-1xl font-bold  mr-[8rem] my-3 ml-5"}
          >
            React Front To Back
          </ListItem>
          <div className="px-5 flex ">
            <p className="leading-4 text-[14px] text-[#6b7385] mr-2">
              <i className="fa-solid fa-book-open"></i> Lessons
            </p>
            <p className="leading-4 text-[14px] text-[#6b7385]">
              <i className="fa-regular fa-user"></i> Users
            </p>
          </div>
          <div className="px-5 my-4 flex items-center justify-start min-h-[30%] flex-wrap  ">
            {reviews.map((review, index) => (
              <TagButton key={index}>Html</TagButton>
            ))}
          </div>
          <div className="w-full  ml-5 flex items-center">
            <div className=" h-10 w-10 max-w-10 border-3 border-[#2f57ef21]  object-center rounded-full overflow-hidden">
              <img className="h-full w-full" src={avatar_02} alt="" />
            </div>
            <div className="ml-3">
              By <ListItem>Angela</ListItem> in <ListItem>Development</ListItem>
            </div>
          </div>
          <div className="w-full ml-5  flex items-center justify-between pr-10">
            <div className="flex items-center">
              <p className="text-[24px] font-bold text-[#6b7385]">$30</p>
              <p className="text-[20px] font-semibold opacity-[0.4] text-[#6b7385] line-through ml-2">
                $50
              </p>
            </div>
            <ListUnderline>
              <i className="fa-solid fa-chalkboard-user mr-2"></i>Begin Learning
            </ListUnderline>
          </div>
        </div>
      </div>
    </>
  );
}

export default SmallCard;
