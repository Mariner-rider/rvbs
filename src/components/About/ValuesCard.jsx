import { motion } from "framer-motion";
import innovation from "../../assets/icons/innovation1.png";
import excellence from "../../assets/icons/excellence.png";
import integration from "../../assets/icons/integration.png";

const projects = [
  {
    // icon: <FaRegLightbulb className="text-orange-500" />,
    icon: innovation,
    title: "Innovation",
    description:
      "Creating tools that enable individuals and businesses to thrive.",
  },
  {
    // icon: <FaShieldAlt />,
    icon: excellence,
    title: "Integrity",
    description:
      "Building AI solutions that are ethical, transparent, and trustworthy.",
  },
  {
    // icon: <FaCogs />,
    icon: integration,
    title: "Excellence",
    description:
      "Constantly pushing the boundaries of AI capabilities to deliver world-class solutions.",
  },
];

export const ValuesCard = () => {
  return (
    <div className="lg:max-w-[90rem] mt-52 mx-auto px-3 lg:px-8">
      <div className="flex flex-col justify-center items-center mx-auto p-7 lg:p-0 mb-10">
        <div className="flex justify-center mx-auto">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="m-3"
          >
            <path
              d="M8.75348 17.6952C7.72056 14.0706 3.94416 10.3084 0.305928 9.27938C-0.101976 9.14829 -0.101976 8.8599 0.305928 8.72226C3.95074 7.68666 7.72056 3.931 8.76005 0.299863C8.8719 -0.0999545 9.14164 -0.0999545 9.25349 0.299863C10.2864 3.931 14.0628 7.68666 17.6945 8.72226C18.1024 8.85335 18.1024 9.14829 17.6945 9.27938C14.0562 10.3084 10.2798 14.0706 9.24691 17.6952C9.13506 18.1016 8.86532 18.1016 8.75348 17.6952Z"
              fill="#8082ff"
            ></path>
          </svg>
          <h1 className="images_blocks text-4xl font-black">Our Values</h1>
        </div>

        <div>
          <h2 className=" text-lg lg:text-xl  max-w-6xl mt-4 text-center font-bold text-gray-400">
            At BharatAI, our mission is rooted in values that inspire trust,
            excellence, and impact.
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3  lg:grid-cols-3  py-10">
        {projects.map((project) => (
          <div
            key={project?.icon}
            className="relative group  block p-2 h-full w-full "
          >
            <motion.div
              className="h-full w-full p-4 overflow-hidden bg-slate-900 bg-opacity-40 dark:bg-slate-900 border border-gray-400 border-opacity-40 rounded-xl dark:bg-opacity-40  relative z-40"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
            >
              <div className="relative z-50">
                <div className="p-4">
                  <img src={project.icon} className="w-14" />
                  <h4 className="text-zinc-100 font-bold text-xl tracking-wide mt-4">
                    {project.title}
                  </h4>
                  <p className="mt-2 text-zinc-400 tracking-wide leading-relaxed text-sm">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};
