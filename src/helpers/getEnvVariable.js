
export const getEnvVariable = () => {
  const {
    // fibre
    VITE_FIBRE_API_URL,

    //variables api the factory
    VITE_THEFACTORY_API_URL,
    VITE_THEFACTORY_USUARIO,
    VITE_THEFACTORY_CLAVE,

    //variables api saint
    VITE_SANIT_API_URL,
    VITE_SANIT_USER,
    VITE_SANIT_PASSWORD,
    VITE_SANIT_X_API_KEY,
    VITE_SANIT_ID_APP,
  } = import.meta.env;
  
  return {
    // fibre
    VITE_FIBRE_API_URL,

    //variables api the factory
    VITE_THEFACTORY_API_URL,
    VITE_THEFACTORY_USUARIO,
    VITE_THEFACTORY_CLAVE,

    //variables api saint
    VITE_SANIT_API_URL,
    VITE_SANIT_USER,
    VITE_SANIT_PASSWORD,
    VITE_SANIT_X_API_KEY,
    VITE_SANIT_ID_APP,
  };
};
export default getEnvVariable;
