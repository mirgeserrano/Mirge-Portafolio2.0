export const getTokenTheFactory=()=>{
  const token = localStorage.getItem("TokenTheFactory");
  return token ? `Bearer ${token.replace(/"/g, "")}` : "";
}