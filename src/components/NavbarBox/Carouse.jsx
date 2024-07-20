import  { useEffect, useState } from 'react';
import  Back  from '../../assets/images/css.png';

const images = [
  Back,
  'https://picsum.photos/201',
  'https://picsum.photos/200',
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
    <div className='flex'>
    {images.map((image, index) => (
        <div
          key={index}
          className={`h-20 w-20 inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
    
      <div className=" absolute bottom-0 left-0 right-0 flex justify-center p-4 space-x-3 bg-opacity-50 bg-gray-800">
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
