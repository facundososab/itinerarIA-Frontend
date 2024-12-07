import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import User from "../interfaces/User";
import { Eye, EyeOff } from "lucide-react";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const navigate = useNavigate();
  const { isAuthenticated, signup, authErrors } = useAuth();

  const onSubmit = handleSubmit(async (values) => {
    signup(values as User);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/itinerarios");
    }
  }, [isAuthenticated, navigate]);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-full flex flex-col justify-center pb-12 sm:px-6 lg:px-8 px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Register
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            sign in to your account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-raisin-black py-8 px-4 shadow rounded-lg sm:px-10">
          {authErrors.length > 0 && (
            <div className="bg-red-50 border-4 sm:rounded-lg border-red-400 p-4 mb-6">
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
                    There were errors with your submission
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

          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  className="appearance-none block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 bg-davys-gray focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                {errors.username && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>

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
                  {...register("password", {
                    required: "Password is required",
                  })}
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
              <label
                htmlFor="names"
                className="block text-sm font-medium text-white"
              >
                First Name
              </label>
              <div className="mt-1">
                <input
                  id="names"
                  type="text"
                  placeholder="First names"
                  {...register("names", {
                    required: "First name is required",
                  })}
                  className="appearance-none block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 bg-davys-gray focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                {errors.names && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.names.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-white"
              >
                Last Name
              </label>
              <div className="mt-1">
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  className="appearance-none block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 bg-davys-gray focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="mail"
                className="block text-sm font-medium text-white"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="mail"
                  type="email"
                  placeholder="mail@example.com"
                  {...register("mail", { required: "Email is required" })}
                  className="appearance-none block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 bg-davys-gray focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                {errors.mail && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.mail.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-white"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Phone number"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                  })}
                  className="appearance-none block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 bg-davys-gray focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                {errors.phoneNumber && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-white"
              >
                Date of Birth
              </label>
              <div className="mt-1">
                <input
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth", {
                    required: "Date of birth is required",
                  })}
                  className="appearance-none block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 bg-davys-gray focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                {errors.dateOfBirth && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
