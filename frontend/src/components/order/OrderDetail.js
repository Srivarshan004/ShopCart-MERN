import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { orderDetail as orderDetailAction } from '../../actions/orderAction';
import Loader from '../layouts/Loader';

function OrderDetail() {
    const { orderDetail, loading } = useSelector(state => state.orderState);
    const { shippingInfo = {}, user = {}, orderStatus = 'Processig', orderItems = [], totalPrice = 0, paymentInfo = {} } = orderDetail;
    const isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true : false;
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(orderDetailAction(id));
    }, [id])

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <div className="row d-flex justify-content-between">
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
                                            className="col-4 col-lg-3 pt-4 mt-lg-0 d-flex justify-content-center align-items-center"
                                        >
                                            <p><b>{item.quantity} Piece(s)</b></p>
                                        </div>
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

export default OrderDetail;