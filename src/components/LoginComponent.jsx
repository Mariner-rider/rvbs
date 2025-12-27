import React, { useContext, useEffect } from "react";
import bharatAi from "../assets/images/bharatai2.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Faq from "./Faq.component";

const LoginComponent = () => {
  const {
    handleGitHubLogin,
    handleGoogleLogin,
    user,
    handleLogin,
    email,
    password,
    setEmail,
    setPassword,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const reload = () => {
    if (user) {
      navigate("/");
      window.location.reload();
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      console.log(code);
    }
  }, []);

  return (
    <>
      <div
        id="login-popup"
        tabIndex="-1"
        className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow">
            <Link
              to="/"
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="#c6c7c7"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close popup</span>
            </Link>

            <div className="p-5">
              <h3 className="text-2xl mb-0.5 font-medium"></h3>
              <p className="mb-4 text-sm font-normal text-gray-800"></p>

              <div className="text-center">
                <div className=" w-40 mb-5 mx-auto">
                  <img src={bharatAi} alt="Bharat-ai-logo" />
                </div>
                <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                  Login to your account
                </p>
                <p className="mt-2 text-sm leading-4 text-gray-600">
                  You must be logged in to perform this action.
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-2">
                {/* GitHub Login Button */}
                <Link
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={() => {
                    handleGitHubLogin();
                    reload();
                  }}
                >
                  <img
                    src="https://www.svgrepo.com/show/512317/github-142.svg"
                    alt="GitHub"
                    className="h-[18px] w-[18px] "
                  />
                  Continue with GitHub
                </Link>

                {/* Google Login Button */}
                <Link
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={() => {
                    handleGoogleLogin();
                    reload();
                  }}
                  to="/"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="h-[18px] w-[18px]"
                  />
                  Continue with Google
                </Link>

                {/* LinkedIn Login Button */}
                {/* <button
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={handleLinkedInLogin}
                >
                  <img
                    src="https://www.svgrepo.com/show/448234/linkedin.svg"
                    alt="Google"
                    className="h-[18px] w-[18px] "
                  />
                  Continue with LinkedIn
                </button> */}
              </div>

              <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
                <div className="h-px w-full bg-slate-200"></div>
                OR
                <div className="h-px w-full bg-slate-200"></div>
              </div>

              <form className="w-full" onSubmit={handleLogin}>
                <div className="relative">
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-lg border border-gray-300 px-10 py-2 shadow-sm outline-none text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                  />
                  <span className="absolute left-3 top-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path
                        className="fill-gray-400 "
                        d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"
                      />
                      <path
                        className="fill-gray-400 "
                        d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"
                      />
                    </svg>
                  </span>
                </div>
                <div className="relative">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="mt-2 block w-full rounded-lg border border-gray-300 px-10 py-2 text-gray-700 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="absolute left-3 top-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path
                        className="fill-gray-400 "
                        fillRule="evenodd"
                        d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>

                <p className="mb-3 mt-2 text-sm text-gray-500">
                  <a
                    href="/forgot-password"
                    className="text-blue-800 hover:text-blue-600"
                  >
                    Reset your password?
                  </a>
                </p>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-black hover:bg-indigo-500 p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                >
                  Login
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-600">
                Don't have an account?
                <Link to="/signup" className="font-medium ml-1 text-[#4285f4]">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;


// import React, { useContext, useEffect } from "react";
// import bharatAi from "../assets/images/bharatai2.png";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import Faq from "./Faq.component";

// const LoginComponent = () => {
//   const {
//     handleGitHubLogin,
//     handleGoogleLogin,
//     user,
//     handleLogin,
//     email,
//     password,
//     setEmail,
//     setPassword,
//   } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const reload = () => {
//     if (user) {
//       navigate("/");
//       window.location.reload();
//     }
//   };

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const code = params.get("code");

//     if (code) {
//       console.log(code);
//     }
//   }, []);

//   return (
//     <>
//       <div
//         id="login-popup"
//         tabIndex="-1"
//         className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex"
//       >
//         <div className="relative p-4 w-full max-w-md h-full md:h-auto">
//           <div className="relative bg-white rounded-lg shadow">
//             <Link
//               to="/"
//               type="button"
//               className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
//             >
//               <svg
//                 aria-hidden="true"
//                 className="w-5 h-5"
//                 fill="#c6c7c7"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//               <span className="sr-only">Close popup</span>
//             </Link>

//             <div className="p-5">
//               <h3 className="text-2xl mb-0.5 font-medium"></h3>
//               <p className="mb-4 text-sm font-normal text-gray-800"></p>

//               <div className="text-center">
//                 <div className="w-40 mb-5 mx-auto">
//                   <img src={bharatAi} alt="Bharat-ai-logo" />
//                 </div>
//                 <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
//                   Login to your account
//                 </p>
//                 <p className="mt-2 text-sm leading-4 text-slate-600">
//                   You must be logged in to perform this action.
//                 </p>
//               </div>

//               <div className="mt-7 flex flex-col gap-2">
//                 {/* GitHub Login Button - Disabled */}
//                 <button
//                   className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
//                   disabled
//                 >
//                   <img
//                     src="https://www.svgrepo.com/show/512317/github-142.svg"
//                     alt="GitHub"
//                     className="h-[18px] w-[18px] "
//                   />
//                   Continue with GitHub
//                 </button>

//                 {/* Google Login Button - Disabled */}
//                 <button
//                   className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
//                   disabled
//                 >
//                   <img
//                     src="https://www.svgrepo.com/show/475656/google-color.svg"
//                     alt="Google"
//                     className="h-[18px] w-[18px]"
//                   />
//                   Continue with Google
//                 </button>

//                 {/* LinkedIn Login Button - Disabled */}
//                 <button
//                   className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
//                   disabled
//                 >
//                   <img
//                     src="https://www.svgrepo.com/show/448234/linkedin.svg"
//                     alt="LinkedIn"
//                     className="h-[18px] w-[18px] "
//                   />
//                   Continue with LinkedIn
//                 </button>
//               </div>

//               <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
//                 <div className="h-px w-full bg-slate-200"></div>
//                 OR
//                 <div className="h-px w-full bg-slate-200"></div>
//               </div>

//               {/* Login Form - Disabled */}
//               <form className="w-full" onSubmit={(e) => e.preventDefault()}>
//                 <div className="relative">
//                   <label htmlFor="email" className="sr-only">
//                     Email address
//                   </label>
//                   <input
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     className="block w-full rounded-lg border border-gray-300 px-10 py-2 shadow-sm outline-none text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email Address"
//                     disabled
//                   />
//                   <span className="absolute left-3 top-3">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                       className="size-5"
//                     >
//                       <path
//                         className="fill-gray-400 "
//                         d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"
//                       />
//                       <path
//                         className="fill-gray-400 "
//                         d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"
//                       />
//                     </svg>
//                   </span>
//                 </div>
//                 <div className="relative">
//                   <label htmlFor="password" className="sr-only">
//                     Password
//                   </label>
//                   <input
//                     name="password"
//                     type="password"
//                     autoComplete="current-password"
//                     required
//                     className="mt-2 block w-full rounded-lg border border-gray-300 px-10 py-2 text-gray-700 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
//                     placeholder="Password"
//                     onChange={(e) => setPassword(e.target.value)}
//                     disabled
//                   />
//                   <span className="absolute left-3 top-3">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                       className="size-5"
//                     >
//                       <path
//                         className="fill-gray-400 "
//                         fillRule="evenodd"
//                         d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </span>
//                 </div>

//                 <p className="mb-3 mt-2 text-sm text-gray-500">
//                   <a
//                     href="#"
//                     className="text-blue-800 hover:text-blue-600"
//                   >
//                     Reset your password?
//                   </a>
//                 </p>
//                 <button
//                   type="submit"
//                   className="inline-flex w-full items-center justify-center rounded-lg bg-black hover:bg-indigo-500 p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
//                   disabled
//                 >
//                   Login
//                 </button>
//               </form>

//               <div className="mt-6 text-center text-sm text-slate-600">
//                 Don't have an account?
//                 <Link to="/signup" className="font-medium ml-1 text-[#4285f4]">
//                   Sign up
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LoginComponent;
