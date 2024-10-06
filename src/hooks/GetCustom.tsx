import { useEffect,useState } from "react";
import { Product } from "../interfaces/data";
import {getProducts} from "../services/index"

const useFetchProducts =()=>{
    const [data,setData] = useState<Product[]>();


    const fetchProduct = async()=>{
        try{
            const response = await getProducts();
            setData(response.data)
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchProduct()
    },[])

    return {data,fetchProduct}
}



export default useFetchProducts