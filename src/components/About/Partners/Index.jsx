import { Text2 } from "../../Home/Text";

export default function SparkleMain() {
  return (
    <div className=" w-screen overflow-hidden ">
      <div className="relative mt-20 h-56 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#8350e8,transparent_70%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-t after:border-[#7876c566] after:bg-zinc-900" />
      <Text2 />
      {/* <div className="mx-auto mt-36 2xl:mt-52 w-screen max-w-5xl">
        <div className="text-center border bg-gray-950 border-gray-400 border-opacity-40 rounded-xl py-10 text-2xl lg:text-3xl lg:my-14 text-white mx-1">
          <span className="text-indigo-400">BharatAI Vision</span>
        </div>

        <div className="w-full flex flex-col lg:flex-row justify-center items-center lg:justify-center">
          <p className="text-center text-xl">
            BharatAI was established as a transformative force in India's
            technological landscape, with the mission of making AI accessible,
            ethical, and impactful. It envisions a future where AI drives
            progress across industries, empowers communities, and creates
            sustainable opportunities, shaping India into a thriving AI-powered
            nation by 2030.
          </p>
          <div className="flex py-8">
            <div className="flex items-center mx-4 lg:mx-8">
              <FontAwesomeIcon className="text-4xl mr-2" icon={faLinkedin} />
              <p className="text-2xl">LinkedIn</p>
            </div>
            <div className="flex items-center mx-4 lg:mx-8">
              <FontAwesomeIcon className="text-4xl mr-2" icon={faWhatsapp} />
              <p className="text-2xl">WhatsApp</p>
            </div>
          </div>

          <div className="flex">
            <div className="flex items-center mx-4 lg:mx-8">
              <FontAwesomeIcon className="text-4xl mr-2" icon={faFacebook} />
              <p className="text-2xl">Facebook</p>
            </div>
            <div className="flex items-center mx-4 lg:mx-8">
              <FontAwesomeIcon className="text-4xl mr-2" icon={faXTwitter} />
              <p className="text-2xl">Twitter</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
