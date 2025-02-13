import { LogOutIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CreateStudentID = () => {

    const token = localStorage.getItem('token');

    const [formData, setFormData] = useState({
        fullname: {
            firstname: '',
            lastname: '',
        },
        email: '',
        password: '',
        Stop: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle nested fullname fields
        if (name === 'firstname' || name === 'lastname') {
            setFormData((prev) => ({
                ...prev,
                fullname: {
                    ...prev.fullname,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:5000/admin/create-user',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json', 
                    },
                }
            );

            if (response.status === 200 || response.status === 201) {
                alert('Student created successfully!');
                // Reset the form fields
                setFormData({
                    fullname: {
                        firstname: '',
                        lastname: '',
                    },
                    email: '',
                    password: '',
                    Stop: ''
                });
            } else {
                console.error('Failed to create student.');
                alert('Failed to create student.');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert('Unauthorized: Please check your token or credentials.');
            } else {
                console.error('Error:', error);
                alert('An error occurred while creating the student.');
            }
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center">
            <div className="w-10 h-10 rounded-full absolute top-3 right-3 flex justify-center items-center">
                <Link to="/admin-home">
                    <LogOutIcon />
                </Link>
            </div>
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Create Student ID</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">First Name:</label>
                        <input
                            type="text"
                            name="firstname"
                            value={formData.fullname.firstname}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Last Name:</label>
                        <input
                            type="text"
                            name="lastname"
                            value={formData.fullname.lastname}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Bus Stop:</label>
                        <input
                            type="text"
                            name="Stop"
                            value={formData.Stop}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateStudentID;
