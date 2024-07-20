const Tarjeta = (prop) => {
  const { srcImagen, altImagen, titulo, empresa, colorFondo} =prop
  return (
    <div className={`rounded-lg p-6 bg-[${colorFondo}]  dark:bg-transparent dark:text-[#A6A6A6] dark:border-[2px] border-[#212425]`}>
      <img
        className="overflow-hidden rounded-lg"
        src={srcImagen}
        alt={altImagen}
      />
      <span className="pt-5 text-[14px] font-normal text-gray-lite block dark:text-[#A6A6A6]">{titulo}</span>
      <h1 className="font-medium cursor-pointer text-xl duration-300 transition hover:text-[#FA5252] dark:hover:text-[#FA5252] dark:text-white mt-2">
        {empresa}
      </h1>
    </div>
  );
};

export default Tarjeta;
