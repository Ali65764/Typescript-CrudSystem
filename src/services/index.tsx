import { ENDPOINTS } from "../constant/EndPoints";
import { instanceAxios } from "../helper/instanceAxios";
import { GetProducts,GetSingleProduct,AddProduct,EditProduct,DeleteProduct, Users } from "../interfaces/data";


export const getProducts:GetProducts = (params)=>{
    return instanceAxios({method:"GET",url:ENDPOINTS.POSTS,params});
}


export const getSingleProduct: GetSingleProduct = (productId)=>{
    return instanceAxios({method:"GET",url:ENDPOINTS.POST_ID(productId)})
};

export const addProduct:AddProduct =(newProduct)=>{
    return instanceAxios({method:"POST",url:ENDPOINTS.POSTS,data:newProduct})
}


export const editProduct:EditProduct = (productId,updatedProduct)=>{
    return instanceAxios({method:"PUT",url:ENDPOINTS.POST_ID(productId),data:updatedProduct})
}


export const deleteProduct:DeleteProduct =(productId)=>{
    return instanceAxios({method:"DELETE",url:ENDPOINTS.POST_ID(productId)})
};


export const getUsers = async()=>{
    try{
        const response = await instanceAxios({method:"GET",url:ENDPOINTS.USERS})
        return response.data
    }
    catch(error){
        console.log(error);
    }
}

export const addUsers = (newUser:Users)=>{
       return instanceAxios({method:"POST",url:ENDPOINTS.USERS,data:newUser}) 
}


export const deleteUsers = async(userId:number)=>{
    try{
        const response  =await instanceAxios({method:"DELETE",url:`${ENDPOINTS.USERS}/${userId}`})
        return response.data
    }
    catch(error){
        console.log(error);
    }
}

export const editUsers = async(userId:number,updatedUser:Partial<Users>)=>{
    try{
        const response = await instanceAxios({method:"PUT", url: `${ENDPOINTS.USERS}/${userId}`,data:updatedUser})
        return response.data
    }
    catch(error){
        console.log(error);
    }
}