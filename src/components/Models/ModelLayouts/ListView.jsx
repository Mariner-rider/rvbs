import React from "react";
import { products } from "./ModelList";

const Product = ({
  productImageUrl,
  id,
  title,
  description,
  submitterAvatarUrl,
}) => {
  return (
    <div className="w-full px-4 ">
      <div className="mb-9 flex justify-evenly rounded-xl py-8 shadow-md  bg-gray-200 transition-all hover:shadow-lg  ">
        <div className="flex justify-center items-center">
          <svg
            width="67"
            height="60"
            viewBox="0 0 67 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.892 6.67578C17.892 6.1235 18.3397 5.67578 18.892 5.67578H24.226C26.4351 5.67578 28.226 7.46664 28.226 9.67578V32.789C28.226 33.3413 27.7783 33.789 27.226 33.789C26.6737 33.789 26.226 33.3413 26.226 32.789V9.67578C26.226 8.57121 25.3305 7.67578 24.226 7.67578H18.892C18.3397 7.67578 17.892 7.22807 17.892 6.67578Z"
              fill="#6A64F1"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M37.8959 38.7891C37.8959 38.2368 38.3436 37.7891 38.8959 37.7891H49.7859C51.995 37.7891 53.7859 39.5799 53.7859 41.7891V50.5679C53.7859 51.1202 53.3382 51.5679 52.7859 51.5679C52.2336 51.5679 51.7859 51.1202 51.7859 50.5679V41.7891C51.7859 40.6845 50.8905 39.7891 49.7859 39.7891H38.8959C38.3436 39.7891 37.8959 39.3413 37.8959 38.7891Z"
              fill="#ABA8F7"
            ></path>
            <rect width="20.0016" height="13.3344" rx="2" fill="#6A64F1"></rect>
            <rect
              x="19"
              y="33"
              width="21"
              height="11"
              rx="2"
              fill="#ABA8F7"
            ></rect>
            <rect
              x="39.8958"
              y="47.666"
              width="24.6688"
              height="11.3344"
              rx="2"
              fill="white"
              stroke="#6A64F1"
              strokeWidth="2"
            ></rect>
            <rect
              x="21"
              y="18"
              width="45"
              height="10"
              rx="2"
              fill="white"
              stroke="#6A64F1"
              strokeWidth="2"
            ></rect>
          </svg>
        </div>
        <div>
          <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-900 sm:text-2xl lg:text-xl xl:text-2xl">
            Easy to Use Form API
          </h3>
          <p className="text-base text-gray-700 dark:text-gray-700 font-medium text-body-color">
            Simple and easy-to use form API all you need to paste your end-point
            URL on your form, rest assured by FormBold.
          </p>
          <div className="mt-5">
            <button
              type="submit"
              className="relative flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white mr-4 lg:ml-0 px-8 lg:px-20 py-6 flex-shrink-0  overflow-hidden font-medium transition duration-300 ease-out shadow-md group"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange-500 group-hover:translate-x-0 ease">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.798v5.02a3 3 0 0 1-.879 2.121l-2.377 2.377a9.845 9.845 0 0 1 5.091 1.013 8.315 8.315 0 0 0 5.713.636l.285-.071-3.954-3.955a3 3 0 0 1-.879-2.121v-5.02a23.614 23.614 0 0 0-3 0Zm4.5.138a.75.75 0 0 0 .093-1.495A24.837 24.837 0 0 0 12 2.25a25.048 25.048 0 0 0-3.093.191A.75.75 0 0 0 9 3.936v4.882a1.5 1.5 0 0 1-.44 1.06l-6.293 6.294c-1.62 1.621-.903 4.475 1.471 4.88 2.686.46 5.447.698 8.262.698 2.816 0 5.576-.239 8.262-.697 2.373-.406 3.092-3.26 1.47-4.881L15.44 9.879A1.5 1.5 0 0 1 15 8.818V3.936Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.798v5.02a3 3 0 0 1-.879 2.121l-2.377 2.377a9.845 9.845 0 0 1 5.091 1.013 8.315 8.315 0 0 0 5.713.636l.285-.071-3.954-3.955a3 3 0 0 1-.879-2.121v-5.02a23.614 23.614 0 0 0-3 0Zm4.5.138a.75.75 0 0 0 .093-1.495A24.837 24.837 0 0 0 12 2.25a25.048 25.048 0 0 0-3.093.191A.75.75 0 0 0 9 3.936v4.882a1.5 1.5 0 0 1-.44 1.06l-6.293 6.294c-1.62 1.621-.903 4.475 1.471 4.88 2.686.46 5.447.698 8.262.698 2.816 0 5.576-.239 8.262-.697 2.373-.406 3.092-3.26 1.47-4.881L15.44 9.879A1.5 1.5 0 0 1 15 8.818V3.936Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ListView = () => {
  return (
    <div className=" mx-4 flex flex-wrap m-8">
      {products.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          url={product.url}
          votes={product.votes}
          submitterAvatarUrl={product.submitterAvatarUrl}
          productImageUrl={product.productImageUrl}
        />
      ))}
    </div>
  );
};

export default ListView;
