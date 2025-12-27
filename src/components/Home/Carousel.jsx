import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const testimonials = [
  {
    text: "First testimonial goes here. Praising your product or service and expressing satisfaction.",
    author: "Ansub",
    image:
      "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/t2awrrfzdvmg1chnzyfr.svg",
  },
  {
    text: "Another testimonial goes here. Praising your product or service and expressing satisfaction.",
    author: "Lex Collins",

    image:
      "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/pmblusboe7vkw8vxdknx.svg",
  },
  {
    text: "Third testimonial goes here. Praising your product or service and expressing satisfaction.",
    author: "Alex Jones",
    image:
      "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/tyos2ayezryjskox3wzs.svg",
  },
  {
    text: "Fourth testimonial goes here. Praising your product or service and expressing satisfaction.",
    author: "John Doe",
    image:
      "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276560/logos/nymiivu48d5lywhf9rpf.svg",
  },
];

const TestimonialCarousel = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTestimonial(
        (prevTestimonial) => (prevTestimonial + 1) % testimonials.length
      );
    }, 5000); // Change Time here

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const forwardArow = () => {
    setCurrentTestimonial(
      (prevTestimonial) => (prevTestimonial + 1) % testimonials.length
    );
  };
  const backwardArow = () => {
    setCurrentTestimonial(
      (prevTestimonial) =>
        (prevTestimonial - 1 + testimonials.length) % testimonials.length
    );
  };
  const { text, author, image } = testimonials[currentTestimonial];

  const variants = {
    initial: { opacity: 0, y: "100%", scale: 0.1 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: "100%", scale: 0.1 },
  };

  const animation2 = {
    offscreen: {
      y: -300,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 0.5,
      },
    },
  };
  const dotVariants = {
    active: { scale: 1.2, backgroundColor: "#3f3f46" },
    inactive: { scale: 1, backgroundColor: "#D1D5DB" },
  };

  return (
    <section className="mt-[10rem] ">
      <div className="flex flex-col justify-center items-center mx-auto p-7 mt-32  lg:p-0 mb-20">
        <div className="images_title">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-[3px] "
          >
            <path
              d="M8.75348 17.6952C7.72056 14.0706 3.94416 10.3084 0.305928 9.27938C-0.101976 9.14829 -0.101976 8.8599 0.305928 8.72226C3.95074 7.68666 7.72056 3.931 8.76005 0.299863C8.8719 -0.0999545 9.14164 -0.0999545 9.25349 0.299863C10.2864 3.931 14.0628 7.68666 17.6945 8.72226C18.1024 8.85335 18.1024 9.14829 17.6945 9.27938C14.0562 10.3084 10.2798 14.0706 9.24691 17.6952C9.13506 18.1016 8.86532 18.1016 8.75348 17.6952Z"
              fill="#8082ff"
            ></path>
          </svg>
          <h1 className="leading-[24px] text-2xl text-indigo-400">
            Introducing Blocks
          </h1>
        </div>

        <div>
          <h1 className=" text-5xl lg:text-7xl mt-4 text-center font-bold">
            A new easy way to create.
          </h1>
        </div>
      </div>
      <div className="w-full max-w-2xl mx-auto">
        <AnimatePresence mode="popLayout">
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="flex w-full flex-col items-center justify-center"
              variants={animation2}
            >
              <img src={image} alt={author} className="m-0 h-24 w-24" />
            </motion.div>
          </motion.div>

          <motion.div
            key={currentTestimonial}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            className="flex w-full flex-col items-center justify-center"
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 30,
              duration: 0.5,
            }}
          >
            <div>
              <p className="m-0 text-center text-2xl font-medium tracking-tight">
                &quot;{text}&quot;
              </p>
            </div>
            <div className="mx-auto mt-5">
              <div className="flex flex-col items-center justify-center space-x-3">
                <div className="font-regular text-sm text-gray-100">
                  {author}
                </div>
              </div>
            </div>
          </motion.div>
          <div className="mt-8 flex justify-center">
            {testimonials.map((_, index) => (
              <motion.div
                key={index}
                className="mx-1 h-2 w-2 cursor-pointer rounded-full"
                variants={dotVariants}
                animate={index === currentTestimonial ? "active" : "inactive"}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-between lg:w-[80%] mt-[-8rem] mx-auto px-2">
        <button
          className="w-20 bg-gray-950 border border-gray-400 border-opacity-40 rounded-full h-20 flex items-center justify-center hover:bg-gray-900"
          onClick={backwardArow}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          className="w-20 border bg-gray-950 border-gray-400 border-opacity-40 rounded-full h-20 flex items-center justify-center hover:bg-gray-900"
          onClick={forwardArow}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
