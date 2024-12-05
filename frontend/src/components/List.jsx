import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";

const List = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState("");
  //  const BASE_URL = "http://localhost/user_management/backend/api/";
   const BASE_URL = "https://user--management.rf.gd/backend/api/";



  // Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get(`${BASE_URL}get_all_user.php`)
      .then((response) => {
        setUserData(response.data.users);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const openModal = (type, user = null) => {
    setModalType(type);
    setSelectedUser(user);
  };

  const closeModal = () => {
    setModalType("");
    setSelectedUser(null);
  };

  // Create a new user
  const handleCreate = (event) => {
    event.preventDefault();
    const newUser = {
      name: event.target.name.value,
      email: event.target.email.value,
      dob: event.target.dob.value,
      password: event.target.password.value,
    };

    axios
      .post(`${BASE_URL}create_user.php`, newUser)
      .then(() => {
        fetchUsers();
        closeModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Edit user details
  const handleEdit = (event) => {
    event.preventDefault();
    const updatedUser = {
      id: selectedUser.id,
      name: event.target.name.value,
      email: event.target.email.value,
      dob: event.target.dob.value,
      password: event.target.password.value,
    };

    axios
      .post(`${BASE_URL}update_user.php`, updatedUser)
      .then(() => {
        fetchUsers();
        closeModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Delete a user
  const handleDelete = () => {
    axios
      .post(`${BASE_URL}delete_user.php`, { id: selectedUser.id })
      .then(() => {
        fetchUsers();
        closeModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
            onClick={() => openModal("create")}
          >
            <FaPlus className="mr-2" /> Create User
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 bg-white rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  SR No
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Date of Birth
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Password
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {userData &&
                userData.map((user, i) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 text-sm text-gray-800">{i + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {user?.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {user?.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {user?.dob}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {user?.password}
                    </td>

                    <td className="px-6 py-4 text-sm text-center">
                      <button
                        className="text-blue-500 hover:text-blue-700 mx-2"
                        onClick={() => openModal("view", user)}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="text-green-500 hover:text-green-700 mx-2"
                        onClick={() => openModal("edit", user)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 mx-2"
                        onClick={() => openModal("delete", user)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {modalType && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              ✕
            </button>

            {modalType === "delete" && (
              <div>
                <h2 className="text-lg font-bold mb-4">Delete User</h2>
                <p>Are you sure you want to delete this user?</p>
                <button
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            )}
            {modalType === "create" || modalType === "edit" ? (
              <form
                onSubmit={modalType === "create" ? handleCreate : handleEdit}
              >
                <h2 className="text-2xl font-semibold mb-6">
                  {modalType === "create" ? "Create User" : "Edit User"}
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      defaultValue={
                        modalType === "edit" ? selectedUser?.name : ""
                      }
                      className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={
                        modalType === "edit" ? selectedUser?.email : ""
                      }
                      className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
                  <div>
                    <label
                      htmlFor="dob"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Date of Birth
                    </label>
                    <input
                      id="dob"
                      name="dob"
                      type="date"
                      defaultValue={
                        modalType === "edit" ? selectedUser?.dob : ""
                      }
                      className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      defaultValue={
                        modalType === "edit" ? selectedUser?.password : ""
                      }
                      className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mr-3 inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-light bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {modalType === "create" ? "Create" : "Save Changes"}
                  </button>
                </div>
              </form>
            ) : modalType === "view" ? (
              <div>
                <h2 className="text-2xl font-semibold mb-6">View User</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <strong>Name:</strong> {selectedUser?.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {selectedUser?.email}
                  </div>
                  <div>
                    <strong>Date of Birth:</strong> {selectedUser?.dob}
                  </div>
                  <div>
                    <strong>Password:</strong> {selectedUser?.password}
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
