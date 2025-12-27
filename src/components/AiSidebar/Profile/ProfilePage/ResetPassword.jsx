import React from "react";

const ResetPassword = () => {
  return (
    <div className=" w-full flex items-center justify-center">
      <div className="bg-white opacity-90 overflow-hidden dark:bg-slate-900 shadow rounded-lg border border-gray-400 border-opacity-40 px-4 pt-3 pb-3  w-full">
        <form>
          <div className="mb-4">
            <label
              className="text-sm leading-6 font-medium text-gray-900 dark:text-gray-100"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="appearance-none text-sm border rounded w-full mt-1 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email address"
            />
          </div>
          <button
            className="bg-indigo-500 hover:bg-blue-700 text-white font-bold text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
