
// const Carouse = () => {
//   return (
//     <div>
//     <div id="default-carousel" className="relative" data-carousel="slide">
//     {/* <!-- Carousel wrapper --> */}
//     <div className="relative h-56 overflow-hidden rounded-lg md:h-24">
//       {/* <!-- Item 1 --> */}
//       <div className="active duration-700 ease-in-out" data-carousel-item>
//         <span className="absolute text-2xl font-semibold text-black -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 sm:text-3xl dark:text-gray-800">
//           First Slide
//         </span>
//         <img
//           src="https://picsum.photos/200"
//           className="active block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
//           alt="..."
//         />
//       </div>
//       {/* <!-- Item 2 --> */}
//       <div className="hidden duration-700 ease-in-out" data-carousel-item>
//         <img
//           src="https://picsum.photos/201"
//           className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
//           alt="..."
//         />
//       </div>
//       {/* <!-- Item 3 --> */}
//       <div className="hidden duration-700 ease-in-out" data-carousel-item>
//       <img src="https://picsum.photos/202" alt="Imagen 3" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
//         {/* <img
//           src="http://anantagro.in/images/945x320xtomato-export-abc-fruits1.jpg"
//           className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
//           alt="..."
//         /> */}
//       </div>
//     </div>
//     {/* <!-- Slider indicators --> */}
//     <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
//       <button
//         type="button"
//         className="w-3 h-3 rounded-full bg-black"
//         aria-current="false"
//         aria-label="Slide 1"
//         data-carousel-slide-to="0"
//       ></button>
//       <button
//         type="button"
//         className="w-3 h-3 rounded-full bg-black"
//         aria-current="false"
//         aria-label="Slide 2"
//         data-carousel-slide-to="1"
//       ></button>
//       <button
//         type="button"
//         className="w-3 h-3 rounded-full bg-black"
//         aria-current="false"
//         aria-label="Slide 3"
//         data-carousel-slide-to="2"
//       ></button>
//     </div>
//     {/* <!-- Slider controls --> */}
//     <button
//       type="button"
//       className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none bg-black"
//       data-carousel-prev
//     >
//       <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//         <svg
//           aria-hidden="true"
//           className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             stroke-width="2"
//             d="M15 19l-7-7 7-7"
//           ></path>
//         </svg>
//         <span className="sr-only">Previous</span>
//       </span>
//     </button>
//     <button
//       type="button"
//       className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none bg-black"
//       data-carousel-next
//     >
//       <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//         <svg
//           aria-hidden="true"
//           className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
//           fill="red"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             stroke-width="2"
//             d="M9 5l7 7-7 7"
//           ></path>
//         </svg>
//         <span className="sr-only">Next</span>
//       </span>
//     </button>
//   </div>
//   </div>
    

//   )
// }

// export default Carouse


// src/components/Carousel.jsx

import React, { useEffect, useState } from 'react';
import  Back  from '../../assets/images/css.png';

const images = [
  Back,
  'https://picsum.photos/201',
  'https://picsum.photos/200',
];

const Carouse = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-lg shadow-lg">
      {images.map((image, index) => (
        <div
          key={index}
          className={`h-20 w-20 inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
        </div>
      ))}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4 space-x-3 bg-opacity-50 bg-gray-800">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
    </>

  );
};

export default Carouse;
