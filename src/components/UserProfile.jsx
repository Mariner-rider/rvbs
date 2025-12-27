import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Avatar, Dropdown } from "flowbite-react";

export default function UserProfile() {
  const { user, handleSignOut } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log("User in UserProfile:", user); // Debugging: Check if user exists

  const reload = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="bg-gray-800 rounded-md pr-2 hover:bg-orange-500">
      <Dropdown
        inline
        label={
          <Avatar
            className="h-0 md:h-4 lg:w-4 mr-2 lg:h-8"
            img={user.photoURL}
            rounded
          />
        }
      >
        <Dropdown.Header>
          <span className="block text-gray-800 text-sm dark:text-gray-100 capitalize font-semibold">
            {user?.name || "Guest"} {/* Fallback name */}
          </span>
          <span className="block text-gray-600 truncate dark:text-gray-200 text-sm font-medium">
            {user?.email || "No email provided"} {/* Fallback email */}
          </span>
        </Dropdown.Header>
        <Link
          className="flex justify-between m-2 rounded-md px-4 py-2 text-sm font-semibold bg-orange-600 text-gray-100 hover:bg-orange-500 dark:hover:bg-orange-50 dark:text-gray-200 dark:hover:text-orange-600"
          onClick={async () => {
            console.log("SignOut button clicked"); // Debugging: Ensure the click event fires
            await handleSignOut();
            reload();
          }}
          to="/"
        >
          Sign Out
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.166 5.106a.75.75 0 0 1 0 1.06 8.25 8.25 0 1 0 11.668 0 .75.75 0 1 1 1.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </Link>
      </Dropdown>
    </div>
  );
}
