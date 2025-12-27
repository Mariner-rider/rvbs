import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bharatAi from "../assets/images/bharatai2.png";
import { AuthContext } from "../context/AuthContext";

const SignUpComponent = () => {
  const { handleSignup, setName, setEmail, setPassword } = useContext(AuthContext);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (confirmPassword !== e.target.password.value) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await handleSignup(e);
      setShowPopup(true); // Show popup after successful signup
    } catch (error) {
      console.error("Signup failed:", error);
      setError("Signup failed. Please try again.");
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate("/login"); // Redirect to login page after closing the popup
  };

  return (
    <section className="bg-black/50 fixed inset-0 flex items-center justify-center">
      <div className="relative p-4 w-full max-w-md">
        <div className="relative rounded-lg bg-white p-6 space-y-4 shadow-lg">
          <Link
            to="/"
            className="absolute top-3 right-2.5 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5"
          >
            ✖
          </Link>

          <div className="flex flex-col items-center space-y-4">
            <img src={bharatAi} alt="Bharat AI" className="w-40" />
            <h1 className="text-2xl font-semibold text-slate-800">Register User</h1>
          </div>

          <hr />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                name="name"
                className="w-full rounded-lg border px-10 py-2 shadow-sm outline-none text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-black"
                placeholder="Your Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <span className="absolute left-3 top-3">👤</span>
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                className="w-full rounded-lg border px-10 py-2 shadow-sm outline-none text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-black"
                placeholder="Your Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="absolute left-3 top-3">📧</span>
            </div>

            <div className="relative">
              <input
                type="password"
                name="password"
                className="w-full rounded-lg border px-10 py-2 shadow-sm outline-none text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-black"
                placeholder="Create Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="absolute left-3 top-3">🔒</span>
            </div>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border px-10 py-2 shadow-sm outline-none text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-black"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span className="absolute left-3 top-3">🔒</span>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-black hover:bg-indigo-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create an Account
            </button>

            <p className="text-sm text-center text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Popup for successful signup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-800">You are signed up!</h2>
            <p className="text-gray-600">You can now log in to your account.</p>
            <button
              onClick={handlePopupClose}
              className="mt-4 px-5 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SignUpComponent;


// import React, { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import bharatAi from "../assets/images/bharatai2.png";
// import { AuthContext } from "../context/AuthContext";

// const SignUpComponent = () => {
//   const { handleSignup, setName, setEmail, setPassword } =
//     useContext(AuthContext);
//   const [showPopup, setShowPopup] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await handleSignup(e); // Attempt signup
//       setShowPopup(true); // Show popup on success
//     } catch (error) {
//       console.error("Signup failed:", error);
//     }
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false); // Close the popup
//     navigate("/login"); // Redirect to the chat page
//   };

//   return (
//     <>
//       {showPopup && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-5 rounded shadow-lg">
//             <p className="text-black text-lg font-semibold">
//               You are signed up!
//             </p>
//             <button
//               onClick={handleClosePopup}
//               className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       <section className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex">
//         <div className="relative p-4 w-full max-w-md h-full md:h-auto">
//           <div className="relative rounded-lg bg-white p-6 space-y-4 md:space-y-6 sm:p-8">
//             <Link
//               to="/"
//               className="absolute top-3 right-2.5 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center"
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
//                   d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//               <span className="sr-only">Close popup</span>
//             </Link>

//             <div className="flex flex-col items-center space-y-8">
//               <div className="w-40 mb-2">
//                 <img src={bharatAi} alt="Bharat-ai-logo" />
//               </div>
//               <h1 className=" text-2xl font-semibold leading-5 text-slate-800 ">
//                 Register User
//               </h1>
//             </div>
//             <hr />
//             <form className="space-y-3 md:space-y-4 " onSubmit={handleSubmit}>
//               {/* Form Fields */}
//               <div className="relative">
//                 {/* <label
//                   htmlFor="name"
//                   className="block mb-2 text-sm font-medium text-gray-600 "
//                 >
//                   Name
//                 </label> */}

//                 <input
//                   type="text"
//                   name="name"
//                   id="name"
//                   className="block w-full rounded-lg border border-gray-300 px-10 py-2 shadow-sm outline-none text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
//                   placeholder="Your Name"
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//                 <span className="absolute left-3 top-3">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="size-5"
//                   >
//                     <path
//                       className="fill-gray-400"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
//                     />
//                   </svg>
//                 </span>
//               </div>
//               <div className="relative">
//                 {/* <label
//                   htmlFor="email"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Email
//                 </label> */}
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   className="block w-full rounded-lg border border-gray-300 px-10 py-2 shadow-sm outline-none text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
//                   placeholder="Your Email"
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//                 <span className="absolute left-3 top-3">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                     className="size-5"
//                   >
//                     <path
//                       className="fill-gray-400 "
//                       d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"
//                     />
//                     <path
//                       className="fill-gray-400 "
//                       d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"
//                     />
//                   </svg>
//                 </span>
//               </div>
//               <div className="relative">
//                 {/* <label
//                   htmlFor="password"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Password
//                 </label> */}
//                 <input
//                   type="password"
//                   name="password"
//                   id="password"
//                   className="block w-full rounded-lg border border-gray-300 px-10 py-2 shadow-sm outline-none text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
//                   placeholder="Create Password"
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <span className="absolute left-3 top-3">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                     className="size-5"
//                   >
//                     <path
//                       className="fill-gray-400 "
//                       fillRule="evenodd"
//                       d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </span>
//               </div>
//               <div className="relative">
//                 {/* <label
//                   htmlFor="password"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Password
//                 </label> */}
//                 <input
//                   type="password"
//                   // name="password"
//                   // id="password"
//                   className="block w-full rounded-lg border border-gray-300 px-10 py-2 shadow-sm outline-none text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
//                   placeholder="Confirm Password"
//                   // onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <span className="absolute left-3 top-3">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                     className="size-5"
//                   >
//                     <path
//                       className="fill-gray-400 "
//                       fillRule="evenodd"
//                       d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </span>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full text-white bg-black hover:bg-indigo-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//               >
//                 Create an account
//               </button>

