import { ROUTER } from "../constant/Router"
import { Link, useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { FaShopify } from "react-icons/fa";
import { getTotalAmount } from "../features/slices/productSlice";
import { useSelector } from "react-redux";
import { useGlobalContext } from "../context/GlobalContext";
import { GlobalProps } from "../interfaces/data";

function NavBar() {
    const totalAmount = useSelector(getTotalAmount)
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { isAdmin, loggedInUser } = useGlobalContext() as GlobalProps;

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        setTimeout(() => {
            navigate(ROUTER.Login);
        }, 1000);
    }

    return (
        <div className="bg-gray-700 flex justify-center text-3xl p-5">
            {isAdmin ? (
                <>
                    <div>
                        <Link to={ROUTER.Table} className={`${pathname === ROUTER.Table ? "text-green-400 hover:text-sky-200 duration-500" : "text-sky-200 hover:text-green-400 duration-500"}`}>Table</Link>
                    </div>
                    <div>
                        <Link to={ROUTER.AddProduct} className={`mx-5 ${pathname === ROUTER.AddProduct ? "text-green-400 hover:text-sky-200 duration-500" : "text-sky-200 hover:text-green-400 duration-500"}`}>Add</Link>
                    </div>
                </>
            ) : null}

            {!loggedInUser && (
                <div>
                    <Link to={ROUTER.Login} className={`mr-5 ${pathname === ROUTER.Login ? "text-green-400 hover:text-sky-200 duration-500" : "text-sky-200 hover:text-green-400 duration-500"}`}>Login</Link>
                </div>
            )}

            <div>
                <Link to={ROUTER.Products} className={`mr-5 ${pathname === ROUTER.Products ? "text-green-400 hover:text-sky-200 duration-500" : "text-sky-200 hover:text-green-400 duration-500"}`}>Products</Link>
            </div>

            <div className="flex">
                <Link to={ROUTER.Basket} className={`text-4xl ${pathname === ROUTER.Basket ? "text-green-400 hover:text-sky-200 duration-500" : "text-sky-200 hover:text-green-400 duration-500"}`}>
                    <FaShopify />
                </Link>
                <span className="bg-red-500 h-6 w-6 text-xl rounded-full flex justify-center items-center">
                    <span className="text-green-400"> {totalAmount}</span>
                </span>
            </div>
            {loggedInUser && (
                <>
                    <span className="hover:text-blue-400 transition duration-500 text-3xl">
                        <Link to={ROUTER.User}>
                            <div className="flex items-center text-stone-300 text-center text-lg">
                                {loggedInUser.image && (
                                    <img
                                        className="w-[45px] h-[45px] object-cover rounded-full mx-3"
                                        src={loggedInUser.image}
                                        alt={loggedInUser.name}
                                    />
                                )}
                                <p className="font-semibold">{loggedInUser.name}</p>
                            </div>
                        </Link>
                    </span>

                    <span className="hover:text-blue-400 transition duration-500 text-2xl">
                        <button
                            onClick={handleLogout}
                            className="mx-4 mt-1 text-sky-600 hover:text-gega-red dark:text-sky-200 dark:hover:text-green-200 transition duration-500"
                        >
                            LogOut
                        </button>
                    </span>
                </>
            )}
        </div>
    );
}

export default NavBar;
