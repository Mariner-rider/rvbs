import React, { useContext, useEffect, useState } from "react";
import bharatAi from "../../assets/images/bharatai2.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import AiLogo from "../../assets/images/blogo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ShareComponent = () => {
  const { user, userToken } = useContext(AuthContext); // Get user and userToken from context
  // Fetch session data when the component mounts
  const { id } = useParams();
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/session-data/${id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setSessionData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    if (userToken) {
      fetchSessionData();
    }
  }, [id, userToken]);

  return (
    <div className="flex h-screen antialiased text-gray-800  dark:text-gray-300  dark:bg-slate-900">
      <div className="flex flex-col lg:flex-row h-full w-full overflow-x-hidden ">
        <div className="absolute top-2 left-0 right-0  lg:hidden w-36 mx-auto">
          <Link to="/">
            <img src={bharatAi} alt="logo" />
          </Link>
        </div>

        <div className="flex flex-col flex-auto h-full p-3 lg:p-6 lg:pl-3">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl mt-1 lg:mt-0 bg-gray-100 dark:bg-slate-800 h-[88vh] lg:h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4 yes-scrollbar">
              <div className="flex flex-col h-full">
                {/* <h1 className="text-black">Session Details</h1> */}
                {sessionData && sessionData.length > 0 ? (
                  <ul>
                    {sessionData.map((item, index) => (
                      <li key={index} className="py-2">
                        {item.sender === "user" && (
                          <div className="col-start-1 col-end-8 p-1 lg:p-3 rounded-lg">
                            <div className="flex flex-row items-center">
                              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="size-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                                  />
                                </svg>
                              </div>
                              <div className="relative ml-3 text-sm bg-white dark:bg-gray-200 py-2 px-4 shadow rounded-xl">
                                <div className="text-gray-800">
                                  {item.content}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {item.sender === "bot" && (
                          <div className="col-start-1 col-end-8 p-1 lg:p-3 rounded-lg">
                            <div className="flex flex-row items-center">
                              <div className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0">
                                <img className="w-8" src={AiLogo} />
                              </div>
                              <div className="relative ml-3 text-sm bg-white dark:bg-gray-200 py-2 px-4 shadow rounded-xl">
                                <div
                                  className="text-gray-800"
                                  dangerouslySetInnerHTML={{
                                    __html: item.content,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No items found for this session.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareComponent;
