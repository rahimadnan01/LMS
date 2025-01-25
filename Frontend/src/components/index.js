import { gsap } from "gsap";

// data
const listItems = ["Home", "Courses", "Dashboard", "About us", "Article"];

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

export { listItems };
