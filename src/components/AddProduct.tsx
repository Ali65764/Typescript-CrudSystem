  import { useState } from "react";
  import NavBar from "../layout/NavBar";
  import Box from '@mui/material/Box';
  import TextField from '@mui/material/TextField';
  import { SketchPicker, ColorResult } from "react-color";
  import moment from "moment";
  import { InitialType } from "../interfaces/data";
  import { useNavigate } from "react-router-dom";
  import { toast } from "react-toastify";
  import { addProduct } from "../services/index";
  import { ROUTER } from "../constant/Router";

  const AddProduct = () => {
    const createDate = moment().valueOf();
    
    const initialState: InitialType = {
      title: "",
      description: "",
      price: 0,
      discountPrice: 0,
      rating: 0,
      stock: 0,
      category: "",
      image: "",
      create_at: createDate,
      color: "#000",
    };

    const [newProduct, setNewProduct] = useState<InitialType>(initialState);
    const [id, setId] = useState<number>(() => {
      const savedId = localStorage.getItem('productId');
      return savedId ? Number(savedId) : 1;
    }); 
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const newValue = ["price", "discountPrice", "rating", "stock"].includes(name) ? Number(value) : value;
      setNewProduct((product) => ({
        ...product,
        [name]: newValue,
      }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      
      if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.category || !newProduct.image) {
        toast.error("Please fill in all fields!", { autoClose: 1500 });
        return;
      }

      try {
        
        const productWithId = { ...newProduct, id: id.toString() }; 
        await addProduct(productWithId);
        toast.success("Product Added Successfully!", { autoClose: 1000 });

        const newId = id+1;
        setId(newId);
        localStorage.setItem("productId",newId.toString())

        
        setNewProduct(initialState);
        setTimeout(() => {
          navigate(ROUTER.Table);
        }, 1500);
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <>
        <NavBar />
        <div className="flex justify-evenly mt-6">
          <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '50ch', display: 'flex', flexDirection: "column", margin: "15px auto" } }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="title"
                name="title"
                label="Title"
                variant="standard"
                sx={inputStyles}
                value={newProduct.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-4">
              <TextField
                id="description"
                name="description"
                label="Description"
                variant="standard"
                sx={inputStyles}
                value={newProduct.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-4">
              <TextField
                id="price"
                name="price"
                label="Price"
                variant="standard"
                sx={inputStyles}
                value={newProduct.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-4">
              <TextField
                id="discountPrice"
                name="discountPrice"
                label="Discount Price"
                variant="standard"
                sx={inputStyles}
                value={newProduct.discountPrice}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-4">
              <TextField
                id="rating"
                name="rating"
                label="Rating"
                variant="standard"
                sx={inputStyles}
                value={newProduct.rating}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-4">
              <TextField
                id="stock"
                name="stock"
                label="Stock"
                variant="standard"
                sx={inputStyles}
                value={newProduct.stock}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-4">
              <TextField
                id="category"
                name="category"
                label="Category"
                variant="standard"
                sx={inputStyles}
                value={newProduct.category}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-4">
              <TextField
                id="image"
                name="image"
                label="Image"
                variant="standard"
                sx={inputStyles}
                value={newProduct.image}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <button 
                onClick={handleSubmit} 
                className="mt-3 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-xl w-full sm:w-auto text-center px-12 py-2">
                Submit
              </button>
            </div>
          </Box>

          <div className="w-1/4 ">
            <SketchPicker
              color={newProduct.color}
              onChange={(color: ColorResult) =>
                setNewProduct((prevProduct) => ({
                  ...prevProduct,
                  color: color.hex,
                }))
              }
            />
          </div>
        </div>
      </>
    );
  };
  const inputStyles = {
    "& .MuiInputBase-input": {
      color: 'white',
    },
    "& .MuiInputLabel-root": {
      color: 'white',
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: 'white',
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "white !important"
    }
  };

  export default AddProduct;
