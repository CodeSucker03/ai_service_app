import React from "react";
import { collabContent, collabText, collabApps } from "../../constants";
// import { brainwaveSymbol, check } from "../../public/assets";
const check = "assets/check.svg";
const brainwaveSymbol = "assets/brainwave-symbol.svg";
import Button from "./Button";

const Collaboration = () => {
  return (
    <div>
      <div className="container lg:flex">
        <div className="max-w-[25rem]">
          <h2 className="h2 mb-4 md:mb-8">
            AI chat app for seamless collaboration
          </h2>
          <ul className="max-w-[22rem] mb-10 md:mb-14">
            {collabContent.map((item) => (
              <li key={item.id} className="mb-3 py-3 md:mb-6">
                <div className="flex items-center">
                  <img src={check} width={24} height={24} alt="check" />
                  <h6 className="body-2 ml-5">{item.title}</h6>
                </div>
                {item.text && (
                  <p className="body-2 mt-2 text-n-4 ">{item.text}</p>
                )}
              </li>
            ))}
          </ul>
          <Button className="" href={"/chat"}>
            {" "}
            Try it now
          </Button>
        </div>
        <div className="lg:ml-auto xl:w-[38rem] mt-4">
          <p
            className="body-2 mb-4 text-n-4 md:mb-16 lg:mb-32
            lg:w-[22rem] lg:mx-auto"
          >
            {collabText}
          </p>
          <div
            className=" relative left-1/2 flex w-[22rem] aspect-square border
            border-n-6 rounded-full -translate-x-1/2"
          >
            <div className="flex w-60 aspect-square m-auto border border-n-6 rounded-full">
              <div
                className="w-[6rem] aspect-square m-auto p-1  bg-conic-gradient
                rounded-full"
              >
                <div
                  className="flex items-center justify-center w-full 
                h-full bg-n-8 rounded-full"
                >
                  <img
                    src={brainwaveSymbol}
                    width={48}
                    height={48}
                    alt="brainwave"
                  />
                </div>
              </div>
            </div>
            <ul>
              {collabApps.map((app, index) => (
                <li
                  key={index}
                  className={`absolute top-0 left-1/2 h-1/2
                -ml-[1.6rem] origin-bottom rotate-${index * 45}`}
                >
                  <div
                    className={`relative -top-[1.6rem] flex w-[3.2rem] h-[3.2rem]
                      transition-transform duration-400 hover:scale-105 
                      hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]
                   bg-n-7 border border-n-1/15 rounded-xl -rotate-${index * 45}
                    `}
                  >
                    <img
                      className="m-auto"
                      width={app.width}
                      height={app.height}
                      alt={app.title}
                      src={app.icon}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
