import { Link } from "react-router-dom";
import bharatAi from "../../assets/images/bharatai2.png";
import { Sidebar2 } from "../AiSidebar/AsideToggle/MainSideBar";
import ModelSearchBar from "./Searchbar";
import { useState } from "react";
import ToggleView from "./ModelLayouts/ToggleView";
import ListView from "./ModelLayouts/ListView";
import GridView from "./ModelLayouts/GridView";
import AddModals from "./Dialog/Index";

const Models = () => {
  const [layout, setLayout] = useState(true);

  const handleToggle = () => {
    const newState = !layout;
    setLayout(newState);
  };
  return (
    <div className="flex h-screen antialiased text-gray-800  dark:text-gray-300  dark:bg-slate-900">
      <div className="flex flex-col lg:flex-row h-full w-full overflow-x-hidden ">
        <div className="absolute top-2 left-0 right-0  lg:hidden w-36 mx-auto">
          <Link to="/">
            <img src={bharatAi} alt="logo" />
          </Link>
        </div>
        <Sidebar2 />
        <div className="flex flex-col flex-auto h-full p-3 lg:p-6 lg:pl-3">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl mt-1 lg:mt-0 bg-gray-100 dark:bg-slate-800 h-[88vh] lg:h-full p-1 lg:p-4 relative">
            <div className="flex flex-col pt-2 md:px-2 lg:pt-0 h-full overflow-x-auto mb-4 yes-scrollbar">
              <div className="hidden lg:block lg:fixed w-32 ">
                <Link to="/">
                  <img src={bharatAi} alt="logo" />
                </Link>
              </div>

              <div className="mx-auto mt-24 2xl:max-w-[74rem] bg-gray-300 dark:bg-slate-700/30  p-1 md:px-10 rounded-3xl">
                <div className=" mt-12 lg:mt-12 flex flex-col items-center">
                  <h1 className="text-4xl  text-gray-800 dark:text-gray-100 lg:text-6xl">
                    Models
                  </h1>
                  <p className="text-gray-800 dark:text-gray-200 text-lg lg:text-xl text-center mt-2">
                    Discover and create custom versions of Models that combine
                    instructions, extra knowledge, and any combination of
                    skills.
                  </p>
                </div>
                <ModelSearchBar />
                <div className="mx-8">
                  <h2 className="text-3xl text-gray-800 dark:text-gray-100">
                    Personalize
                  </h2>
                  <hr className="h-px my-2 mb-7 bg-gray-800 border-0 dark:bg-gray-500" />
                  <AddModals />
                </div>
                <div>
                  <ToggleView handleToggle={handleToggle} layout={layout} />
                </div>
                <div className="mt-11">
                  {layout ? <GridView /> : <ListView />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Models;
