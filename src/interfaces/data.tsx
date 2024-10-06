import { AxiosPromise } from "axios";

export interface RouterType {
    AddProduct:string;
    DetailsPage:string;
    Products:string;
    Table:string;
    UpdatedProduct:string;
    Basket:string;
    User:string;
    EditUser:string;
    Login:string;
    Register:string;
    Home:string;
    DetailsProducts:string;
}


export interface Product {
    id:number;
    title:string;
    description:string;
    price:number;
    discountPrice:number;
    rating:number;
    stock:number;
    category:string;
    image:string;
    create_at:number;
    color:string;
}

export interface InitialType extends Omit<Product,"id">{}

interface ProductParams{
    price :number;
    discountPrice:number;
}
 
export interface GetProducts {
    (params?: Required<ProductParams> | undefined):AxiosPromise<Product[]>
}


export interface GetSingleProduct {
    (productId:number):AxiosPromise<Product>
}

export interface AddProduct {
    (newProduct: InitialType):AxiosPromise<Product>;
}

export interface DeleteProduct {
    (productId:number):AxiosPromise<void>;
}

export interface EditProduct {
    (productId:number,updatedProduct:Partial<InitialType>):AxiosPromise<Product>
}


export interface PriceProduct {
    amount:number;
    totalAmount:number;
    totalPrice:number;
    totalDiscountPrice:number;
}

export interface BasketType extends Omit<Product,"create_at">, PriceProduct{};

export interface ProductData extends PriceProduct{
    basket :BasketType[]
}

export interface Users{
    id?:string;
    name:string;
    email:string;
    password:string;
    address:string;
    image:string;
    phone:string;
}
export interface GlobalProps{
    showPassword:boolean;
    setShowPassword:(value:boolean)=>void;
    confirmPassword:string;
    setConfirmPassWord:(value:string)=>void;
    users: Users[];
    setUsers: React.Dispatch<React.SetStateAction<Users[]>>;
    isAdmin:boolean;
    loggedInUser:Users |null;
    showRemove:boolean;
    setShowRemove:(value:boolean)=>void;
    deletedUser:Users | null;
    closeDeleteModal:()=>void;
    openDeleteModal:(userId:any)=>void
}