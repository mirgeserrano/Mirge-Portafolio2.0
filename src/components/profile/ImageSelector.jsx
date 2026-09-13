import { useState } from "react";
import { MapIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Pent from "../../assets/Pent";

const ImageSelector = () => {
  const [selectedImage, setSelectedImage] = useState("/images/Foto.jpg");

  const images = [
    { name: <UserCircleIcon />, src: "/images/Foto.jpg" },
    { name: <MapIcon />, src: "/images/2.png" },
    { name: <Pent />, src: "/images/3.jpeg" },
  ];

  const handleImageChange = (src) => {
    setSelectedImage(src);
  };

  return (
    <div className="profile-image-selector relative flex justify-center px-4">
      <div className="flex flex-col items-center">
        <div className="relative group">
          <img
            src={selectedImage}
            alt="Selected"
            className="profile-image block w-[236px] h-[287px] object-cover drop-shadow-xl rounded-[20px] mx-auto"
          />
          <div className="flex flex-row absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-[20px] duration-300 bg-black bg-opacity-50">
            <div className="left-0 mt-2 w-14 bg-white shadow-md rounded group-hover:block">
              {images.map((image, index) => (
                <div
                  key={index}
                  className=" px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleImageChange(image.src)}
                >
                  {image.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSelector;
