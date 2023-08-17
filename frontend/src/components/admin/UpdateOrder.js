import { Fragment, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { orderDetail as orderDetailAction, updateOrder } from "../../actions/orderAction";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { clearOrderUpdated, clearError } from "../../slices/orderSlices";


function UpdateOrder() {

    const { loading, isOrderUpdated, error, orderDetail } = useSelector(state => state.orderState)
    const { id: orderId } = useParams();
    const { user = {}, orderItems = [], shippingInfo = {}, totalPrice = 0, paymentInfo = {} } = orderDetail;
    const isPaid = paymentInfo.status === 'succeeded' ? true : false
    const [orderStatus, setOrderStatus] = useState('Processing');

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

    const submitHandler = (event) => {
        event.preventDefault();
        const orderData = {};
        orderData.orderStatus = orderStatus;
        dispatch(updateOrder(orderId, orderData))
    }

    useEffect(() => {
        if (isOrderUpdated) {
            toast('Order Updated successfully', {
                type: "success",
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearOrderUpdated())
            })
            return;
        }

        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => {
                    dispatch(clearError())
                }
            })
            return;
        }
        dispatch(orderDetailAction(orderId))
    }, [isOrderUpdated, error, dispatch])

    useEffect(() => {
        if (orderDetail._id) {
            setOrderStatus(orderDetail.orderStatus);
        }
    }, [orderDetail])

    return (
        <div className="row d-flex">
            <div className="col-md-2 col-12">
                <Sidebar />
            </div>
            <div className="col-md-10 col-12">
                <Fragment>
                    <div className="row d-flex justify-content-around">
                        <div className="col-12 col-lg-8 mt-5 order-details">
                            <h1 className="my-5">Order&nbsp;&nbsp;<span id="order-detail-id"># {orderDetail._id}</span></h1>

                            <h4 className="mb-4"><b>Shipping Info</b></h4>
                            <p>Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;
                                <b>{user.name}</b>
                            </p>
                            <p>Phone&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;
                                <b>{shippingInfo.phoneNo}</b>
                            </p>
                            <p>Address&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;
                                <b>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country}</b>
                            </p>
                            <p>Amount&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;
                                <b> ${totalPrice}</b>
                            </p>

                            <hr />

                            <div className="d-flex justify-content-start">
                                <h4 className="my-3"><b>Payment&nbsp;&nbsp;: </b></h4>
                                <h4 className={isPaid ? 'greenColor mx-3 my-3' : 'redColor mx-3 my-3'}><b>{isPaid ? 'PAID' : 'NOT PAID'}</b></h4>
                            </div>

                            <div className="d-flex justify-content-start">
                                <h4 className="my-3"><b>Order Status&nbsp;&nbsp;:</b></h4>
                                <h4 className={orderStatus && orderStatus.includes('Delivered') ? 'greenColor mx-3 my-3' : 'redColor mx-3 my-3'}><b>{orderStatus}</b></h4>
                            </div>

                            <h4 className="my-3"><b>Order Items:</b></h4>

                            <hr />
                            <div className="cart-item my-1">
                                {orderItems && orderItems.map(item => (
                                    <div className="row my-3">
                                        <div
                                            className="col-4 col-lg-2 d-flex justify-content-center align-items-center"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                id="cart-product-img"
                                                height="90"
                                                width="125"
                                            />
                                        </div>

                                        <div
                                            className="col-5 col-lg-5 d-flex justify-content-center align-items-center" id="order-success"
                                        >
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>

                                        <div
                                            className="col-4 col-lg-2 mt-4 pt-3mt-lg-0 d-flex justify-content-center align-items-center"
                                        >
                                            <p><b>${item.price}</b></p>
                                        </div>

                                        <div
                                            className="col-4 col-lg-3 mt-5 pt-4 mt-lg-0 d-flex justify-content-center align-items-center"
                                        >
                                            <p><b>{item.quantity} Piece(s)</b></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr />
                        </div>
                        <div className="col-12 col-lg-3 mt-5">
                            <h4 className="my-4">Order Status</h4>
                            <div className="form-group">
                                <select
                                    onChange={event => setOrderStatus(event.target.value)}
                                    class="form-select my-2"
                                    id="category_field"
                                    value={orderStatus}
                                    name="Order Status"
                                >
                                    <option value={'Processing'}>Processing</option>
                                    <option value={'Shipped'}>Shipped</option>
                                    <option value={'Delivered'}>Delivered</option>
                                </select>

                                <button
                                    id="login_button"
                                    type="submit"
                                    disabled={loading}
                                    onClick={submitHandler}
                                    className="btn btn-block w-100 btn-warning py-2 my-3"
                                >
                                    UPDATE STATUS
                                </button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            </div>
        </div>

    )
}

export default UpdateOrder;