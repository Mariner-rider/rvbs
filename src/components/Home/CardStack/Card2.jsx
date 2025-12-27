import slide2 from "../../../assets/images/slide2.png";
import slide3 from "../../../assets/images/slide3.png";
import slide4 from "../../../assets/images/slide4.png";
import "./style.css";

const Card2 = () => {
  return (
    <main className="mt-40">
      <div className="flex flex-col justify-center items-center mx-auto p-7 lg:p-0 mb-20">
        <div className="images_title">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-[3px]"
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
      <ul className="" id="cards">
        <li className="card02 " id="card-1">
          <div className="card-content flex flex-col md:flex-row justify-evenly items-center bg-gray-900 backdrop-blur-xl bg-opacity-50 border border-gray-400 border-opacity-20">
            <div>
              <h2>Card One</h2>
              <p>
                This is the content of card one. Lorem ipsum dolor sit amet
                consectetur adipisicing elit.
              </p>
            </div>
            <figure className="flex items-center justify-center">
              <img className="w-[70%] lg:w-full" src={slide4} alt="card-one" />
            </figure>
          </div>
        </li>

        <li className="card02" id="card-2">
          <div className="card-content2 flex flex-col md:flex-row justify-evenly items-center bg-gray-900 backdrop-blur-xl bg-opacity-50 border border-gray-400 border-opacity-20">
            <div>
              <h2>Card Two</h2>
              <p>
                This is the content of card two. Lorem ipsum dolor sit amet
                consectetur adipisicing elit.
              </p>
            </div>
            <figure className=" flex items-center justify-center">
              <img className="w-[70%] lg:w-full" src={slide2} alt="card two" />
            </figure>
          </div>
        </li>

        <li className="card02" id="card-3">
          <div className="card-content3 flex flex-col md:flex-row justify-evenly items-center bg-gray-900 backdrop-blur-xl bg-opacity-50 border border-gray-400 border-opacity-20">
            <div>
              <h2>Card Three</h2>
              <p>
                This is the content of card three. Lorem ipsum dolor sit amet
                consectetur adipisicing elit.
              </p>
            </div>
            <figure className=" flex items-center justify-center">
              <img
                className="w-[70%] lg:w-full"
                src={slide3}
                alt="card three"
              />
            </figure>
          </div>
        </li>
      </ul>
    </main>
  );
};

export default Card2;
