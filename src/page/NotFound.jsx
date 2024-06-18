import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";
import notFound from "../assets/images/404.png";

const NotFound = () => {
  const startLogout = useAuthStore();
  const dispatch = useDispatch();
  const signIn = () => {
    localStorage.clear();
    dispatch(startLogout());
  };

  return (
    <div>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <img src={notFound} className="w-96 h-96" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/home"
              className="rounded-md bg-[#1323C6] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#a7b3d8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            <Link
              onClick={signIn}
              to="/"
              className="text-sm font-semibold text-gray-900"
            >
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
export default NotFound;
