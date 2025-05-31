import Heading from "./Heading";
import { benefits } from "../../constants";
import Arrow from "../../public/assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../../public/assets/svg/ClipPath";
import Link from "next/link";

const Benefits = () => {
  return (
    <div id="features">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Chat smarter, not harder with Brainwave"
        ></Heading>
        <div className="flex flex-wrap gap-10 mb-10">
          {benefits.map((item) => (
            <div
              className="block relative  p-0.5 bg-no-repeat bg-[length:100%_100%] 
              transition-transform duration-400 hover:scale-110 
          hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]
              md:max-w-[24rem] "
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
            >
              <div
                className="relative z-2 flex flex-col min-h-[22rem]
              p-10 pointer-events-none"
              >
                <h5 className="h5 mb-5 xl:h3">{item.title}</h5>
                <p className="body-2 mb-6 text-n-3">{item.text}</p>
                <div className="flex items-center mt-auto">
                  <img
                    src={item.iconUrl}
                    width={48}
                    height={48}
                    alt={item.title}
                  ></img>
                  <Link
                    href={item.url}
                    className="ml-auto font-code text-sx font-bold
                    uppercase pointer-events-auto"
                  >
                    Explore more
                  </Link>
                    <Arrow />

                </div>
              </div>
              {item.light && <GradientLight />}
              <div
                className="absolute inset-0.5 bg-n-8"
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className=" absolute inset-0 opacity-0 hover:opacity-20">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      width={380}
                      height={360}
                      className="object-cover w-full h-full"
                      alt={item.title}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
