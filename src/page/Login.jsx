
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import invoices from "../assets/images/Invoice.png";
import toast, { Toaster } from "react-hot-toast";
import useAuthStore from "../hooks/useAuthStore";
//import ApiFibre from "../api/ApiFibre";

import ApiTheFatory from "../api/ApiThefatory";

const schemaLogin = z.object({
  user: z.string(),
  password: z
    .string()
    .min(5, "La contraseña debe tener al menos 5 caracteres."),
});

export const Login = () => {
  const prueba = ApiTheFatory();
  console.log(prueba);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaLogin),
  });

  const [showAlert, setShowAlert] = useState(false);
  const { startLoginWithEmailPassword, errorMessage } = useAuthStore();

  const onSubmit = async (data) => {
    await dispatch(startLoginWithEmailPassword(data));
    const getPragma = localStorage.getItem("userInfo");
    if (getPragma) {
      navigate("/home");
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      setShowAlert(true);
      toast.error(errorMessage, {
        autoClose: 5000,
      });
    }
  }, [errorMessage]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className=" flex justify-center items-center   flex-grow   p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <img src={invoices} alt="Mi imagen" className=" w-64 h-64" />
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Usuario
                </label>
                <input
                  type="text"
                  className=" bg-gray-200 border border-transparent text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("user")}
                />
                {errors.user && (
                  <p className="text-red-500">{errors.user.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Contraseña
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className=" bg-gray-200 border border-transparent  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              {showAlert && (
                <div>
                  <Toaster position="top-center" reverseOrder={false} />
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};


