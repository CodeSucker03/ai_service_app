import { pricing } from "../../constants";
import Button from "./Button";
const check = "/assets/check.svg";
const PricingList = () => {
  return (
    <div className="flex gap-4 max-lg:flex-wrap">
      {pricing.map((item) => (
        <div
          key={item.id}
          className="w-[19rem] max-lg:w-full h-full rounded-3xl
          transition-transform duration-400 hover:scale-105 
          hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]
        px-6 bg-n-8 border border-n-6 rouned-[2rem] lg:w-auto 
        even:py-14 odd:py-8 odd:my-4 [&>h4]:first:text-color-2
        [&>h4]:even:text-color-1 [&>h4]:last:text-color-3"
        >
          <h4 className="h4 mb-4">{item.title}</h4>
          <p
            className="body-2 min-h-[4rem] mb-3
          text-n-1/50"
          >
            {item.description}
          </p>
          <div className="flex items-center h-20 mb-6">
            {item.price && (
              <>
                <div className="h3">$</div>
                <div className="text-[5rem] leading-none font-grotesk font-bold">
                  {item.price}
                </div>
              </>
            )}
          </div>
          <Button
            className={"w-full mb-6"}
            href={item.price ? "/pricing" : "mailto:contact"}
            
          >
            {item.price ? "Get started" : "Contact us"}
          </Button>
          <ul>
            {item.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center py-5 border-t border-n-6"
              >
                <img src={check} alt="Check" />
                <p className="body-2 ml-4">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PricingList;
