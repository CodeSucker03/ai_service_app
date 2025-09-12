"use client";
import { SplitText } from "gsap/all";
import Tagline from "./Tagline";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Heading = ({ className, title, text, tag }) => {
  const headingRef = useRef(null); // Create a ref

  useGSAP(() => {
    if (headingRef.current) {
      // Split the text of the h2 and p tags within the ref
      const elementsToSplit = headingRef.current.querySelectorAll(".text");
      let split = new SplitText(elementsToSplit, { type: "words" });

      gsap.from(split.words, {
        scrollTrigger: {
          trigger: headingRef.current, // Use the ref as the trigger

          toggleActions: "restart none none none",
        },
        duration: 1,
        ease: "bounce.out",
        autoAlpha: 0,
        stagger: 0.05,
      });
    }
  }, []);
  return (
    <div
      ref={headingRef}
      className={`${className} max-w-[50rem] mx-auto mb-12 lg:mb-20 md:text-center`}
    >
      {tag && <Tagline className={"mb-4 md:justify-center "}>{tag} </Tagline>}
      {title && <h2 className="h2 text">{title}</h2>}
      {text && <p className="body-2 mt-4 text-n-4 text">{text}</p>}
    </div>
  );
};

export default Heading;
