import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import User from '../interfaces/User'

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>()
  const navigate = useNavigate()
  const { isAuthenticated, signup, authErrors } = useAuth()

  const onSubmit = handleSubmit(async (values) => {
    signup(values as User)
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Register
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            sign in to your account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-raisin-black py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {authErrors.length > 0 && (
            <div className="bg-red-50 border-l-4 sm:rounded-lg border-red-400 p-4 mb-6">
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
                  {...register('username', {
                    required: 'Username is required',
                  })}
                  className="appearance-none block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 bg-davys-gray focus:outline-none focus:ring-blue-500 sm:text-sm"
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
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  className="appearance-none block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 bg-davys-gray focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="nombres"
                className="block text-sm font-medium text-white"
              >
                First Name
              </label>
              <div className="mt-1">
                <input
                  id="nombres"
                  type="text"
                  {...register('nombres', {
                    required: 'First name is required',
                  })}
                  className="appearance-none block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 bg-davys-gray focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
                {errors.nombres && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.nombres.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="apellidos"
                className="block text-sm font-medium text-white"
              >
                Last Name
              </label>
              <div className="mt-1">
                <input
                  id="apellidos"
                  type="text"
                  {...register('apellidos', {
                    required: 'Last name is required',
                  })}
                  className="appearance-none block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 bg-davys-gray focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
                {errors.apellidos && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.apellidos.message}
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
                  {...register('mail', { required: 'Email is required' })}
                  className="appearance-none block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 bg-davys-gray focus:outline-none focus:ring-blue-500 sm:text-sm"
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
                htmlFor="nroTelefono"
                className="block text-sm font-medium text-white"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="nroTelefono"
                  type="tel"
                  {...register('nroTelefono', {
                    required: 'Phone number is required',
                  })}
                  className="appearance-none block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 bg-davys-gray focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
                {errors.nroTelefono && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.nroTelefono.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="fechaNacimiento"
                className="block text-sm font-medium text-white"
              >
                Date of Birth
              </label>
              <div className="mt-1">
                <input
                  id="fechaNacimiento"
                  type="date"
                  {...register('fechaNacimiento', {
                    required: 'Date of birth is required',
                  })}
                  className="appearance-none block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 bg-davys-gray focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
                {errors.fechaNacimiento && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.fechaNacimiento.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
