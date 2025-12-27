import React from "react";
import { Link } from "react-router-dom";
import Appsicon from "../../assets/images/apps_icon.png";

const DiscoverModels = () => {
  return (
    <div className="flex flex-col space-y-1 mt-4 -mx-4">
      <div className="flex items-center justify-between mt-2   space-y-1 py-3 bg-gray-200 px-2 rounded-lg hover:bg-gray-200 dark:bg-[#404040] dark:hover:bg-[#343434]">
        <div className="flex items-center">
          <div>
            <Link to="/models" className="flex flex-row">
              <div className="dark:bg-[#f3f3f3]  rounded-md">
                <img src={Appsicon} alt="apps_icon" />
              </div>
              <div>
                <h1 className="text-black m-1 ml-3 dark:text-gray-100 leading-normal ">
                  Discover Models
                </h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverModels;
