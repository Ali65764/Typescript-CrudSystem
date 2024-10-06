import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { BasketType, ProductData } from "../../interfaces/data";
import { RootState } from "../app/store";
const initialState: ProductData = {
    basket: [],
    amount: 0,
    totalAmount: 0,
    totalPrice: 0,
    totalDiscountPrice: 0
};

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addBasket: (state, action: PayloadAction<BasketType>) => {
            const productAdd = action.payload;

            const existProduct = state.basket.find(product => product.id === productAdd.id);
            if (existProduct) {
                toast.info("Product is already in the basket!", {
                    autoClose: 1500,
                });

                if (existProduct.amount >= productAdd.stock) {
                    toast.warning("Maximum stock in the basket!", {
                        autoClose: 1500,
                    });
                    return;
                }
            } else {
                if (productAdd.stock === 0) {
                    toast.warning("The Product isn't in stock", {
                        autoClose: 1500,
                    });
                    return;
                }

                state.basket.push({ ...productAdd, amount: 1 });
                state.totalAmount += 1;
                state.totalPrice += productAdd.price;
                state.totalDiscountPrice += productAdd.discountPrice;
                toast.success("Product added successfully!", {
                    autoClose: 1500,
                });
            }
        },
        removeAllBasket: (state) => {
            state.basket = [];
            state.totalAmount = 0;
            state.totalPrice = 0;
            state.totalDiscountPrice = 0;
            toast.success("All Product deleted in basket!",{
                autoClose:1000
            })
        },
        removeBasket: (state, action: PayloadAction<BasketType>) => {
            const productRemove = action.payload;
            const existProduct = state.basket.find((product) => product.id === productRemove.id);

            if (existProduct) {
                state.basket = state.basket.filter((product) => product.id !== productRemove.id);
                state.totalAmount -= existProduct.amount;
                state.totalPrice -= existProduct.totalPrice;
                state.totalDiscountPrice -= existProduct.totalDiscountPrice;

                toast.success("Product removed successfully!", {
                    autoClose: 1500,
                });
            }
        },

        increment: (state, action: PayloadAction<BasketType>) => {
            const productAdd = action.payload;
            const existProduct = state.basket.find((product) => product.id === productAdd.id);

            if (existProduct) {
                if (existProduct.amount >= productAdd.stock) {
                    toast.warning("Maximum stock in the Basket!", {
                        autoClose: 1500,
                    });
                    return;
                }
                existProduct.totalAmount++;
                existProduct.totalPrice += existProduct.price;
                existProduct.totalDiscountPrice += existProduct.discountPrice;
                existProduct.amount += 1;
                state.totalAmount += 1;
                state.totalPrice += existProduct.price;
                state.totalDiscountPrice += existProduct.discountPrice;
            }
        },

        decrement: (state, action: PayloadAction<BasketType>) => {
            const productAdd = action.payload;
            const existProduct = state.basket.find((product) => product.id === productAdd.id);
            if (existProduct && existProduct.amount > 1) {
                existProduct.totalAmount--;
                existProduct.totalPrice -= existProduct.price;
                existProduct.totalDiscountPrice -= existProduct.discountPrice;
                existProduct.amount -= 1;
                state.totalAmount -= 1;
                state.totalPrice -= existProduct.price;
                state.totalDiscountPrice -= existProduct.discountPrice;
            }
        },

     
    }
})

export const { addBasket, decrement, increment, removeAllBasket, removeBasket } = productSlice.actions;
export const getBasket = (state:RootState) => state.products.basket;
export const getTotalPrice = (state: RootState) => state.products.totalPrice;
export const getTotalDiscount = (state: RootState) => state.products.totalDiscountPrice;
export const getTotalAmount = (state: RootState) => state.products.totalAmount;
export default productSlice.reducer;
