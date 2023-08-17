import axios from 'axios';
import { 
    adminProductsFail, 
    adminProductsRequest, 
    adminProductsSuccess, 
    productsFail, 
    productsRequest, 
    productsSuccess 
} from '../slices/productsSlices';
import { deleteReviewFail, deleteReviewRequest, deleteReviewSuccess, reviewsFail, reviewsRequest, reviewsSuccess } from '../slices/productSlices';

const getProducts = (keyword, price, category, ratings, currentPage) => async (dispatch) => {
    try{
        dispatch(productsRequest());
        let link = `/api/v1/products?page=${currentPage}`

        if(keyword){
            link += `&keyword=${keyword}`
        } 
        if(price){
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
        } 
        if(category){
            link += `&category=${category}`
        }
        if(ratings){
            link += `&ratings=${ratings}`
        } 
        

        const { data } = await axios.get(link);
        dispatch(productsSuccess(data));

    } catch(error) {
        //Handle Error
        dispatch(productsFail(error.response.data.message));
    }
}

export default getProducts;

export const getAdminProducts = async (dispatch) => {
    try{
        dispatch(adminProductsRequest());
        const { data } = await axios.get(`/api/v1/admin/products`);
        dispatch(adminProductsSuccess(data));

    } catch(error) {
        //Handle Error
        dispatch(adminProductsFail(error.response.data.message));
    }
}

export const getReviews = (id) => async (dispatch) => {
    try{
        dispatch(reviewsRequest());
        const { data } = await axios.get(`/api/v1/admin/reviews`, {params : {id}});
        dispatch(reviewsSuccess(data));

    } catch(error) {
        //Handle Error
        dispatch(reviewsFail(error.response.data.message));
    }
}

export const deleteReview = (productId, id) => async (dispatch) => {
    try{
        dispatch(deleteReviewRequest());
        await axios.delete(`/api/v1/admin/review`, {params : {productId, id}});
        dispatch(deleteReviewSuccess());

    } catch(error) {
        //Handle Error
        dispatch(deleteReviewFail(error.response.data.message));
    }
}
