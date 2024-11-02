import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
  CheckCircle,
} from 'lucide-react'
import User from '../interfaces/User'

export default function MyAccountPage() {
  const { user, updateUser, authErrors } = useAuth()
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState<User | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    setFormData(user)
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    formData && updateUser(formData)
    if (authErrors.length === 0) {
      setEditMode(false)
      setSuccessMessage('Your profile has been updated successfully!')
      setTimeout(() => setSuccessMessage(null), 5000) // Clear message after 5 seconds
    }
  }

  if (!formData) {
    return <div className="text-indigo-100">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#131316] text-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">My Account</h1>
        <div className="bg-[#1c1c21] shadow rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-indigo-300"
                >
                  Username
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon
                      className="h-5 w-5 text-indigo-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="mt-1 block w-full h-12 pl-10 pr-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.username}
                    onChange={handleInputChange}
                    disabled={!editMode}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="mail"
                  className="block text-sm font-medium text-indigo-300"
                >
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MailIcon
                      className="h-5 w-5 text-indigo-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="email"
                    name="mail"
                    id="mail"
                    className="mt-1 block w-full h-12 pl-10 pr-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.mail}
                    onChange={handleInputChange}
                    disabled={!editMode}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="names"
                  className="block text-sm font-medium text-indigo-300"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="names"
                  id="names"
                  className="mt-1 block w-full h-12 px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.names}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-indigo-300"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="mt-1 block w-full h-12 px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-indigo-300"
                >
                  Phone Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PhoneIcon
                      className="h-5 w-5 text-indigo-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    className="mt-1 block w-full h-12 pl-10 pr-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    disabled={!editMode}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-indigo-300"
                >
                  Date of Birth (DD/MM/YYYY)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon
                      className="h-5 w-5 text-indigo-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    className="mt-1 block w-full h-12 pl-10 pr-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={String(formData.dateOfBirth).split('T')[0]}
                    onChange={handleInputChange}
                    disabled={!editMode}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              {editMode ? (
                <>
                  <button
                    type="button"
                    className="mr-3 bg-[#2f3037] text-indigo-300 hover:bg-[#393a41] px-4 py-2 rounded-md transition duration-300"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md transition duration-300"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md transition duration-300"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
          {successMessage && (
            <div className="mt-4 p-4 bg-green-800 text-green-100 rounded-md flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              {successMessage}
            </div>
          )}
          {authErrors.length > 0 && (
            <div className="mt-4 p-4 bg-red-800 text-red-100 rounded-md flex items-center">
              {authErrors}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
