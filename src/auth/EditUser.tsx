import { useState,useEffect } from 'react'
import { Users } from '../interfaces/data'
import { useGlobalContext } from '../context/GlobalContext'
import { GlobalProps } from '../interfaces/data'
import { useNavigate, useParams } from 'react-router-dom'
import { isValidEmail, isValidPhone, isValidPassword } from '../constant/ValidRegex'
import { toast } from 'react-toastify'
import { editUsers } from '../services/index'
import { ROUTER } from "../constant/Router"
import { IoEye, IoEyeOff } from "react-icons/io5";

const EditUser = () => {
  const initialUser: Users = {
    name: "",
    email: "",
    password: "",
    address: "",
    image: "",
    phone: "",
  }
  const { showPassword, setShowPassword, loggedInUser } = useGlobalContext() as GlobalProps
  const { id } = useParams()
  const [newUser, setNewUser] = useState<Users>(initialUser)
  const value: boolean = Object.values(newUser).some((value) => value === "");
  const navigate = useNavigate();

  

  const handleSubmit = async () => {
    if (value) {
      toast.error("Please fill in all fields", {
        autoClose: 1500,
      });
      return;
    }
  
    if (!isValidEmail(newUser.email)) {
      toast.error("Invalid email address", {
        autoClose: 1500,
      });
      return;
    }
  
    if (!isValidPhone(newUser.phone)) {
      toast.error("Invalid phone number", {
        autoClose: 1500,
      });
      return;
    }
  
    if (!isValidPassword(newUser.password)) {
      toast.error("Invalid Password", {
        autoClose: 1500,
      });
      return;
    }
  
    try {
      await editUsers(Number(id), newUser);
      localStorage.setItem("loggedInUser", JSON.stringify(newUser));
      setNewUser(initialUser);
      toast.success("User edited successfully!", {
        autoClose: 1500
      });
  
      setTimeout(() => {
        navigate(ROUTER.User);
      }, 1500);
  
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error("An error occurred while updating the user", {
        autoClose: 1500,
      });
    }
  };
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser((user) => ({
      ...user,
      [name]: value,
    }));
  
  };


  useEffect(() => {
    if (loggedInUser) {
      setNewUser(loggedInUser); 
    } 
  }, [loggedInUser]);
  
  return (
    <>
       <div className=" flex justify-center items-center h-screen">
        <div className="  bg-gray-950 px-10 py-10 rounded-md">
          <div className="">
            <h1 className="text-center text-blue-200 text-3xl mb-4 font-bold">
              Edit User
            </h1>
          </div>
          <div>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleChange}
              className=" bg-gray-700 mb-4 px-4 py-4  w-[320px] rounded text-white placeholder:text-gray-200 outline-none"
              placeholder="Name"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleChange}
              className=" bg-gray-700 mb-4 px-4 py-4  w-[320px] rounded text-white placeholder:text-gray-200 outline-none"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="text"
              name="image"
              value={newUser.image}
              onChange={handleChange}
              className=" bg-gray-700 mb-4 px-4 py-4  w-[320px] rounded text-white placeholder:text-gray-200 outline-none"
              placeholder="Image_URL"
            />
          </div>
          <div>
            <input
              type="text"
              name="address"
              value={newUser.address}
              onChange={handleChange}
              className=" bg-gray-700 mb-4 px-4 py-4  w-[320px] rounded text-white placeholder:text-gray-200 outline-none"
              placeholder="Address"
            />
          </div>
          <div>
            <input
              type="text"
              name="phone"
              value={newUser.phone}
              onChange={handleChange}
              className="bg-gray-700 mb-4 px-4 py-4  w-[320px] rounded text-white placeholder:text-gray-200 outline-none"
              placeholder="Phone"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={newUser.password}
              onChange={handleChange}
              className="bg-gray-700 mb-4 px-4 py-4  w-[320px] rounded text-white placeholder:text-gray-200 outline-none"
              placeholder="Password"
            />
            {showPassword ? (
              <IoEye
                className="absolute right-[3%] bottom-[30%]  text-[40px] text-stone-300  cursor-pointer hover:scale-105 transition-all duration-700"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <IoEyeOff
                className="absolute right-[3%] bottom-[30%]  text-[40px] text-stone-300  cursor-pointer hover:scale-105 transition-all duration-700"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          <div className=" flex justify-center items-center flex-col mb-3">
            <button
              onClick={handleSubmit}
              className="bg-gray-800 text-gray-200 py-1 px-4 rounded-md text-xl font-bold"
            >
              Edit
            </button>
          </div>
          <div>
            <button
              onClick={() => navigate(ROUTER.User)}
              className="text-cyan-300 font-bold ml-3 text-xl hover:opacity-90 transition duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditUser