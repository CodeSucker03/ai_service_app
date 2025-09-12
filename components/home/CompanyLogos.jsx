import { companyLogos } from "../../constants";

const CompanyLogos = ({ className }) => {
  return (
    <div className={className}>
      <h5 className="tagline mb-6 text-center text-n-1/50">
        Helping people create beautiful content at
      </h5>

      {/* Wrapper for bottom placement */}
      <div
        className="
      relative  
      flex w-full justify-center
      lg:justify-between
    "
      >
        {/* Left column */}
        <ul className="lg:flex gap-6 lg:flex-col lg:ml-6">
          {companyLogos
            .slice(0, Math.ceil(companyLogos.length / 2))
            .map((logo, index) => (
              <li key={index} className="flex items-center h-[8.5rem]">
                <img
                  src={logo}
                  width={134}
                  height={28}
                  alt={`logo-left-${index}`}
                />
              </li>
            ))}
        </ul>

        {/* Right column */}
        <ul className="hidden lg:flex gap-6 lg:flex-col lg:mr-6">
          {companyLogos
            .slice(Math.ceil(companyLogos.length / 2))
            .map((logo, index) => (
              <li key={index} className="flex items-center h-[8.5rem]">
                <img
                  src={logo}
                  width={134}
                  height={28}
                  alt={`logo-right-${index}`}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CompanyLogos;
