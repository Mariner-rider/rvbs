import boy from "../assets/icons/boy.png";
import girl from "../assets/icons/woman.png";

const testimonials = [
  {
    name: "Fleix Everard",
    position: "HR, Blue Soft Sol",
    title: "Great app - Easy to use",
    feedback:
      "Great value and so easy to use and saves me so much time! I was shocked by how much time and brain energy it saved me. Simple & easy...gotta love that. ✌️",
    rating: 4,
    img: boy,
  },
  {
    name: "Aryan Malhotra",
    position: "Founder, InnovateX",
    title: "Revolutionary AI – A True Game-Changer",
    feedback:
      "BharatAI_RS1 has completely transformed the way my team approaches AI development. The seamless integration and high-efficiency processing saved us hours of effort. An absolute must-have! 🚀",
    rating: 5,
    img: boy,
  },
  {
    name: "Neha Sharma",
    position: "CTO, VisionTech",
    title: "Simple, Fast & Powerful",
    feedback:
      "I was amazed by the speed and precision of BharatAI_RS1. It understands the context incredibly well, making model training and deployment effortless. The best AI tool I’ve used so far! ❤️",
    rating: 4,
    img: girl,
  },
  {
    name: "Rohit Verma",
    position: "CEO at CodeFusion",
    title: "A Productivity Powerhouse for AI Startups",
    feedback:
      "The flexibility and ease of use in BharatAI_RS1 allow us to focus on innovation rather than tedious model-building tasks. This tool makes AI accessible for every startup.",
    rating: 4,
    img: boy,
  },
  {
    name: "Ananya Iyer",
    position: "Lead Developer, DataVerse",
    title: "Saves Time, Boosts Performance",
    feedback:
      "From generating datasets to fine-tuning models, BharatAI_RS1 handles everything flawlessly. It significantly reduces the development cycle, letting me focus on solving real-world problems.",
    rating: 5,
    img: girl,
  },
  {
    name: "Vikram Joshi",
    position: "AI Researcher, Quantum Analytics",
    title: "Beyond Expectations – AI at its Best!",
    feedback:
      "I was skeptical at first, but after using BharatAI_RS1, I was blown away by the precision and intelligence it brings. The tool exceeded my expectations in every way.",
    rating: 5,
    img: boy,
  },
];

function TestimonialCard({ testimonial }) {
  const { name, position, title, feedback, rating, img } = testimonial;

  return (
    <div className="bg-gray-900 border border-gray-400 border-opacity-20 rounded-xl bg-opacity-50 shadow-md backdrop-blur-sm p-6 flex flex-col w-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] min-w-[250px] h-fit">
      <div className="flex items-center mb-4">
        <img className="w-12 h-12 rounded-full mr-4" src={img} alt={name} />
        <div>
          <h3 className="text-lg font-semibold text-slate-100 dark:text-gray-100">
            {name}
          </h3>
          <p className="text-gray-300 text-sm dark:text-gray-300">{position}</p>
        </div>
      </div>
      <h4 className="text-xl font-bold mb-2 text-slate-100 dark:text-gray-100">
        {title}
      </h4>
      <p className="text-gray-300 dark:text-gray-300">{feedback}</p>
      <div className="mt-4">
        {Array.from({ length: 5 }, (v, i) => (
          <span
            key={i}
            className={i < rating ? "text-yellow-300" : "text-gray-300"}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <div className="py-20 px-2 lg:px-4 max-w-[82rem] mx-auto overflow-hidden lg:overflow-visible lg:mb-[5rem]">
      <section className="pb-12">
        <div className="flex flex-col justify-center items-center mx-auto p-7 lg:p-0 mb-10">
          <div className="flex justify-center items-center mx-auto">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-3"
            >
              <path
                d="M8.75348 17.6952C7.72056 14.0706 3.94416 10.3084 0.305928 9.27938C-0.101976 9.14829 -0.101976 8.8599 0.305928 8.72226C3.95074 7.68666 7.72056 3.931 8.76005 0.299863C8.8719 -0.0999545 9.14164 -0.0999545 9.25349 0.299863C10.2864 3.931 14.0628 7.68666 17.6945 8.72226C18.1024 8.85335 18.1024 9.14829 17.6945 9.27938C14.0562 10.3084 10.2798 14.0706 9.24691 17.6952C9.13506 18.1016 8.86532 18.1016 8.75348 17.6952Z"
                fill="#8082ff"
              ></path>
            </svg>
            <h1 className="text-indigo-400 text-center text-4xl font-black">
              An effortless way to innovate and build
            </h1>
          </div>

          <div>
            <h1 className="text-lg lg:text-xl  max-w-6xl mt-4 text-center font-bold text-gray-400">
              Introducing BharatAI_RS1
            </h1>
          </div>
        </div>
      </section>

      <div className="flex flex-col flex-wrap justify-start items-center max-w-[1300px] m-auto h-auto sm:max-h-[1400px] md:max-h-[1200px] lg:max-h-[900px] gap-6">
        {testimonials.slice(0).map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
