import { Link } from "react-router-dom";
import bharatAi from "../../assets/images/bharatai2.png";
import { Sidebar2 } from "../AiSidebar/AsideToggle/MainSideBar";
import ContentGenerator from "./ContentGenerator";

const RyteLayout = () => {
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
            <div className=" flex flex-col md:pt-2 md:px-2 lg:pt-0 h-full overflow-x-auto mb-4 yes-scrollbar">
              <div className="rounded-lg flex flex-col mx-auto w-full lg:max-w-[80rem]">
                <ContentGenerator />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RyteLayout;
