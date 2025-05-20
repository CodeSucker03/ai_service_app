
import Section from "./Section";
import Heading from "./Heading";
import PricingList from "./PricingList";

const Pricing = () => {
  return (
    <Section className="overflow-hidden" id="pricing">
      <div className="container relative z-2">
        
        <Heading tag='Get Started with Brainwave' 
        title="Pay one use forever"></Heading>
        <div className="relative">
          <PricingList />
        </div>
        {/* <div className="flex justify-center mt-10 ">
          <a className="text-xs font-bold font-code uppercase border-b">See the full details</a>
        </div> */}
      </div>
    </Section>
  );
};

export default Pricing;
