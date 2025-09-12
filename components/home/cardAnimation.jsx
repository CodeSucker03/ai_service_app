import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const cardAnimation = (target, trigger) => {
  gsap.from(target, {
    opacity: 0,
    x: -200,
    duration: 1,
    ease: "power3.inOut",
    stagger: 0.3,
    scrollTrigger: {
      trigger: trigger,
      start: "top 80%",
    },
  });
};
