import { Link } from "react-router-dom"; 

/*
Simple 404 Not Found page with an illustration and a button to return home.
Uses React Router's Link for smooth navigation.
*/

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-center">
      <div className="max-w-md">
        <img
          src={Images.NotFound}
          alt="404 Illustration"
          className="w-full mb-6"
        />
        
        <Link
          to="/"
          className="px-6 py-3 bg-blue-500 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
