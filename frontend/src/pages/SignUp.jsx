import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const { username, email, password } = formData;

        if (!username || !email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post('https://podcast-gk2v.onrender.com/api/v1/sign-up', formData);

            if (response.data.success) {
                navigate('/login');
            } else {
                setError(response.data.message || 'Registration failed.');
            }
        } catch (err) {
            console.log(err);
            
            const message = err.response?.data?.message || "Signup failed. Please try again.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold bg-green-900 bg-clip-text text-transparent">
                        Create Account
                    </h2>
                    <p className="mt-1 text-black">Join Podcaster today</p>
                </div>

                <div className="relative bg-white rounded-lg p-8 shadow-xl border border-gray-700  text-black">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="p-4 bg-red-900/50 border border-red-500/50 rounded-lg text-red-200 text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium  mb-2">Username</label>
                            <div className="relative">
                                <UserIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 " />
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className="pl-10 w-full px-4 py-2.5 bg-green-100 placeholder-black border border-gray-600 rounded-lg focus:outline-none focus:border-green-900 focus:ring-1 focus:ring-green-500"
                                    placeholder="Enter a username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium  mb-2">Email</label>
                            <div className="relative">
                                <EnvelopeIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 " />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="pl-10 w-full px-4 py-2.5 bg-green-100 placeholder-black border border-gray-600 rounded-lg focus:outline-none focus:border-green-900 focus:ring-1 focus:ring-green-500"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium  mb-2">Password</label>
                            <div className="relative">
                                <LockClosedIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 " />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="pl-10 w-full px-4 py-2.5 bg-green-100 placeholder-black border border-gray-600 rounded-lg focus:outline-none focus:border-green-900 focus:ring-1 focus:ring-green-500"
                                    placeholder="Enter a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white  bg-green-900 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-[1.02]'}`}
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : 'Sign Up'}
                        </button>
                    </form>
                </div>

                <div className="text-center">
                    <p className="text-sm text-black">
                        Already have an account? <Link to="/logIn" className="font-bold text-green-900 hover:text-green-700 transition-colors duration-200">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
