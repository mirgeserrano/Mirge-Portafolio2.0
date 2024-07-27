import  { useEffect, useState } from 'react';
import  Back  from '../../assets/images/css.png';


const images = [
  'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F998EFA4B5ABB7E9F0B',
  'https://lineadecodigo.com/wp-content/uploads/2014/04/css.png',
  'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/187_Js_logo_logos-512.png',
  'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png',
  'https://cdn4.iconfinder.com/data/icons/logos-3/456/nodejs-new-pantone-black-512.png',
  'https://res.cloudinary.com/practicaldev/image/fetch/s--1U72jiLN--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fd9osptk1dtp30ohe3fi.jpg',
  'https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png',
  'https://cdn2.iconfinder.com/data/icons/flat-database/512/SQL_package-512.png',
  'https://cdn4.iconfinder.com/data/icons/logos-3/512/mongodb-2-512.png',
  

];

const Carousel = () => {
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
    <div className="flex justify-center items-center text-2xl text-[#DD2476] font-semibold ">Stack Tecnológico</div>
    <div className='flex justify-center items-center p-6'>
    {images.map((image, index) => (
        <div
          key={index}
          //className={`h-30 w-25 inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          className={` transition-opacity duration-1000 ease-in-out p-1  ${index === currentIndex ? 'h-20 w-25 opacity-100  ' : 'h-10 w-10 opacity-50  '}`}
        >
          <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full" />
        </div>
      ))}
    </div>
    
      <div className="absolute bottom-0 left-0 right-0 flex justify-center p-1 space-x-3 bg-opacity-50 bg-gray-500">
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

export default Carousel;
