// import React, { useState, useEffect } from "react";
// import "tailwindcss/tailwind.css";

// const CarouselCard = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const cards = [
//     { id: 1, imageUrl: "/images/about section/ai1.jpg" },  // Update with your image URL
//     { id: 2, imageUrl: "/images/about section/ai2.jpg" },  // Update with your image URL
//     { id: 3, imageUrl: "/images/about section/ai3.jpg" },  // Update with your image URL
//     { id: 4, imageUrl: "/images/about section/ai2.jpg" },  // Update with your image URL
//     { id: 5, imageUrl: "/images/about section/ai3.jpg" },  // Update with your image URL
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length); // Shift index
//     }, 2000); // Moves every 2 seconds

//     return () => clearInterval(interval); // Clean up the interval on component unmount
//   }, [cards.length]);

//   // Get the next 3 cards based on the current index
//   const visibleCards = [
//     cards[(currentIndex + 0) % cards.length],
//     cards[(currentIndex + 1) % cards.length],
//     cards[(currentIndex + 2) % cards.length],
//   ];

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       {/* Heading */}
//       <h1 className="text-4xl font-bold text-white-800 mb-10">Carousel Demo</h1>

//       {/* Row with Text on Left and Carousel on Right */}
//       <div className="flex w-full max-w-screen-xl items-center">
//         {/* Left Text Column */}
//         <div className="w-2/5 h-96 flex items-center justify-center text-xl font-medium text-white-700">
//           Your left-side text goes here.
//         </div>

//         {/* Carousel Container */}
//         <div className="w-3/5 relative h-96 overflow-hidden">
//           <div className="flex transition-transform duration-500 ease-in-out">
//             {visibleCards.map((card) => (
//               <div
//                 key={card.id}
//                 className="flex-shrink-0 w-[20vw] mx-2 h-96 relative flex items-center justify-center" // 20% of the viewport width
//               >
//                 <img
//                   src={card.imageUrl}
//                   alt={`Card ${card.id}`}
//                   className="w-full h-full object-cover rounded-2xl"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarouselCard;
import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";

const CarouselCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = [
    { id: 1, imageUrl: "/images/about section/ai1.jpg" },  
    { id: 2, imageUrl: "/images/about section/ai2.jpg" },  
    { id: 3, imageUrl: "/images/about section/ai3.jpg" }, 
    { id: 4, imageUrl: "/images/about section/ai2.jpg" },  
    { id: 5, imageUrl: "/images/about section/ai3.jpg" },  
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length); 
    }, 5000); 

    return () => clearInterval(interval); 
  }, [cards.length]);

  
  const visibleCards = [
    cards[(currentIndex + 0) % cards.length],
    cards[(currentIndex + 1) % cards.length],
    cards[(currentIndex + 2) % cards.length],
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 md:px-0">
      
      <h1 className="text-4xl font-bold text-white-800 mb-10">Carousel Demo</h1>

      
      <div className="flex flex-col md:flex-row w-full max-w-screen-xl items-center">
        
        <div className="w-full md:w-2/5 h-96 flex items-center justify-center text-xl font-medium text-white-700 mb-6 md:mb-0">
          Your left-side text goes here.
        </div>

        
        <div className="w-full md:w-3/5 relative h-96 overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out">
            {visibleCards.map((card) => (
              <div
                key={card.id}
                className="flex-shrink-0 w-full sm:w-[90%] md:w-[45%] lg:w-[20vw] mx-2 h-96 relative flex items-center justify-center" 
                
              >
                <img
                  src={card.imageUrl}
                  alt={`Card ${card.id}`}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
