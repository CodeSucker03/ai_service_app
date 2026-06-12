"use client";

import Button from "./Button";
import { BackgroundCircles, Gradient } from "./design/Hero";
import { heroIcons } from "../../constants";
import { ScrollParallax } from "react-just-parallax";
import { useEffect, useRef, useState } from "react";
import Generating from "./Generating";
import Notification from "./Notification";
import CompanyLogos from "./CompanyLogos";;
const curve = "/assets/hero/curve.png";
const frame = "/assets/hero/frame.png";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const videoRef = useRef(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const parallaxRef = useRef(null);
  const [content, setContent] = useState("AI is thinking ...");

  useEffect(() => {
    // setContent(
    //   chatBotResponse(
    //     "Give me a random quote relate to future, give me the quote and name only"
    //   )
    // );
  }, []);
  // Animate the API paragraph text on mount
  useGSAP(() => {
    gsap.fromTo(
      ".para",
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1.5,
        stagger: 0.4,
      }
    );
  }, []);

  // ANimate the header text on mount
  useGSAP(() => {
    let split = SplitText.create("#header", { type: "words" });

    // now animate the characters in a staggered fashion
    gsap.from(split.words, {
      duration: 1,
      y: 100, // animate from 100px below
      autoAlpha: 0, // fade in from opacity: 0 and visibility: hidden
      stagger: 0.1, // 0.05 seconds between each
    });
  }, []);

  const startValue = isMobile ? "top 50%" : "center 60%";
  const endValue = isMobile ? "120% top" : "bottom top";
  useGSAP(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    const makeTimeline = () => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: video,
          start: startValue,
          end: endValue,
          scrub: true,
          pin: true,
        },
      });

      tl.to(video, {
        currentTime: video.duration,
        ease: "none",
      });
    };

    if (video.readyState >= 1) {
      // 👈 metadata already loaded (like on F5)
      makeTimeline();
    } else {
      // 👈 wait until metadata loads the first time
      video.onloadedmetadata = makeTimeline;
    }
  }, []);
  return (
    <>
      <div className="pattern">
        <div className="container relative" ref={parallaxRef}>
          <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
            <h1 className="h1 mb-10 " id="header">
              Explore the Possibilities of&nbsp;AI&nbsp; with {` `}
              <span className="inline-block relative">
                Brainiac AI{" "}
                <img
                  src={curve}
                  className="absolute top-full left-0 w-full xl:-mt-2"
                  width={624}
                  height={28}
                  alt="Curve"
                />
              </span>
            </h1>
            <p className="body-1 max-w-3xl mx-auto font-mono mb-6 text-yellow-500 lg:mb-8 para">
              {/* Unleash the power of AI within Brainwave. Upgrade your productivity
            with Brainwave, the open AI chat app. */}
              {content}
            </p>
            <Button href="#pricing" white>
              Get started
            </Button>
          </div>
          <div className="relative max-w-[23rem] mx-auto sm:max-w-[32rem] md:max-w-5xl xl:mb-24">
            <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient  ">
              <div className="relative bg-n-8 rounded-[1rem]">              
                <div
                  className=" aspect-[33/40] rounded-b-[0.9rem] overflow-hidden sm:aspect-[1] 
                md:aspect-[688/490] lg:aspect-[1024/490]"
                >
                  <img
                  src={frame}
                  className="w-full scale-[1] "
                  width={1024}
                  height={490}
                 
                  alt="AI"
                />

                  <Generating
                    className="absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 
                  md:w-[31rem] md:-translate-x-1/2"
                  />

                  <ScrollParallax isAbsolutelyPositioned>
                    <ul
                      className=" absolute -left-[.5rem] bottom-[7.5rem] 
                    lg:-left-[5.5rem]
                     bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl flex "
                    >
                      {heroIcons.map((icon, index) => (
                        <li className="p-5 " key={index}>
                          <img src={icon} width={24} height={25} alt={icon} />
                        </li>
                      ))}
                    </ul>
                  </ScrollParallax>

                  <ScrollParallax isAbsolutelyPositioned>
                    <Notification
                      className=" absolute -right-[.5rem] lg:-right-[5.5rem] bottom-[12rem] w-[18rem] xl:flex"
                      title="Code generation"
                    />
                  </ScrollParallax>
                </div>
              </div>

              <Gradient />
            </div>

            <BackgroundCircles />
          </div>

        </div>
      </div>
      <div className="relative">
        <div id="hero">
          <CompanyLogos className=" relative z-10 mt-20" />

        </div>
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/output.mp4"
        />
      </div>
    </>
  );
};

export default Hero;
