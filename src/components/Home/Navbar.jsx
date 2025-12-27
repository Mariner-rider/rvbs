import "../../styles/navbar.css";
import logo from "../../assets/images/blogo.png";
import { useContext } from "react";
import { SlideNav } from "./NavigationBar";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import UserProfile from "../UserProfile";
import SideMenu from "./sideMenu";

export default function Navbar() {
  const { user, handleSignOut } = useContext(AuthContext);

  return (
    <section className="flex justify-between px-3 content-center fixed w-full z-50 lg:px-[2rem] top-8 ">
      <Link
        to="/"
        className="flex w-[7.5rem] items-center justify-between text-xl"
      >
        <div className="w-7 lg:w-9">
          <img className="w-full " src={logo} />
        </div>
        <div>
          <p className="">BharatAI</p>
        </div>
      </Link>
      <div className="hidden lg:block">
        <SlideNav />
      </div>
      <div className="hidden lg:block">
        {user ? (
          <UserProfile user={user} handleSignOut={handleSignOut} />
        ) : (
          <div className="flex align-middle w-28">
            <Link
              to="/login"
              className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded bg-slate-900 hover:pl-10 hover:pr-6  group"
            >
              <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-orange-600 group-hover:h-full"></span>
              <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                <svg
                  className="w-5 h-5 text-gray-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                <svg
                  className="w-5 h-5 text-gray-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="relative w-full text-left text-gray-50 transition-colors duration-200 ease-in-out group-hover:text-white">
                Login
              </span>
            </Link>
          </div>
        )}
      </div>
      <div className="block lg:hidden">
        <SideMenu />
      </div>
    </section>
  );
}
