//*Token de Saint 
export const getToken = () => {
  const pragma = localStorage.getItem("userInfo");
  return pragma ? pragma.replace(/"/g, "") : "";
};
