"use client";

import Button from "./Button";
import { BackgroundCircles, Gradient } from "./design/Hero";
import { heroIcons } from "../../constants";
import { ScrollParallax } from "react-just-parallax";
import { useEffect, useRef, useState } from "react";
import Generating from "./Generating";
import Notification from "./Notification";
import CompanyLogos from "./CompanyLogos";
import { set } from "react-hook-form";
import { chatBotResponse } from "@/lib/actions/general.action";
const curve = "/assets/hero/curve.png";
const robot = "/assets/hero/robot.png";



const Hero = () => {
  const parallaxRef = useRef(null);
    const [content, setContent] = useState("AI is thinking ...");
  
  useEffect(()=>{
      setContent(chatBotResponse("Give me a random quote relate to future, give me the quote and name only"))
  },[])
  return (
    <div className="pattern">
      <div className="container relative" ref={parallaxRef}>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-10 ">
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
          <p className="body-1 max-w-3xl mx-auto font-mono mb-6 text-yellow-500 lg:mb-8">
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
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />

              <div
                className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden sm:aspect-[1] 
                md:aspect-[688/490] lg:aspect-[1024/490]"
              >
                <img
                  src={robot}
                  className="w-full scale-[1] -translate-y-10.5 "
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

        <CompanyLogos className="hidden relative z-10 mt-20 lg:block" />
      </div>
    </div>
  );
};

export default Hero;
