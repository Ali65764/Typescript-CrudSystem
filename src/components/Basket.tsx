import { useDispatch, useSelector } from "react-redux";
import NavBar from "../layout/NavBar";
import { getBasket, getTotalDiscount, getTotalPrice, removeAllBasket, removeBasket, increment, decrement } from "../features/slices/productSlice";
import { copyColorCode } from "../utils/CopyColor";
import {  FaPlus, FaMinus, FaTrash } from "react-icons/fa";


const Basket = () => {
  const basket = useSelector(getBasket);
  const totalPrice = useSelector(getTotalPrice);
  const totalDiscountPrice = useSelector(getTotalDiscount);
  const dispatch = useDispatch();

  return (
    <>
      <NavBar />
      <div className="text-sky-200 font-bold text-xl bg-gray-700 flex justify-center p-3 ">
        <div>
          <p>Total Price: ${totalPrice}</p>
          <p className="mt-2">Total Discount: ${totalDiscountPrice}</p>
        </div>
        <div className="ml-12">
          <p>Sum: ${totalPrice - totalDiscountPrice}</p>
          <button
            className="bg-red-700 hover:opacity-50 duration-500 rounded px-8 py-1 mt-2"
            onClick={() => dispatch(removeAllBasket())}
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="flex justify-center flex-wrap gap-12 mt-8">
        {basket && basket.length > 0 ? (
          basket.map((product) => {
            const result = product.price - product.discountPrice;
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
                      <p className="ml-2">Now: ${result}</p>
                          <span className="text-xl font-semibold ml-5 text-sky-200">
                            ${(result * product.amount).toFixed(2)}
                          </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      onClick={() => copyColorCode(product.color)}
                      className="h-8 w-20 rounded-md cursor-pointer"
                      style={{ backgroundColor: product.color }}
                    ></div>
                    <div className="mt-4 flex gap-2 items-center">
                      <button
                        onClick={() => dispatch(decrement(product))}
                        className="text-white bg-red-500 px-2 py-1 rounded"
                      >
                        <FaMinus />
                      </button>
                      <p className="font-bold text-cyan-500">{product.amount}</p>
                      <button
                        onClick={() => dispatch(increment(product))}
                        className="text-white bg-green-500 px-2 py-1 rounded"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeBasket(product))}
                      className="mt-4 text-white bg-red-700 px-6 text-2xl py-1 rounded-md"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center mt-4 text-3xl text-red-500">
            No products in the basket.
          </p>
        )}
      </div>
    </>
  );
};

export default Basket;
