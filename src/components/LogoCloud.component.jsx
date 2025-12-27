import startIn from "../assets/images/startUp.webp";
import startIndia from "../assets/images/startupIn.webp";
import indiaAI from "../assets/images/indiaAI.webp";

const logos = [
  {
    name: "Startup UP",
    url: startIn,
  },
  {
    name: "India AI",
    url: indiaAI,
  },
  {
    name: "Startup India",
    url: startIndia,
  },
  // {
  //   name: "Trustpilot",
  //   url: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/tkfspxqmjflfllbuqxsi.svg",
  // },
  // {
  //   name: "Webflow",
  //   url: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276560/logos/nymiivu48d5lywhf9rpf.svg",
  // },

  // {
  //   name: "Airbnb",
  //   url: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/pmblusboe7vkw8vxdknx.svg",
  // },
  // {
  //   name: "Tina",
  //   url: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276560/logos/afqhiygywyphuou6xtxc.svg",
  // },
  // {
  //   name: "Stackoverflow",
  //   url: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/ts1j4mkooxqmscgptafa.svg",
  // },
  // {
  //   name: "mistral",
  //   url: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/tyos2ayezryjskox3wzs.svg",
  // },
];

const LogoCloud = () => {
  return (
    <div className="z-20 relative mt-24 xl:mt-64">
      <div className="flex flex-col justify-center items-center mx-auto p-7 lg:p-0 mb-10">
        <div className="flex justify-center items-center mx-auto">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=" mr-3"
          >
            <path
              d="M8.75348 17.6952C7.72056 14.0706 3.94416 10.3084 0.305928 9.27938C-0.101976 9.14829 -0.101976 8.8599 0.305928 8.72226C3.95074 7.68666 7.72056 3.931 8.76005 0.299863C8.8719 -0.0999545 9.14164 -0.0999545 9.25349 0.299863C10.2864 3.931 14.0628 7.68666 17.6945 8.72226C18.1024 8.85335 18.1024 9.14829 17.6945 9.27938C14.0562 10.3084 10.2798 14.0706 9.24691 17.6952C9.13506 18.1016 8.86532 18.1016 8.75348 17.6952Z"
              fill="#8082ff"
            ></path>
          </svg>
          <h1 className="images_blocks text-4xl font-black">Supported by</h1>
        </div>
      </div>
      <div className="w-full py-12">
        <div className="mx-auto w-full px-4 md:px-8">
          <div
            className="group relative mt-6 flex gap-32 overflow-hidden p-2"
            style={{
              maskImage:
                "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
            }}
          >
            {Array(5)
              .fill(null)
              .map((index) => (
                <div
                  key={index}
                  className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-32"
                >
                  {logos.map((logo, key) => (
                    <div className=" w-52 px-2 my-auto" key={key}>
                      <img
                        className="w-full"
                        src={logo.url}
                        alt={`${logo.name}`}
                      />
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoCloud;
