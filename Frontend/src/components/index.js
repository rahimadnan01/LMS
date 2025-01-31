import { gsap } from "gsap";
const tl = gsap.timeline();
//Dummy data
const listItems = ["Home", "Courses", "Dashboard", "About us", "Article"];
const num = 5;
const reviews = [];
for (let i = 1; i <= num; i++) {
  reviews.push(i);
}

const profileData = [
  { headline: "Registration Date", details: "February 25, 2025 6:01 am" },
  { headline: "First Name", details: "John" },
  { headline: "Last Name", details: "Doe" },
  { headline: "Username", details: "instructor" },
  { headline: "Email", details: "example@gmail.com" },
  { headline: "Phone Number", details: "+1-202-555-0174" },
  { headline: "Skill/Occupation", details: "Application Developer" },
  {
    headline: "Biography",
    details:
      "I'm the Front-End Developer for #Rainbow IT in Bangladesh, OR. I have serious passion for UI effects, animations and creating intuitive, dynamic user experiences.",
  },
];
// animations
export const mouseEnterBtn = (btnRef) => {
  const letters = btnRef.current.querySelectorAll("span");

  gsap.fromTo(
    letters,
    { opacity: 0, scale: 0.5, y: 100 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "bounce.out",
    }
  );
};

export const changeText = (btnRef, setText) => {
  tl.to(btnRef.current, {
    opacity: 0,
    duration: 0.3,
    ease: "expoScale(0.5,7,none)",
  })
    .call(() => setText(`→ Start Learning`))
    .to(btnRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "expoScale(0.5,7,none)",
    });
};
export const mouseLeave = (btnRef, setText) => {
  tl.to(btnRef.current, {
    opacity: 0,
    duration: 0.3,
    ease: "expoScale(0.5,7,none)",
  })
    .call(() => setText(` Start Learning →`))
    .to(btnRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "expoScale(0.5,7,none)",
    });
};
export const scaleBig = (courseRef) => {
  gsap.to(courseRef.current, {
    scale: 1.1,
    duration: 0.5,
  });
};
export const scaleNormal = (courseRef) => {
  gsap.to(courseRef.current, {
    scale: 1,
    duration: 0.5,
  });
};

export { listItems, reviews, profileData };
