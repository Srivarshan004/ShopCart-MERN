import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { decreaseCartItemQty, increaseCartItemQty, removeItemFromCart } from "../../slices/cartSlices";

function Cart() {
    const { items } = useSelector(state => state.cartState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const increaseQty = (item) => {
        const count = item.quantity;
        if (item.stock === 0 || count >= item.stock) {
            return;
        }
        dispatch(increaseCartItemQty(item.product));
    }

    const decreaseQty = (item) => {
        const count = item.quantity;
        if (count === 1) {
            return;
        }
        dispatch(decreaseCartItemQty(item.product));
    }

    let estTotal = items.reduce((acc, item) => (acc + item.quantity * item.price), 0);
    estTotal = Number(estTotal).toFixed(2);

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    }

    return (
        <Fragment>
            {items.length === 0 ? <h2 className="mt-5">Your Cart is Empty</h2> :
                <Fragment>
                    <h2 className="mt-5">Your Cart : <b>{items.length}</b> Items </h2>

                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            {items.map(item => (
                                <Fragment>
                                    <hr />
                                    <div className="cart-item">
                                        <div className="row">
                                            <div className="col-4 col-lg-3 d-flex justify-content-center align-items-center">
                                                <img src={item.image} alt={item.name} id="cart-product-img" height="100" width="120" />
                                            </div>

                                            <div className="col-5 col-lg-3 d-flex justify-content-center align-items-center">
                                                <Link to={`/product/${item.product}`} >{item.name}</Link>
                                            </div>


                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0 d-flex justify-content-center align-items-center">
                                                <p id="card_item_price">${item.price}</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0 d-flex justify-content-center align-items-center">
                                                <div className="stockCounter m-0 d-flex justify-content-center align-items-center">
                                                    <span className="btn btn-danger minus" onClick={() => decreaseQty(item)} >-</span>
                                                    <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />
                                                    <span className="btn btn-primary plus" onClick={() => increaseQty(item)}>+</span>
                                                </div>
                                            </div>

                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0 d-flex justify-content-center align-items-center">
                                                <i
                                                    id="delete_cart_item"
                                                    onClick={() => dispatch(removeItemFromCart(item.product))}
                                                    className="fa fa-trash btn btn-danger" ></i>
                                            </div>

                                        </div>
                                    </div>
                                </Fragment>
                            ))}
                            <hr />
                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal:  <span className="order-summary-values">{items.reduce((acc, item) => (acc + item.quantity), 0)} (Units)</span></p>
                                <p>Est. total: <span className="order-summary-values">${estTotal}</span></p>

                                <hr />
                                <Link to='/shipping' id="checkout_btn" onClick={checkoutHandler} className="btn btn-primary w-100 btn-block">Check out</Link>
                            </div>
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

export default Cart;