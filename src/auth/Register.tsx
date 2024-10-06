import React, { useState } from 'react'
import {Users,GlobalProps} from "../interfaces/data"
import { useGlobalContext } from '../context/GlobalContext'
import { useNavigate,Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { isValidEmail,isValidPassword,isValidPhone } from '../constant/ValidRegex'
import { addUsers } from '../services/index'
import {ROUTER} from "../constant/Router"
import { IoEye, IoEyeOff } from "react-icons/io5";
const Register = () => {
  const initialUser:Users={
    name:"",
    email:"",
    password:"",
    address:"",
    image:"",
    phone:""
  }

  const {showPassword,setShowPassword,confirmPassword,setConfirmPassWord}=useGlobalContext() as GlobalProps
  const [newUser,setNewUser] = useState<Users>(initialUser)
  const navigate = useNavigate();
  const [userId, setUserId] = useState<number>(() => {
    const savedId = localStorage.getItem('productUserId');
    return savedId ? Number(savedId) : 1;
  }); 

  const handleChange =(event:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = event.target
    if(name === "confirmPassword"){
      setConfirmPassWord(value)
    }
    else{
      setNewUser((user)=>({
        ...user,
        [name]:value
      }))
    }
  }


  const isEmpty: boolean = Object.values(newUser).some((value) => value === "");
  const isPasswordMismatch: boolean = newUser.password !== confirmPassword;

  const handleSubmit = async()=>{
    if(isEmpty){
      toast.error("Please fill in all fields",{
        autoClose:1500
      })
      return
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
      toast.error(
        "Invalid password number",
        {
          autoClose: 3000,
        }
      );
      return;
    }
    if (isPasswordMismatch) {
      toast.error("Password and confirm password don't same", {
        autoClose: 1000,
      });
      return;
    }
   
    const userWithId = { ...newUser, id: userId.toString() };
    await addUsers(userWithId);
  
    const newUserId = userId + 1;
    setUserId(newUserId);
    localStorage.setItem("productUserId", newUserId.toString());
    toast.success("User is successfully!",{
      autoClose:1500
    })
    localStorage.setItem("loggedInUser",JSON.stringify(newUser));
    setNewUser(initialUser);
    setConfirmPassWord("")
    setTimeout(()=>{
      navigate(ROUTER.Login)
    },1500)
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } 

  return(
    <>
     <div className=" flex justify-center items-center h-screen">
        <div className="  bg-gray-950 px-10 py-10 rounded-md">
          <div className="">
            <h1 className="text-center text-blue-200 text-3xl mb-4 font-bold">
              Register
            </h1>
          </div>
          <div>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleChange}
              className="bg-gray-700 mb-4 px-4 py-4  w-[320px] rounded text-white placeholder:text-gray-200 outline-none"
              placeholder="Name"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleChange}
              className="bg-gray-700 mb-4 px-4 py-4  w-[320px] rounded text-white placeholder:text-gray-200 outline-none"
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
              className=" bg-gray-700 mb-4 px-4 py-4  w-[320px] rounded text-white placeholder:text-gray-200 outline-none"
              placeholder="Phone"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={newUser.password}
              onChange={handleChange}
              className=" bg-gray-700 mb-4 px-4 py-4  w-[320px] rounded text-white placeholder:text-gray-200 outline-none"
              placeholder="Password"
            />
            {showPassword ? (
              <IoEye
                className="absolute right-[3%] bottom-[30%]  text-[40px] text-white  cursor-pointer hover:scale-105 transition-all duration-700"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <IoEyeOff
                className="absolute right-[3%] bottom-[30%]  text-[40px] text-stone-300  cursor-pointer hover:scale-105 transition-all duration-700"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          <div>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              className="bg-gray-700 mb-4 px-4 py-4  w-[320px] rounded text-white placeholder:text-gray-200 outline-none"
              placeholder="Confirm_Password"
            />
          </div>
          <div className=" flex justify-center items-center flex-col mb-3">
            <button
              onClick={handleSubmit}
              className="bg-gray-800 text-gray-200 py-1 px-4 rounded-md text-xl font-bold"
            >
              Register
            </button>
          </div>
          <div>
            <h2 className="text-white">
              <Link
                className="text-cyan-300 font-bold ml-3 text-xl hover:opacity-90 transition duration-300"
                to={ROUTER.Login}
              >
                Login
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register