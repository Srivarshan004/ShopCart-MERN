import { Fragment, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearReviewDeleted } from "../../slices/productSlices";
import Loader from "../layouts/Loader";
import { MDBDataTable } from 'mdbreact';
import { toast } from "react-toastify";
import Sidebar from "./Sidebar"
import { deleteReview, getReviews } from "../../actions/productsAction";


function ReviewList() {
    const { reviews = [], loading = true, error, isReviewDeleted } = useSelector(state => state.productState);
    const [productId, setProductId] = useState('');
    const dispatch = useDispatch();

    const deleteHandler = (event, id) => {
        event.target.disabled = true;
        dispatch(deleteReview(productId, id));
    }

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'Action',
                    field: 'action',
                    sort: 'asc'
                }
            ],
            rows: []
        }

        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                user: review.user.name,
                comment: review.comment,
                action: (
                    <Fragment>
                        <Button onClick={event => deleteHandler(event, review._id)} className="btn btn-danger">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                )
            })
        })
        return data;
    }

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(getReviews(productId));
    }

    useEffect(() => {
        if (error) {
            toast(error, {
                type: 'error',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => { dispatch(clearError()) }
            })
            return
        }
        if (isReviewDeleted) {
            toast('Review Deleted successfully', {
                type: "success",
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearReviewDeleted())
            })
            dispatch(getReviews(productId));
            return;
        }
    }, [dispatch, error, isReviewDeleted])


    return (
        <div className="row d-flex">
            <div className="col-md-2 col-12">
                <Sidebar />
            </div>
            <div className="col-md-10 col-12">
                <h1 className="my-4 px-4">Review List</h1>
                <div className="row justify-content-center mt-5">
                    <div className="col-5">
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <label>Product Id</label>
                                <input
                                    type="text"
                                    onChange={event => setProductId(event.target.value)}
                                    value={productId}
                                    className="form-control my-2"
                                />
                            </div>
                            <button 
                               type='submit' 
                               disabled={loading}
                               className="btn btn-block w-100 btn-warning py-2 my-3">
                                SEARCH
                            </button>
                        </form>
                    </div>
                </div>
                <Fragment>
                    {loading ? <Loader /> :
                        <MDBDataTable
                            data={setReviews()}
                            bordered
                            striped
                            hover
                            className="px-2"
                        />
                    }
                </Fragment>
            </div>
        </div>
    )
}

export default ReviewList;