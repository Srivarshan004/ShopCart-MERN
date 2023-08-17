import axios from 'axios';
import { 
    createReviewFail, 
    createReviewRequest, 
    createReviewSuccess, 
    deleteProductFail, 
    deleteProductRequest, 
    deleteProductSuccess, 
    newProductFail, 
    newProductRequest, 
    newProductSuccess, 
    productFail, 
    productRequest, 
    productSuccess, 
    updateProductFail, 
    updateProductRequest, 
    updateProductSuccess 
} from '../slices/productSlices';

const getProduct = (id) => async (dispatch) => {
    try{
        dispatch(productRequest());
        const { data } = await axios.get(`/api/v1/product/${id}`);
        dispatch(productSuccess(data));
    } catch(error) {
        //Handle Error
        dispatch(productFail(error.response.data.message));
    }
}

export default getProduct;


export const createReview = (reviewData) => async (dispatch) => {
    try{
        dispatch(createReviewRequest());
        const config = {
            headers : {
                'Content-type' : 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/review`, reviewData, config);
        dispatch(createReviewSuccess(data));
    } catch(error) {
        //Handle Error
        dispatch(createReviewFail(error.response.data.message));
    }
}


export const createNewProduct = (productData) =>  async (dispatch) => {
    try{
        dispatch(newProductRequest());
        const { data } = await axios.post(`/api/v1/admin/product/new`, productData);
        dispatch(newProductSuccess(data));

    } catch(error) {
        //Handle Error
        dispatch(newProductFail(error.response.data.message));
    }
}

export const deleteProduct = (id) =>  async (dispatch) => {
    try{
        dispatch(deleteProductRequest());
        await axios.delete(`/api/v1/admin/product/${id}`);
        dispatch(deleteProductSuccess());

    } catch(error) {
        //Handle Error
        dispatch(deleteProductFail(error.response.data.message));
    }
}

export const updateProduct = (id, productData) =>  async (dispatch) => {
    try{
        dispatch(updateProductRequest());
        const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData);
        dispatch(updateProductSuccess(data));

    } catch(error) {
        //Handle Error
        dispatch(updateProductFail(error.response.data.message));
    }
}