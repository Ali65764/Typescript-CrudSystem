import NavBar from "../layout/NavBar";
import useFetchProducts from "../hooks/GetCustom";
import { Product } from "../interfaces/data";
import { FaShoppingCart, FaEye, FaShopify } from "react-icons/fa";
import { copyColorCode } from "../utils/CopyColor";
import { Link } from "react-router-dom";
import { ROUTER } from "../constant/Router";
import { useState } from "react";
import { addBasket, getBasket } from "../features/slices/productSlice";
import { useSelector, useDispatch } from "react-redux";

function Products() {
  const { data } = useFetchProducts();
  const [filterData, setFilterData] = useState<string>("");
  const basket = useSelector(getBasket);
  const dispatch = useDispatch();

  const filteredData = data?.filter((product: Product) =>
    product.title.toLowerCase().includes(filterData.toLowerCase())
  );

  return (
    <>
      <NavBar />
      <div>
        <div className="flex justify-center mt-6">
          <input
            type="text"
            placeholder="Filter Products"
            className="px-4 py-2 rounded-md"
            onChange={(e) => setFilterData(e.target.value)}
          />
        </div>
        <div className="mt-8 flex justify-center flex-wrap gap-12">
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((product) => {
              const productExist = basket.find(
                (exist) => exist.id === product.id
              );
              return (
                <div
                  key={product.id}
                  className="w-[350px] bg-gray-800 border border-gray-600 rounded-lg ml-1"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-52 object-cover rounded-lg"
                  />
                  <div className="p-6 flex justify-between items-center">
                    <div>
                      <p className="text-cyan-400">{product.title}</p>
                      <p className="text-xl font-semibold text-white">
                        {product.description}
                      </p>
                      <div className="mt-4">
                        <p className="text-cyan-400">
                          {product.category}
                          <span className="text-blue-700 ml-2 bg-sky-300 px-2 rounded-md">
                            {product.stock}
                          </span>
                        </p>
                      </div>
                      <div className="text-white text-xl font-bold mt-5">
                        <p>Price: ${product.price}</p>
                        <p className="ml-2">
                          Now: ${product.price - product.discountPrice}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div
                        onClick={() => copyColorCode(product.color)}
                        className="h-8 w-20 rounded-md cursor-pointer"
                        style={{ backgroundColor: product.color }}
                      ></div>
                      <button className="mt-5">
                        <Link to={`${ROUTER.DetailsProducts}/${product.id}`}>
                          <FaEye className="bg-gray-500 w-20 h-9 p-1 text-3xl text-white rounded-md" />
                        </Link>
                      </button>
                      <button
                        className="mt-5"
                        onClick={() =>
                          dispatch(
                            addBasket({
                              ...product,
                              amount: 1,
                              totalAmount: 1,
                              totalPrice: product.price,
                              totalDiscountPrice: product.discountPrice,
                            })
                          )
                        }
                      >
                      
                          {productExist ? (
                            <FaShopify className="text-white bg-blue-800 w-20 h-9 p-1 rounded-md" />
                          ) : (
                            <FaShoppingCart className="text-white bg-blue-800 w-20 h-9 p-1 rounded-md" />
                          )}
                    
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center mt-4 text-3xl text-red-500">
              No products available.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
