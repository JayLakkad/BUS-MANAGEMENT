import { LogOutIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CreateDriverID = () => {
    const token = localStorage.getItem('token');

    const [formData, setFormData] = useState({
        fullname: {
            firstname: '',
            lastname: ''
        },
        password: '',
        email: '',
        bus: {
            plate: ''
        },
        route: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;

        if (id === 'firstname' || id === 'lastname') {
            setFormData((prevData) => ({
                ...prevData,
                fullname: {
                    ...prevData.fullname,
                    [id]: value,
                },
            }));
        } else if (id === 'plate') {
            setFormData((prevData) => ({
                ...prevData,
                bus: {
                    ...prevData.bus,
                    plate: value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [id]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        try {
            const response = await axios.post(
                'http://localhost:5000/admin/create-driver',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200 || response.status === 201) {
                console.log('Driver created successfully!', response.data);
                alert('Driver created successfully!');
                // Reset the form fields
                setFormData({
                    fullname: {
                        firstname: '',
                        lastname: ''
                    },
                    email: '',
                    password: '',
                    bus: {
                        plate: ''
                    },
                    route: ''
                });
            } else {
                console.error('Failed to create driver.');
                alert('Failed to create driver.');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert('Unauthorized: Please check your token or credentials.');
            } else {
                console.error('Error:', error);
                alert('An error occurred while creating the driver.');
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
                <h2 className="text-2xl font-bold mb-6 text-center">Create Driver ID</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            value={formData.fullname.firstname}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="First Name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            value={formData.fullname.lastname}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Last Name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Password"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="plate">
                            Plate
                        </label>
                        <input
                            type="text"
                            id="plate"
                            value={formData.bus.plate}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Plate"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="route">
                            Route
                        </label>
                        <input
                            type="text"
                            id="route"
                            value={formData.route}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Route"
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

export default CreateDriverID;
