import Button from "./framer-ai-button/Button";
import bgImage from "../../assets/images/bg-first.webp";

export const BackgroundSphere = () => {
  return (
    <>
      <div className="z-70 absolute h-screen">
        <div
          className="absolute w-screen z-0 min-w-[1440px] lg:h-screen h-[1420px] "
          style={{
            background:
              "url(https://cdn-www.dora.run/__dora__/morpheus/static/images/ai/bg-first.webp) no-repeat center",
            backgroundSize: "100% 100%",
            flexShrink: 0,
            transform: "rotate(180deg)",
          }}
        />
      </div>
    </>
  );
};

const SphereComponent = () => {
  return (
    <div className="z-0 -mt-[70rem] rotate-180 flex justify-center items-center ">
      <div className="absolute top-24 rotate-180 z-20">
        <Button />
      </div>
      <div className="z-10 w-[1459px] h-[1461px]  ">
        <div
          className="w-[100%] h-[100%] relative"
          style={{
            transform: "rotate(180deg)",
            zIndex: 4,
            flexShrink: 0,
            borderRadius: "100%",
            opacity: "0.4",
            mixBlendMode: "luminosity",
            rotate: "180deg",
            background:
              "radial-gradient(60.42% 60.42% at 50.02% 60.42%, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.00) 69.42%, rgba(255, 255, 255, 0.08) 75.33%, rgba(255, 255, 255, 0.13) 80.42%, rgba(255, 255, 255, 0.31) 86.39%, rgba(255, 255, 255, 0.57) 92.19%, #FFF 100%)",
            boxShadow: "0px -40px 40px 0px rgba(255, 255, 255, 0.40)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={1459}
            height={1461}
            viewBox="0 0 1459 1461"
            fill="none"
          >
            <path
              opacity="0.4"
              d="M0.499936 730.5C0.499901 1133.67 326.885 1460.5 729.5 1460.5C1132.11 1460.5 1458.5 1133.67 1458.5 730.5C1458.5 327.331 1132.11 0.499971 729.5 0.499936C326.885 0.499901 0.499971 327.331 0.499936 730.5Z"
              stroke="url(#paint0_linear_3113_17586)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_3113_17586"
                x1="729.5"
                y1="-6.37749e-05"
                x2="729.5"
                y2={1461}
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" />
                <stop offset={1} stopColor="white" stopOpacity={0} />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className=" -top-[36rem] w-full    absolute  z-0 min-w-[1440px] lg:h-screen h-[1420px] ">
        <img src={bgImage} className="object-cover w-full" />
      </div>
    </div>
  );
};

export default SphereComponent;
