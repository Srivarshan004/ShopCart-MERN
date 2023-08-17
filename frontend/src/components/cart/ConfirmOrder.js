import { Fragment, useEffect } from 'react';
import MetaData from '../layouts/MetaData';
import { validateShipping } from './Shipping';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';

function ConfirmOrder() {

    const { shippingInfo, items: cartItems } = useSelector(state => state.cartState);
    const { user } = useSelector(state => state.authState);
    const navigate = useNavigate();
    let itemsPrice = cartItems.reduce((acc, item) => (acc + item.price * item.quantity), 0);
    const shippingPrice = itemsPrice > 200 ? 0 : 20;
    let taxPrice = Number(0.05 * itemsPrice);
    let totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
    taxPrice = Number(0.05 * itemsPrice).toFixed(2);
    itemsPrice = Number(itemsPrice).toFixed(2);
    itemsPrice = parseFloat(itemsPrice);
    taxPrice = parseFloat(taxPrice);
    totalPrice = parseFloat(totalPrice);

    const processPayment = () => {
        const data = {
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/payment')
    }

    useEffect(() => {
        validateShipping(shippingInfo, navigate);
    }, [])

    return (
        <Fragment>
            <MetaData title={'Confirm Order'} />
            <CheckoutSteps shipping={true} confirmOrder={true} />
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3"><b>Shipping Info</b></h4>
                    <p><b>Name :</b> {user.name} </p>
                    <p><b>Phone :</b> {shippingInfo.phoneNo} </p>
                    <p className="mb-4"><b>Address :</b> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country} </p>

                    <hr />
                    <h4 className="mt-4">Your Cart Items :</h4>
                    <hr />

                    {cartItems.map((item) => (
                        <Fragment>
                            <div className="cart-item my-1">
                                <div className="row">
                                    <div className="col-6 col-lg-2 d-flex justify-content-center align-items-center">
                                        <img src={item.image} alt={item.name} id="cart-product-img" height="90" width="120" />
                                    </div>

                                    <div className="col-4 col-lg-6 d-flex justify-content-center align-items-center">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>


                                    <div className="col-12 col-lg-4 mt-5 mt-lg-0 d-flex justify-content-center align-items-center">
                                        <p className="mt-3">{item.quantity} &nbsp; x &nbsp; ${item.price} &nbsp; = &nbsp; <b>${(item.quantity * item.price).toFixed(2)}</b></p>
                                    </div>

                                </div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}


                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal :  <span className="order-summary-values">${itemsPrice}</span></p>
                        <p>Shipping : <span className="order-summary-values">${shippingPrice}</span></p>
                        <p>Tax :  <span className="order-summary-values">${taxPrice}</span></p>

                        <hr />

                        <p>Total : <span className="order-summary-values">${totalPrice}</span></p>

                        <hr />
                        <button id="checkout_btn" onClick={processPayment} className="btn btn-primary w-100 btn-block">Proceed to Payment</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ConfirmOrder;