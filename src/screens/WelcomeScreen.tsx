import { Link } from "react-router-dom";


export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2">Welcome to SMHOS App Portal</h1>
        <p className="text-gray-600 text-center mb-6">Please click to log in</p>
        <div className="space-y-4">
          <Link to="/sign-in" className="block w-full bg-blue-70 hover:bg-blue-950 text-white font-semibold py-2 px-4 rounded text-center transition duration-300">
            Admin Store
          </Link>
        </div>
        <p className="text-xs text-gray-500 text-center mt-6">
          This is a secure system. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  )
}

