import { useNavigate } from 'react-router-dom'
import { ROUTER } from "../constant/Router"
import { useGlobalContext } from '../context/GlobalContext'
import { GlobalProps } from '../interfaces/data'
import NavBar from '../layout/NavBar'
import { FaPen } from 'react-icons/fa'
import { RiDeleteBinLine } from "react-icons/ri";
import DeleteUser from './DeleteUser'
const User = () => {
  const navigate = useNavigate()
  const { openDeleteModal, loggedInUser } = useGlobalContext() as GlobalProps
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center pt-[30px]">
        {loggedInUser && (
          <>
            <h1 className="text-white font-bold text-3xl pb-5">
              {loggedInUser.name} Datas
            </h1>
            <div className="w-[530px] text-white text-center text-[19px]">
              <img
                className="w-full h-[300px] object-cover rounded-md"
                src={loggedInUser.image}
                alt={loggedInUser.name}
              />

              <div className="bg-gray-950 py-4 rounded-md">
                <h2 className="font-semibold">Name: {loggedInUser.name}</h2>
                <p className="py-2">Email: {loggedInUser.email}</p>
                <p>Address: {loggedInUser.address}</p>
                <p className="py-2">Phone: {loggedInUser.phone}</p>

                <div>
                  <button
                    className="px-7 py-2 bg-blue-700 rounded-md "
                    onClick={() =>
                      navigate(`${ROUTER.EditUser}/${loggedInUser.id}`)
                    }
                  >
                    <FaPen size={20} />
                  </button>
                  <button
                    className="px-7 py-2 ml-2 bg-red-700 rounded-md"
                    onClick={() => openDeleteModal(loggedInUser)}
                  >
                    <RiDeleteBinLine size={20} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <DeleteUser />
    </>
  )
}

export default User