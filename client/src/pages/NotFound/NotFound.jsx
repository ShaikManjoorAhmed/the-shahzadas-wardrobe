import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
      <p className="text-gold text-xl font-semibold mb-2">Page Not Found</p>
      <p className="text-gray-500 mb-8 max-w-md">
        Looks like this page wandered off the wardrobe. Let's get you back to shopping.
      </p>
      <Link
        to="/"
        className="bg-primary text-gold font-semibold px-8 py-3 rounded-lg hover:bg-primary-light transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;