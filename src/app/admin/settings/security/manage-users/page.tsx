"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaPen, FaTrash } from "react-icons/fa";
import user from "../../../../img/user.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ManageUserSettings = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "Active",
      fullName: "Juan Protacio",
      middleName: "",
      lastName: "Dela Cruz",
      extension: "Jr.",
      employeeId: "1023456",
      userAccess: "Librarian"
    },
    {
      id: 2,
      name: "Maria Clara",
      email: "maria.clara@example.com",
      role: "Librarian",
      status: "Active",
      fullName: "Maria Clara",
      middleName: "Ignacia",
      lastName: "Santos",
      extension: "",
      employeeId: "1023456",
      userAccess: "Librarian"
    },
    {
      id: 3,
      name: "Jose Burgos",
      email: "jose.burgos@example.com",
      role: "Librarian",
      status: "Inactive",
      fullName: "Jose Apolonio",
      middleName: "Gomez",
      lastName: "Burgos",
      extension: "",
      employeeId: "1023456",
      userAccess: "Librarian"
    },
    {
      id: 4,
      name: "Andres Bonifacio",
      email: "andres.b@example.com",
      role: "Admin",
      status: "Active",
      fullName: "Andres",
      middleName: "de Castro",
      lastName: "Bonifacio",
      extension: "",
      employeeId: "1023456",
      userAccess: "Admin"
    }
  ]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  // Add Librarian Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    fullName: "",
    middleName: "",
    lastName: "",
    extension: "",
    employeeId: "",
    email: "",
    userAccess: "Librarian",
    status: "Active"
  });
  const [newUserPasswords, setNewUserPasswords] = useState({
    password: "",
    confirmPassword: ""
  });
  const [newUserPasswordError, setNewUserPasswordError] = useState("");

  useEffect(() => setMounted(true), []);

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  const handleEditClick = (user) => {
    setCurrentUser(JSON.parse(JSON.stringify(user)));
    setPasswords({ newPassword: "", confirmPassword: "" });
    setPasswordError("");
    setShowEditModal(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete));
    }
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: value
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value
    });
  };

  const handleSave = () => {
    if (passwords.newPassword || passwords.confirmPassword) {
      if (passwords.newPassword !== passwords.confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }
      if (passwords.newPassword.length < 6) {
        setPasswordError("Password must be at least 6 characters");
        return;
      }
    }

    const updatedUsers = users.map(user => {
      if (user.id === currentUser.id) {
        const updatedName = `${currentUser.fullName} ${currentUser.lastName}${currentUser.extension ? ' ' + currentUser.extension : ''}`;
        
        return {
          ...currentUser,
          name: updatedName,
          role: currentUser.userAccess
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    setShowEditModal(false);
    setCurrentUser(null);
    setPasswords({ newPassword: "", confirmPassword: "" });
    setPasswordError("");
  };

  // Add Librarian handlers
  const handleAddLibrarian = () => {
    resetNewUserForm();
    setShowAddModal(true);
  };

  const resetNewUserForm = () => {
    setNewUser({
      fullName: "",
      middleName: "",
      lastName: "",
      extension: "",
      employeeId: "",
      email: "",
      userAccess: "Librarian",
      status: "Active"
    });
    setNewUserPasswords({
      password: "",
      confirmPassword: ""
    });
    setNewUserPasswordError("");
  };

  const handleNewUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    });
  };

  const handleNewUserPasswordChange = (e) => {
    const { name, value } = e.target;
    setNewUserPasswords({
      ...newUserPasswords,
      [name]: value
    });
  };

  const handleAddUser = () => {
    // Validate required fields
    if (!newUser.fullName || !newUser.lastName || !newUser.email || !newUser.employeeId) {
      setNewUserPasswordError("Please fill in all required fields");
      return;
    }

    // Validate passwords
    if (!newUserPasswords.password || !newUserPasswords.confirmPassword) {
      setNewUserPasswordError("Password is required");
      return;
    }

    if (newUserPasswords.password !== newUserPasswords.confirmPassword) {
      setNewUserPasswordError("Passwords do not match");
      return;
    }

    if (newUserPasswords.password.length < 6) {
      setNewUserPasswordError("Password must be at least 6 characters");
      return;
    }

    // Create new user name from form fields
    const name = `${newUser.fullName} ${newUser.lastName}${newUser.extension ? ' ' + newUser.extension : ''}`;
    
    // Generate a new unique ID (simple implementation)
    const newId = Math.max(...users.map(user => user.id)) + 1;
    
    // Add new user to the users array
    const userToAdd = {
      id: newId,
      name: name,
      email: newUser.email,
      role: newUser.userAccess,
      status: newUser.status,
      fullName: newUser.fullName,
      middleName: newUser.middleName,
      lastName: newUser.lastName,
      extension: newUser.extension,
      employeeId: newUser.employeeId,
      userAccess: newUser.userAccess
    };
    
    setUsers([...users, userToAdd]);
    setShowAddModal(false);
    resetNewUserForm();
  };

  if (!mounted) return null;

  return (
    <div className={`flex flex-col w-auto ${theme === 'light' ? 'bg-secondary border-white-50' : 'bg-midnight'} mr-10 p-6 rounded-xl border-1 border-white-5`}>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className={`p-6 rounded-lg ${theme === 'light' ? 'bg-white' : 'bg-dusk'} w-96 shadow-xl border ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'} pointer-events-auto`}>
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold">Are you sure you want to delete this user?</h2>
            </div>
            <div className="text-center mb-6 text-sm text-gray-500">
              This action cannot be undone
            </div>
            <div className="flex justify-center gap-4">
              <button 
                onClick={cancelDelete}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-opacity-10 hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="px-4 py-2 rounded-md bg-red-warning text-white hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && currentUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg bg-dusk w-full max-w-md relative z-10`}>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4 text-[#01B783]">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={currentUser.fullName}
                      onChange={handleInputChange}
                      className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Middle Name</label>
                    <input
                      type="text"
                      name="middleName"
                      value={currentUser.middleName}
                      onChange={handleInputChange}
                      className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={currentUser.lastName}
                      onChange={handleInputChange}
                      className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Ext. (e.g. III, Sr.)</label>
                    <input
                      type="text"
                      name="extension"
                      value={currentUser.extension}
                      onChange={handleInputChange}
                      className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px]"
                    />
                  </div>
                </div>
              </div>

             {/* Employee Information Section */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-[#01B783]">Employee Information</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Employee ID</label>
                    <input
                      type="text"
                      name="employeeId"
                      value={currentUser.employeeId}
                      onChange={handleInputChange}
                      className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">User Access</label>
                    <div className="relative">
                      <select
                        name="userAccess"
                        value={currentUser.userAccess}
                        onChange={handleInputChange}
                        className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px] pr-8 appearance-none"
                      >
                        <option>Librarian</option>
                        <option>Admin</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Moved Email Address Here */}
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={currentUser.email}
                    onChange={handleInputChange}
                    className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px]"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4 text-[#01B783]">Password</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Create Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Enter Password"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Enter Password Again"
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px]"
                  />
                </div>
                {passwordError && (
                  <p className="text-red-500 text-sm mt-2">{passwordError}</p>
                )}
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-[12px] bg-transparent border border-gray-600 hover:bg-opacity-10 hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-[12px] text-white transition-colors bg-[#01B783] hover:opacity-90"
                >
                  Update User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Librarian Modal - Modified to match the Edit Modal style */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg bg-dusk w-full max-w-md relative z-10`}>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4 text-[#01B783]">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={newUser.fullName}
                      onChange={handleNewUserInputChange}
                      className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Middle Name</label>
                    <input
                      type="text"
                      name="middleName"
                      value={newUser.middleName}
                      onChange={handleNewUserInputChange}
                      className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={newUser.lastName}
                      onChange={handleNewUserInputChange}
                      className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Ext. (e.g. III, Sr.)</label>
                    <input
                      type="text"
                      name="extension"
                      value={newUser.extension}
                      onChange={handleNewUserInputChange}
                      className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px]"
                    />
                  </div>
                </div>
              </div>

              {/* Employee Information Section */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-[#01B783]">Employee Information</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Employee ID *</label>
                    <input
                      type="text"
                      name="employeeId"
                      value={newUser.employeeId}
                      onChange={handleNewUserInputChange}
                      className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">User Access</label>
                    <div className="relative">
                      <select
                        name="userAccess"
                        value={newUser.userAccess}
                        onChange={handleNewUserInputChange}
                        className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px] pr-8 appearance-none"
                      >
                        <option>Librarian</option>
                        <option>Admin</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleNewUserInputChange}
                    className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px]"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4 text-[#01B783]">Password</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Create Password *</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={newUserPasswords.password}
                    onChange={handleNewUserPasswordChange}
                    className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Enter Password Again"
                    value={newUserPasswords.confirmPassword}
                    onChange={handleNewUserPasswordChange}
                    className="w-full p-2 pl-3 bg-dusk border border-[#444] rounded-xl text-white text-sm h-[45px]"
                  />
                </div>
                {newUserPasswordError && (
                  <p className="text-red-500 text-sm mt-2">{newUserPasswordError}</p>
                )}
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-[12px] bg-transparent border border-gray-600 hover:bg-opacity-10 hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  className="px-4 py-2 rounded-[12px] text-white transition-colors bg-[#01B783] hover:opacity-90"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between w-auto">
        <h1 className="text-2xl ml-1">Manage Users</h1>
        <button 
          onClick={handleAddLibrarian}
          className="bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br p-2 px-4 font-sans flex items-center gap-2 rounded-lg cursor-pointer">
          Add Librarian
        </button>
      </div>

      <div className={`h-0.5 w-auto my-4 ${theme === 'light' ? 'bg-white-50' : 'bg-dusk'}`}></div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[250px]">Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((userData) => (
            <TableRow key={userData.id}>
              <TableCell className="py-3 align-middle">
                <div className="flex justify-center">
                  <Image
                    src={user}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="py-3 align-middle">{userData.name}</TableCell>
              <TableCell className="py-3 align-middle">{userData.email}</TableCell>
              <TableCell className="py-3 align-middle">{userData.role}</TableCell>
              <TableCell className="py-3 align-middle">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  userData.status === "Active" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                }`}>
                  {userData.status}
                </span>
              </TableCell>
              <TableCell className="py-3 align-middle">
                <div className="flex gap-2 justify-center">
                  <button 
                    onClick={() => handleDeleteClick(userData.id)}
                    className="cursor-pointer bg-red-warning text-white p-2 rounded-md hover:bg-red-700"
                  >
                    <FaTrash />
                  </button>
                  <button 
                    onClick={() => handleEditClick(userData)}
                    className="cursor-pointer bg-dusk text-white p-2 rounded-md hover:bg-blue-700"
                  >
                    <FaPen />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageUserSettings;