import { toast } from 'react-toastify'
import { useState } from 'react'
import { useGlobalContext } from '../context/GlobalContext'
import { GlobalProps } from '../interfaces/data'
import { useNavigate, Link } from 'react-router-dom'
import { ROUTER } from "../constant/Router"
import { IoEye, IoEyeOff } from "react-icons/io5";
import { isValidEmail, isValidPassword } from '../constant/ValidRegex'
const Login = () => {
  const { showPassword, setShowPassword, confirmPassword, setConfirmPassWord, users } = useGlobalContext() as GlobalProps
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const navigate = useNavigate();
  const isEmpty: boolean = email === "" || password === "";
  const handleLogin = () => {
    const matchedUser = users.find((user) => user.email === email);
    if (isEmpty) {
      toast.error("Please fill in all fields", {
        autoClose: 1000,
      });
      return;
    }
    if (!matchedUser) {
      toast.error("Wrong User.Please try again!", {
        autoClose: 1500
      })
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Invalid email address", {
        autoClose: 1500,
      });
      return;
    }
    if (!isValidPassword(password)) {
      toast.error(
        "Password must be between 5 - 10 , at least 1 letter and number",
        {
          autoClose: 3000,
        }
      );
      return;
    }
    if (matchedUser.password !== password) {
      toast.error("Wrong Password!", {
        autoClose: 1500
      })
      return
    }
    if (password !== confirmPassword) {
      toast.error("Password and confirm password don't same!", {
        autoClose: 1500
      })
      return
    }
    localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
    toast.success("Welcome!", {
      autoClose: 1500
    })

    setTimeout(() => {
      navigate(ROUTER.Products)
    }, 1500)
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  return (
    <>
      <div className='flex justify-center items-center h-screen'>
        <div className='bg-gray-950 px-11 py-11 rounded-md'>
          <div className='text-center  text-blue-300 text-3xl font-bold '>
            <p>Login</p>
          </div>
          <div>
            <input type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder='Email'
              className='outline-none bg-gray-700 mt-6 px-4 py-4 w-full lg:w-[20em] rounded text-white placeholder:text-white ' />
          </div>
          <div className='relative'>
            <input type={showPassword ? "text" : "password"} name="password" value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder='Password'
              className='outline-none bg-gray-700 mt-4 px-4 py-4 w-full lg:w-[20em] rounded text-white placeholder:text-white '
            />
            {showPassword ? (
              <IoEye onClick={() => setShowPassword(false)} className='absolute right-[3%] bottom-[12%]  text-[35px] text-white    transition-all duration-700' />
            ) : (
              <IoEyeOff onClick={() => setShowPassword(true)} className='absolute right-[3%] bottom-[12%]  text-[35px] text-white transition-all duration-700' />
            )}
          </div>
          <div>
            <input type={showPassword ? "text" : "password"} name='confirmPassword' value={confirmPassword}
              onChange={(event) => setConfirmPassWord(event.target.value)}
              placeholder='Confirm_Password'
              className='outline-none bg-gray-700 mt-4 px-4 py-4 w-full lg:w-[20em] rounded text-white placeholder:text-white '
            />
          </div>
          <div className='flex justify-center mt-5'>
            <button onClick={handleLogin} className='text-[18px] font-bold bg-gray-700 text-white py-1 px-5 rounded-md'>
              Login
            </button>
          </div>
          <div className='font-bold text-sky-300 text-xl mt-2'>
            <Link to={ROUTER.Register}>Register</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login