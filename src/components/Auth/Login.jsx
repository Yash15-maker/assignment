import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('eve.holt@reqres.in');
    const [password, setPassword] = useState('cityslicka');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('https://reqres.in/api/login', { email, password });
            login(response.data.token);
            history('/users');
        } catch (error) {
            console.log(error.message);
            setError('Invalid email or password. Use the following credentials:');
        } finally {
            setLoading(false);
        }
    };

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);

        if (!validateEmail(emailValue)) {
            setError('Please enter a valid email address.');
        } else {
            setError('');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>
                {error && (
                    <div className=" text-center mb-4">
                        <p className='text-red-500'>{error}</p>
                        <p className='text-green-600'>Below are the Correct Email and Password</p>
                        <p className="font-medium">Email: <span className="font-normal">eve.holt@reqres.in</span></p>
                        <p className="font-medium">Password: <span className="font-normal">cityslicka</span></p>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading || error !== ''}
                        className={`w-full text-white py-3 rounded-lg transition duration-300 ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {loading ? 'Logging...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
