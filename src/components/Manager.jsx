import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

import { ToastContainer, toast, Bounce } from "react-toastify";

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords);
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id }),
      });

      const newPassword = { ...form, id: uuidv4() };
      setPasswordArray([...passwordArray, newPassword]);
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });
      setform({ site: "", username: "", password: "" });
      toast("Password Saved", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.error("Please fill all fields correctly", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const deletePassword = async (id) => {
    console.log("Deleting password with id:", id);
    if (confirm("Are you sure you want to delete this password?")) {
      toast("Password Deleted", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      let res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    }
  };

  const editPassword = (id) => {
    console.log("Editing password with id:", id);
    setform({ ...passwordArray.filter((i) => i.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      <div className="mx-auto max-w-4xl ">
        <h1 className="text-4xl text-black text-center font-bold">
          <span className="text-fuchsia-800">&lt;</span>
          <span>YPM</span>
          <span className="text-fuchsia-800">/ &gt;</span>
        </h1>

        <p className="text-green-700 text-center">Your Password Manager</p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website url"
            className="rounded-full border border-purple-400 w-full p-4 py-1"
            type="text"
            name="site"
          />
          <div className="flex w-full gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-purple-400 w-full p-4 py-1"
              type="text"
              name="username"
            />
            <div className="relative w-full">
              <input
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-purple-400 w-full p-4 py-1 pr-10"
                type={showPassword ? "text" : "password"}
                name="password"
              />
              <span
                className="absolute right-3 top-2.5 cursor-pointer"
                onClick={togglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="rounded-full border border-purple-400 w-fit flex justify-center items-center gap-2 bg-purple-400 text-white hover:bg-purple-500 transition duration-300 ease-in-out px-4 py-2"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-purple-700 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-purple-200">
                {passwordArray.map((item, index) => {
                  const copyToClipboard = (text) => {
                    navigator.clipboard.writeText(text);
                    toast(`📋 Copied: "${text}"`, {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: false,
                      pauseOnHover: true,
                      draggable: true,
                      theme: "light",
                      transition: Bounce,
                    });
                  };
                  return (
                    <tr
                      key={index}
                      className="border-b border-purple-300 hover:bg-purple-50 transition"
                    >
                      <td
                        className="text-center px-4 py-2 w-40 cursor-pointer hover:underline text-purple-800"
                        onClick={() => copyToClipboard(item.site)}
                      >
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.site}
                        </a>
                      </td>

                      <td
                        className="text-center px-4 py-2 w-40 cursor-pointer text-purple-800"
                        onClick={() => copyToClipboard(item.username)}
                      >
                        {item.username}
                      </td>

                      <td
                        className="text-center px-4 py-2 w-40 cursor-pointer text-purple-800"
                        onClick={() => copyToClipboard(item.password)}
                      >
                        {item.password}
                      </td>

                      <td className="px-4 py-2 w-40">
                        <div className="flex justify-center items-center gap-4 text-xl text-purple-700">
                          <span
                            className="cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <MdEdit />
                          </span>
                          <span
                            className="cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <FaTrash />
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;

//1:29:38
