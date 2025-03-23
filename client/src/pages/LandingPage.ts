import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Placeholder for user authentication check
        const isLoggedIn = localStorage.getItem("token"); 

        if (isLoggedIn) {
            navigate("/dashboard"); // Redirect to the dashboard if logged in
        } else {
            navigate("/login"); // Redirect to login page if not logged in
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
            <p className="text-lg text-gray-600 mb-6">
                Discover amazing features and join us today!
            </p>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                onClick={handleClick}
            >
                Get Started
            </button>
        </div>
    );
};

export default LandingPage;