//               <p className="text-sm font-light text-gray-500">
//                 Already have an account?{" "}
//                 <Link
//                   to="/login"
//                   className="font-medium text-indigo-500 hover:underline "
//                 >
//                   Sign in here
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default SignUpComponent;



// import React, { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import bharatAi from "../assets/images/bharatai2.png";
// import { AuthContext } from "../context/AuthContext";

// const SignUpComponent = () => {
//   const { setName, setEmail, setPassword } = useContext(AuthContext);
//   const [showPopup, setShowPopup] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // This function won't do anything as it's now disabled.
//     console.log("Signup is disabled for now.");
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false); // Close the popup
//     navigate("/login"); // Redirect to the login page
//   };

//   return (
//     <>
//       {showPopup && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-5 rounded shadow-lg">
//             <p className="text-black text-lg font-semibold">
//               You are signed up!
//             </p>
//             <button
//               onClick={handleClosePopup}
//               className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       <section className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex">
//         <div className="relative p-4 w-full max-w-md h-full md:h-auto">
//           <div className="relative rounded-lg bg-white p-6 space-y-4 md:space-y-6 sm:p-8">
//             <Link
//               to="/"
//               className="absolute top-3 right-2.5 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center"
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
//                   d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//               <span className="sr-only">Close popup</span>
//             </Link>

//             <div className="flex flex-col items-center space-y-8">
//               <div className="w-40 mb-2">
//                 <img src={bharatAi} alt="Bharat-ai-logo" />
//               </div>
//               <h1 className=" text-2xl font-semibold leading-5 text-slate-800 ">
//                 Register User
//               </h1>
//             </div>
//             <hr />
//             <form className="space-y-3 md:space-y-4 " onSubmit={handleSubmit}>
//               {/* Form Fields */}
//               <div className="relative">
//                 <input
//                   type="text"
//                   name="name"
//                   id="name"
//                   className="block w-full rounded-lg border border-gray-300 px-10 py-2 shadow-sm outline-none text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
//                   placeholder="Your Name"
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//                 <span className="absolute left-3 top-3">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="size-5"
//                   >
//                     <path
//                       className="fill-gray-400"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
//                     />
//                   </svg>
//                 </span>
//               </div>
//               <div className="relative">
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   className="block w-full rounded-lg border border-gray-300 px-10 py-2 shadow-sm outline-none text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
//                   placeholder="Your Email"
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//                 <span className="absolute left-3 top-3">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                     className="size-5"
//                   >
//                     <path
//                       className="fill-gray-400 "
//                       d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"
//                     />
//                     <path
//                       className="fill-gray-400 "
//                       d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"
//                     />
//                   </svg>
//                 </span>
//               </div>
//               <div className="relative">
//                 <input
//                   type="password"
//                   name="password"
//                   id="password"
//                   className="block w-full rounded-lg border border-gray-300 px-10 py-2 shadow-sm outline-none text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
//                   placeholder="Create Password"
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <span className="absolute left-3 top-3">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                     className="size-5"
//                   >
//                     <path
//                       className="fill-gray-400 "
//                       fillRule="evenodd"
//                       d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </span>
//               </div>
//               <div className="relative">
//                 <input
//                   type="password"
//                   className="block w-full rounded-lg border border-gray-300 px-10 py-2 shadow-sm outline-none text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
//                   placeholder="Confirm Password"
//                   required
//                 />
//                 <span className="absolute left-3 top-3">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                     className="size-5"
//                   >
//                     <path
//                       className="fill-gray-400 "
//                       fillRule="evenodd"
//                       d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </span>
//               </div>
//               <button
//                 type="submit"
//                 disabled={true}  // Disable the button to prevent the form from being submitted
//                 className="w-full text-white bg-gray-400 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//               >
//                 Create an account
//               </button>

//               <p className="text-sm font-light text-gray-500">
//                 Already have an account?{" "}
//                 <Link
//                   to="/login"
//                   className="font-medium text-indigo-500 hover:underline "
//                 >
//                   Sign in here
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default SignUpComponent;
