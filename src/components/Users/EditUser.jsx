import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { users, updateUser, fetchUserById } = useUser();
    const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '' });

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const user = users.find(u => u.id === parseInt(id));
                if (user) {
                    setFormData({ first_name: user.first_name, last_name: user.last_name, email: user.email });
                } else {
                    const fetchedUser = await fetchUserById(id);
                    setFormData({
                        first_name: fetchedUser.data.first_name,
                        last_name: fetchedUser.data.last_name,
                        email: fetchedUser.data.email
                    });
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                toast.error('Failed to fetch user data.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id, users, fetchUserById]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setFormData({ ...formData, email: emailValue });

        if (!validateEmail(emailValue)) {
            setError('Please enter a valid email address.');
        } else {
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        try {
            await updateUser(id, formData);
            toast.success('User updated successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate('/users');
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Failed to update user.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <div className="spinner"></div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="first_name" className="block mb-1">First Name</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block mb-1">Last Name</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleEmailChange}
                            required
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    {error && <div className="text-red-500">{error}</div>}
                    <button
                        type="submit"
                        className={`w-full text-white py-2 rounded hover:bg-blue-600 ${loading ? 'bg-gray-400' : 'bg-blue-500'}`}
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update User'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default EditUser;
