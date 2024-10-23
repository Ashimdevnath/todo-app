import React, { useEffect, useState, useContext } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { UserContext } from '../context/userContext';

const UserProfileDashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [points, setPoints] = useState(10000); // Placeholder for points system

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
      setPassword(user.password || '');
    }
  }, [user]);

  const handleUsernameEdit = () => {
    // Add logic for editing username
  };

  const handleEmailEdit = () => {
    // Add logic for editing email
  };

  const handlePasswordEdit = () => {
    // Add logic for editing password
  };

  const handleUpdate = () => {
    // Add logic for updating the user profile
  };

  if (!user) {
    return <div>Loading...</div>; // Display loading state while fetching data
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white max-w-3xl shadow overflow-hidden sm:rounded-lg px-6 py-8">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-xl leading-6 font-semibold text-gray-900">User Profile</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Details and information about the user.</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                <label className="flex items-center">
                  Username
                  <button className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none" onClick={handleUsernameEdit}>
                    <AiOutlineEdit />
                  </button>
                </label>
              </dt>
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="border-b-2 border-gray-300 outline-none text-lg" readOnly />
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                <label className="flex items-center">
                  Email Address
                  <button className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none" onClick={handleEmailEdit}>
                    <AiOutlineEdit />
                  </button>
                </label>
              </dt>
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border-b-2 border-gray-300 outline-none text-lg" readOnly />
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                <label className="flex items-center">
                  Password
                  <button className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none" onClick={handlePasswordEdit}>
                    <AiOutlineEdit />
                  </button>
                </label>
              </dt>
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="border-b-2 border-gray-300 outline-none text-lg" readOnly />
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                <label className="flex items-center">
                  Points
                </label>
              </dt>
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                <input type="number" value={points} className="border-b-2 border-gray-300 outline-none text-lg" readOnly />
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDashboard;
