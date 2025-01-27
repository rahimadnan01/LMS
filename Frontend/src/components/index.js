import { gsap } from "gsap";
const tl = gsap.timeline();
// data
const listItems = ["Home", "Courses", "Dashboard", "About us", "Article"];
const num = 5;
const reviews = [];
for (let i = 1; i <= num; i++) {
  reviews.push(i);
}
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
    duration: 0.5,
    ease: "expoScale(0.5,7,none)",
  })
    .call(() => setText(`→ Start Learning`))
    .to(btnRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "expoScale(0.5,7,none)",
    });
};
export const mouseLeave = (btnRef, setText) => {
  tl.to(btnRef.current, {
    opacity: 0,
    duration: 0.5,
    ease: "expoScale(0.5,7,none)",
  })
    .call(() => setText(` Start Learning →`))
    .to(btnRef.current, {
      opacity: 1,
      duration: 0.5,
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

export { listItems, reviews };
