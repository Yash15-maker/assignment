import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const { token, logout } = useAuth();
    const history = useNavigate();

    const handleLogout = () => {
        logout();
        history('/');
    };

    return (
        <header className="bg-blue-600 shadow-md text-white">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/users" className="text-3xl font-bold hover:text-gray-100 transition duration-200">
                    User Management
                </Link>
                <nav className="flex items-center space-x-4">
                    {token && (
                        <>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-lg transition duration-300"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
