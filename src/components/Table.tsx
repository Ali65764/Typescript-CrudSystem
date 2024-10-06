import NavBar from "../layout/NavBar"
import useFetchProducts from "../hooks/GetCustom"
import moment from "moment"
import { FaChevronCircleRight, FaPen } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { copyColorCode } from "../utils/CopyColor";
import { deleteProduct } from "../services/index";
import { toast } from "react-toastify";
import { ROUTER } from "../constant/Router"
import { Link, useNavigate } from "react-router-dom";
function Table() {
  const { data, fetchProduct } = useFetchProducts()
  const navigate = useNavigate();
  const deleteProducts = async (productId: number) => {
    try {
      const response = await deleteProduct(productId)
      toast.success("Product deleted successfully!", {
        autoClose: 1000
      })

      fetchProduct();
      return response
    }
    catch (error) {
      console.log(error);

    }
  }
  return (
    <>
      <NavBar />
      <div className=" py-10 px-44">
        <table className="w-full text-gray-500 text-sm">
          <thead className="text-[15px] text-gray-800 bg-gray-500 uppercase">
            <tr>
              <th className="px-5 py-3">
                S.No
              </th>
              <th className="px-5 py-3">
                Title
              </th>
              <th className="px-5 py-3">
                Price
              </th>
              <th className="px-5 py-3">
                Discount
              </th>
              <th className="px-5 py-3">
                Rating
              </th>
              <th className="px-5 py-3">
                Stock
              </th>
              <th className="px-5 py-3">
                Category
              </th>
              <th className="px-5 py-3">
                Color
              </th>
              <th className="px-5 py-3">
                Image
              </th>
              <th className="px-5 py-3">
                Added_Time
              </th>
              <th className="px-5 py-3">
                View
              </th>
              <th className="px-5 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 text-gray-300 ">
            {data && data.length > 0 ? (
              data.map((product, index) => (
                <tr key={product.id}>
                  <td className="px-6 py-3 text-white">{index + 1}</td>
                  <td className="px-6 py-3">{product.title}</td>
                  <td className="px-6 py-3">{product.price}</td>
                  <td className="px-6 py-3">{product.discountPrice}</td>
                  <td className="px-6 py-3">{product.rating}</td>
                  <td className="px-6 py-3">{product.stock}</td>
                  <td className="px-6 py-3">{product.category}</td>

                  <td className="px-6 py-3 ">
                    <div onClick={() => copyColorCode(product.color)} className="h-10 w-10 rounded-full cursor-pointer" style={{ backgroundColor: product.color }}></div>
                  </td>

                  <td className="px-6 py-3">
                    <img className="h-12 w-24 rounded-sm object-cover " src={product.image} alt={product.title} />
                  </td>
                  <td className="px-4 py-3">
                    {moment(product?.create_at).fromNow()}
                  </td>
                  <td className="px-6 py-3 text-4xl text-blue-400">
                    <button>
                      <Link to={`${ROUTER.DetailsPage}/${product.id}`}><FaChevronCircleRight /></Link>
                    </button>
                  </td>
                  <td className="px-6 py-3 text-xl">
                    <button
                      className="px-5 py-1 bg-blue-700 rounded-sm hover:opacity-75 transition-all duration-500"
                      onClick={() =>
                        navigate(`${ROUTER.UpdatedProduct}/${product.id}`)
                      }
                    >
                      <FaPen size={20} />
                    </button>
                    <button className="bg-red-500 px-5 py-1 rounded-md mt-3" onClick={() => deleteProducts(product.id)}>
                      <RiDeleteBinLine />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center"></td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </>
  )
}

export default Table