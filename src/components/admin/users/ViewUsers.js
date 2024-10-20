import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/config';
import { toast } from 'react-toastify';
import { SpinnerDotted } from 'spinners-react';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);
    
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, orderBy("createdAt", "desc"));

      onSnapshot(q, (snapshot) => {
        const allUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(allUsers);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      toast.error("Error fetching users: " + error.message);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      console.log(`Attempting to update user role for user ID: ${userId} to ${newRole}`);
      
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { role: newRole });

      toast.success(`${newRole.charAt(0).toUpperCase() + newRole.slice(1)} access granted successfully!`);
      getUsers(); // Refresh the users list
    } catch (error) {
      console.error("Error updating user role: ", error);
      toast.error("Error updating user role: " + error.message);
    }
  };

  const deleteUser = async (userId) => {
    try {
      console.log(`Attempting to delete user ID: ${userId}`);
      
      const userRef = doc(db, 'users', userId);
      await deleteDoc(userRef);

      toast.success("User deleted successfully!");
      getUsers(); // Refresh the users list
    } catch (error) {
      console.error("Error deleting user: ", error);
      toast.error("Error deleting user: " + error.message);
    }
  };

  return (
    <>
      {loading && (
        <div className='h-screen fixed bottom-0 top-0 bg-black/90 w-full z-50 flex justify-center items-center'>
          <SpinnerDotted />
        </div>
      )}
      <main className='bg-white'>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 lg:p-8 xl:p-10 mt-2">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-title-md2 font-bold text-black">All Users</h2>
          </div>

          <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
            <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">ID</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Email</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Role</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Created At</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {users.length > 0 ? users.map((user, index) => {
                    const { id, role, email, createdAt } = user;
                    return (
                      <tr key={id}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          <div className="text-sm leading-5 text-gray-800">{index + 1}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          <div className="text-sm leading-5 text-gray-800">{email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          <div className="text-sm leading-5 text-blue-900">{role}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          <div className="text-sm leading-5 text-gray-800">{createdAt.toDate().toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          <div className="flex space-x-3 mt-2">
                            {/* Grant Admin Access */}
                            {role !== 'admin' ? (
                              <button 
                                className="px-2 py-1 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                                onClick={() => updateUserRole(id, 'admin')}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                Grant Admin
                              </button>
                            ) : (
                              <button 
                                className="px-2 py-1 border-red-500 border text-red-500 rounded transition duration-300 hover:bg-red-700 hover:text-white focus:outline-none"
                                onClick={() => updateUserRole(id, 'user')}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                Remove Admin
                              </button>
                            )}

                            {/* Delete User */}
                            <button 
                              className="px-2 py-1 border-red-500 border text-red-500 rounded transition duration-300 hover:bg-red-700 hover:text-white focus:outline-none"
                              onClick={() => deleteUser(id)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan="5" className="text-center px-6 py-4 border-b border-gray-500">No users available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ViewUsers;
