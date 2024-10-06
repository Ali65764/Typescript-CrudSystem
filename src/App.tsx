import { ROUTER } from "./constant/Router"
import { Route, Routes } from "react-router-dom"
import Table from "./components/Table"
import AddProduct from "./components/AddProduct"
import UpdatedProduct from "./components/UpdatedProduct"
import DetailsPage from "./components/DetailsPage"
import Products from "./components/Products"
import Basket from "./components/Basket"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Login from "./auth/Login"
import Register from "./auth/Register"
import User from "./auth/User"
import Home from "./components/Home"
import EditUser from "./auth/EditUser"
import DetailsProducts from "./components/DetailsProducts"

function App() {

  return (
    <>
      <Routes>
        <Route path={ROUTER.Table} element={<Table />} />
        <Route path={ROUTER.AddProduct} element={<AddProduct />} />
        <Route path={ROUTER.Products} element={<Products />} />
        <Route path={ROUTER.UpdatedProduct + "/:id"} element={<UpdatedProduct />} />
        <Route path={ROUTER.DetailsPage + "/:id"} element={<DetailsPage />} />
        <Route path={ROUTER.Basket} element={<Basket />} />
        <Route path={ROUTER.Login} element={<Login/>}/>
        <Route path={ROUTER.Register} element={<Register/>}/>
        <Route path={ROUTER.User} element={<User/>}/>
        <Route path={ROUTER.Home} element={<Home/>}/>
        <Route path={ROUTER.EditUser + "/:id"} element={<EditUser/>}/>
        <Route path={ROUTER.DetailsProducts+"/:id"} element={<DetailsProducts/>}/>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
