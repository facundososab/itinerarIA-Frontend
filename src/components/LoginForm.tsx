import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import User from "../interfaces/User";
import { Eye, EyeOff } from "lucide-react";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const { signIn, isAuthenticated, authErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    console.log(authErrors);
    signIn(values);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/itinerarios");
    }
  }, [isAuthenticated]);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-8">
      <meta name="description" content="Login to access your itineraries" />
      <meta name="robots" content="index, follow" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-white">
          Login
        </h1>
      </div>

      <div className="bg-raisin-black w-full max-w-md mx-auto rounded-lg shadow-md p-8 mt-8">
        {authErrors.length > 0 && (
          <div
            className="bg-red-50 border-l-4 border-red-400 p-4 mb-6"
            role="alert"
            aria-live="assertive"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  There were some errors with your login
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <ul className="list-disc pl-5 space-y-1">
                    {authErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-6" noValidate>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white"
            >
              Username
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="username"
                type="text"
                aria-invalid={errors.username ? "true" : "false"}
                {...register("username", { required: "Username is required" })}
                className="block w-full px-3 py-2 bg-davys-gray border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your username"
              />
            </div>
            {errors.username?.message && (
              <p
                className="mt-2 text-sm text-red-600"
                role="alert"
                id="username-error"
              >
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password Field with Toggle */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="password"
                type={showPassword ? "text" : "password"} // Dynamic type based on toggle
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password", { required: "Password is required" })}
                className="block w-full px-3 py-2 bg-davys-gray border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your password"
              />
              {/* Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password?.message && (
              <p
                className="mt-2 text-sm text-red-600"
                role="alert"
                id="password-error"
              >
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-label="Sign in"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-raisin-black text-white">
                Don't have an account?
              </span>
            </div>
          </div>

          <div className="mt-4">
            <Link
              to="/register"
              className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-gray-50 transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-label="Sign up"
            >
              Sign up {"->"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
