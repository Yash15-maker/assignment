import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import PropTypes from "prop-types"
import { baseUrl } from '../assets/BaseUrl';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchUsers = async (page = 1) => {
        try {
            const response = await axios.get(`${baseUrl}/api/users?page=${page}`);
            setUsers(response.data.data);
            setCurrentPage(page);
            setTotalPages(response.data.total_pages);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchUserById = async (id) => {
        try {
            const response = await axios.get(`${baseUrl}/api/users/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw new Error('Failed to fetch user data.');
        }
    };
    const updateUser = async (id, userData) => {
        try {
            await axios.put(`${baseUrl}/api/users/${id}`, userData);
            setUsers(users.map(user => user.id === id ? { ...user, ...userData } : user));
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${baseUrl}/api/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <UserContext.Provider value={{ users, currentPage, totalPages, fetchUserById, fetchUsers, updateUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};