import { Link, useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

const UserCard = ({ user, onDelete }) => {
    const navigate = useNavigate();
    const [isNavigating, setIsNavigating] = useState(false);

    const handleDelete = (id) => {
        onDelete(id);
        toast.success('User deleted successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleEditClick = (e) => {
        e.preventDefault();
        setIsNavigating(true);
        setTimeout(() => {
            navigate(`/users/${user.id}/edit`);
        }, 600);
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <img loading='lazy' src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 text-center mb-1">
                {user.first_name} {user.last_name}
            </h3>
            <p className="text-gray-500 text-center text-sm mb-4">{user.email}</p>
            <div className="flex justify-center space-x-3 mt-4">
                <Link
                    to={`/users/${user.id}/edit`}
                    onClick={handleEditClick}
                    className={`bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-all duration-300 ${isNavigating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isNavigating}
                >
                    Edit
                </Link>
                <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-all duration-300"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

UserCard.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        avatar: PropTypes.string.isRequired,
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    }).isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UserCard;
