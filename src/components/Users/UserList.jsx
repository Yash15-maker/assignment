import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import UserCard from './UserCard';

const UserList = () => {
    const { users, currentPage, totalPages, fetchUsers, deleteUser } = useUser();
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [sortCriteria, setSortCriteria] = useState('first_name');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            await fetchUsers();
            setLoading(false);
        };
        loadUsers();
    }, []);

    useEffect(() => {
        const handleFilter = () => {
            const lowercasedTerm = searchTerm.toLowerCase();
            const filtered = users.filter(user =>
                user.first_name.toLowerCase().includes(lowercasedTerm) ||
                user.last_name.toLowerCase().includes(lowercasedTerm) ||
                user.email.toLowerCase().includes(lowercasedTerm)
            );
            const sorted = filtered.sort((a, b) => {
                const aValue = a[sortCriteria].toLowerCase();
                const bValue = b[sortCriteria].toLowerCase();
                if (sortOrder === 'asc') {
                    return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
                } else {
                    return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
                }
            });

            setFilteredUsers(sorted);
        };

        handleFilter();
    }, [searchTerm, users, sortCriteria, sortOrder]);

    const handlePageChange = async (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setLoading(true);
            await fetchUsers(newPage);
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">User List</h2>

            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full max-w-md"
                />
            </div>

            <div className="mb-6 flex justify-center space-x-4">
                <select
                    value={sortCriteria}
                    onChange={(e) => setSortCriteria(e.target.value)}
                    disabled={filteredUsers.length === 0}
                    className={`border border-gray-300 rounded-lg p-2 ${filteredUsers.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <option value="first_name">First Name</option>
                    <option value="last_name">Last Name</option>
                    <option value="email">Email</option>
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    disabled={filteredUsers.length === 0}
                    className={`border border-gray-300 rounded-lg p-2 ${filteredUsers.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <option value="asc">Low</option>
                    <option value="desc">High</option>
                </select>

            </div>

            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="spinner border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
                </div>
            ) : (
                <div>
                    {filteredUsers.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64">
                            <p className="text-lg text-gray-600">No users found matching your search criteria.</p>
                        </div>
                    ) : (
                        <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredUsers.map(user => (
                                    <UserCard key={user.id} user={user} onDelete={deleteUser} />
                                ))}
                            </div>
                            <div className="mt-8 flex justify-center items-center space-x-4">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-lg font-medium text-white transition duration-200 ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                                        }`}
                                >
                                    Previous
                                </button>
                                <span className="text-gray-600 text-lg">Page {currentPage} of {totalPages}</span>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded-lg font-medium text-white transition duration-200 ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                                        }`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserList;
