import { useState, useEffect } from "react"
import { editProduct } from "../services/index"
import { ROUTER } from "../constant/Router"
import moment from "moment"
import { InitialType } from "../interfaces/data";
import { useNavigate, useParams } from "react-router-dom";
import useFetchSingleProduct from "../hooks/GetSingle";
import { toast } from "react-toastify";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {SketchPicker,ColorResult } from "react-color";
import NavBar from "../layout/NavBar";

function UpdatedProduct() {
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
  }

  const { id } = useParams()


  const navigate = useNavigate();
  const [editData, setEditData] = useState<InitialType>(initialState)

  const { product,loading,error } = useFetchSingleProduct(Number(id));
  console.log("Product:",product)
  const editSingleProduct = async () => {
    try {
      await editProduct(Number(id), editData);
      setEditData(initialState);
      toast.success("User edited successfully!", {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate(ROUTER.Table);
      }, 1500);
    } catch (error) {
      console.error("Error fetching single product:", error);
    }
  };
  console.log("editDAta::",editData);
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const numericValue = isNaN(Number(value)) ? value : Number(value);
    setEditData((products) => ({
        ...products,
        [name]: numericValue,
    }));
};


useEffect(() => {
  if (product) {
    setEditData(product);
  }
}, [product]);

if (loading) {
  return <p className="m-20 text-red-300 text-xl ">Loading...</p>;
}

if (error) {
  return <p className="m-20 text-red-300 text-xl ">Error: {error}</p>;
}


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
          <div className=''>
            <TextField
              id="title"
              name="title"
              label="Title"
              multiline
              variant="standard"
              sx={{
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
              }}
              value={editData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className='mt-4'>
            <TextField
              id="description"
              name="description"
              label="Description"
              multiline
              variant="standard"
              sx={{
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
              }}
              value={editData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-4">
            <TextField
              id="price"
              name="price"
              label="Price"
              multiline
              variant="standard"
              sx={{
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
              }}
              value={editData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-4">
            <TextField
              id="discountPrice"
              name="discountPrice"
              label="Discount Price"
              multiline
              variant="standard"
              sx={{
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
              }}
              value={editData.discountPrice}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-4">
            <TextField
              id="rating"
              name="rating"
              label="Rating"
              multiline
              variant="standard"
              sx={{
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
              }}
              value={editData.rating}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-4">
            <TextField
              id="stock"
              name="stock"
              label="Stock"
              multiline
              variant="standard"
              sx={{
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
              }}
              value={editData.stock}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-4">
            <TextField
              id="category"
              name="category"
              label="Category"
              multiline
              variant="standard"
              sx={{
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
              }}
              value={editData.category}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-4">
            <TextField
              id="image"
              name="image"
              label="Image"
              multiline
              variant="standard"
              sx={{
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
              }}
              value={editData.image}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <button type="button" onClick={editSingleProduct} className="mt-3 text-white duration-500 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-xl w-full sm:w-auto text-center px-12 py-2">Submit</button>
          </div>
        </Box>

        <div className="w-1/4 ">
          <SketchPicker
            color={editData.color}
            onChange={(color: ColorResult) =>
              setEditData((products) => ({
                ...products,
                color: color.hex,
              }))
            }
          />
        </div>
      </div>
    </>
  )
}


export default UpdatedProduct