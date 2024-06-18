//*Token de Saint 

function getToken() {
  const pragma = localStorage.getItem("userInfo");
  return pragma ? pragma.replace(/"/g, "") : "";
}

export default getToken