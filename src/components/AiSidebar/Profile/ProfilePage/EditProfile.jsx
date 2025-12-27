import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";

const ProfileComponent = ({}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, userToken } = useContext(AuthContext);
  // Initialize state with user details or default values
  const [users, setUsers] = useState({
    fullName: user?.fullName || "John Doe",
    email: user?.email || "johndoe@example.com",
    // phone: user?.phone || "(123) 456-7890",
    // location: user?.location || "India",
  });

  // Update state when user context changes
  useEffect(() => {
    if (user) {
      setUsers({
        fullName: user.name,
        email: user.email,
        // phone: user.phone,
        // location: user.location,
      });
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // to save in backend
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsers((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-400 border-opacity-40 dark:bg-[#1d1d1d] ">
      <div className="flex justify-between items-start px-4 py-3">
        <div>
          <h3 className="text-lg capitalize leading-6 font-medium text-gray-900 dark:text-gray-100">
            {users.fullName}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">
            This is some information about the user.
          </p>
        </div>

        <button onClick={isEditing ? handleSaveClick : handleEditClick}>
          {isEditing ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                className="text-gray-500 dark:text-gray-300"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                className="text-gray-500 dark:text-gray-300"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="border-t border-gray-400 border-opacity-40 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-600">
          <div className="py-3 px-2 lg:py-3 md:px-4">
            <dt className="text-sm mb-2 font-medium capitalize text-gray-500 dark:text-gray-300">
              Full name
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={users.fullName}
                  onChange={handleChange}
                  className="border rounded w-full px-2 py-1 placeholder:text-gray-400 text-gray-700"
                />
              ) : (
                users.fullName
              )}
            </dd>
          </div>
          <div className="py-3 px-2 lg:py-3 md:px-4">
            <dt className="text-sm mb-2 font-medium capitalize text-gray-500 dark:text-gray-300 ">
              Email address
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={users.email}
                  onChange={handleChange}
                  className="border w-full rounded px-2 py-1 text-gray-700"
                />
              ) : (
                users.email
              )}
            </dd>
          </div>
        </dl>
      </div>
      {isEditing && (
        <div className="flex justify-end px-4 pb-3">
          <button
            onClick={handleSaveClick}
            className="bg-indigo-500 w-full hover:bg-gray-100 hover:text-gray-800 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
