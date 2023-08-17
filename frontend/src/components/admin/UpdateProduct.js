import { Fragment, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import getProduct, { updateProduct } from "../../actions/productAction";
import { clearError, clearProductUpdated } from "../../slices/productSlices";
import { toast } from "react-toastify";
import { useEffect } from "react";


function UpdateProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);
    const [imagesCleared, setImagesCleared] = useState(false);
    const [imagesPreview, setImagesPreview] = useState([]);

    const { loading, isProductUpdated, error, product } = useSelector(state => state.productState)
    const { id : productId } = useParams();

    const categories = [
        'Electronics',
        'Mobile Phones',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onImagesChange = (event) => {
        const files = Array.from(event.target.files);

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2){
                    setImagesPreview(oldArray => [...oldArray, reader.result]);
                    setImages(oldArray => [...oldArray, file])
                }
            }
            reader.readAsDataURL(file)
        })
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('stock', stock);
        formData.append('seller', seller);
        formData.append('category', category);
        images.forEach(image => {
            formData.append('images', image);
        })
        formData.append('imagesCleared', imagesCleared);
        dispatch(updateProduct(productId, formData))
    }

    const cleareImagesHandler = () => {
        setImages([]);
        setImagesPreview([]);
        setImagesCleared(true);
    }

    useEffect(() => {
        if(isProductUpdated){
            toast('Product Updated successfully',{
                type:"success",
                position:toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearProductUpdated())
            })
            setImages([])
            return;
        }

        if(error){
            toast(error, {
                position : toast.POSITION.BOTTOM_CENTER,
                type : 'error',
                onOpen : () => {
                    dispatch(clearError())
                }
            })
            return;
        }
        dispatch(getProduct(productId))
    }, [isProductUpdated, error, dispatch])

    useEffect(() => {
        if(product._id){
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setStock(product.stock);
            setSeller(product.seller);
            setCategory(product.category);

            let images=[]
            product.images.forEach(image => {
                images.push(image.image)
            });
            setImagesPreview(images);
        }
    }, [product])

    return (
        <div className="row d-flex">
            <div className="col-md-2 col-12">
                <Sidebar />
            </div>
            <div className="col-md-10 col-12">
                <Fragment>
                    <div className="wrapper my-5">
                        <form onSubmit={submitHandler} className="shadow-lg" enctype="multipart/form-data">
                            <h1 className="mb-4">Update Product</h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control my-2"
                                    value={name}
                                    onChange={event => setName(event.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price_field">Price</label>
                                <input
                                    type="text"
                                    id="price_field"
                                    className="form-control my-2"
                                    value={price}
                                    onChange={event => setPrice(event.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description_field">Description</label>
                                <textarea
                                    className="form-control my-2"
                                    id="description_field"
                                    rows="8"
                                    value={description}
                                    onChange={event => setDescription(event.target.value)}
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_field">Category</label>
                                <select value={category} onChange={event => setCategory(event.target.value)} class="form-select my-2" id="category_field">
                                    <option value=''>----Select----</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="stock_field">Stock</label>
                                <input
                                    type="number"
                                    id="stock_field"
                                    className="form-control my-2"
                                    value={stock}
                                    onChange={event => setStock(event.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="seller_field">Seller Name</label>
                                <input
                                    type="text"
                                    id="seller_field"
                                    className="form-control my-2"
                                    value={seller}
                                    onChange={event => setSeller(event.target.value)}
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label htmlFor="images_upload">Images</label>
                                <div className="d-flex align-items-center">
                                    <div className="input-group my-2" >
                                        <input
                                            type="file"
                                            className="form-control w-100"
                                            id="inputGroupFile02"
                                            name="product_images"
                                            multiple 
                                            onChange={onImagesChange}
                                        />
                                    </div>
                                </div>
                                {imagesPreview.length > 0 && 
                                <span 
                                    className="m-2 py-2 text-danger" 
                                    onClick={cleareImagesHandler} 
                                    style={{cursor:'pointer'}}>
                                        <i className="fa fa-trash"></i>
                                </span>}
                                {imagesPreview.map(image => (
                                        <img
                                           className="mt-3 mx-2"
                                           key={image}
                                           src={image}
                                           alt="Image Preview"
                                           width='55'
                                           height='52'
                                        />
                                    ))}
                            </div>

                            <button 
                                id="login_button" 
                                type="submit" 
                                disabled={loading}
                                className="btn btn-block py-3"
                            >
                                UPDATE
                            </button>
                        </form>
                    </div>
                </Fragment>
            </div>
        </div>

    )
}

export default UpdateProduct;