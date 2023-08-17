import { useEffect } from 'react';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from '../../actions/productsAction';
import { getUsers } from '../../actions/userAction';
import { adminOrders as adminOrdersAction } from '../../actions/orderAction';
import { Link } from 'react-router-dom';

function Dashboard() {
    const { products=[] } = useSelector(state => state.productsState);
    const { adminOrders=[] } = useSelector(state => state.orderState);
    const { users=[] } = useSelector(state => state.userState);
    const dispatch =  useDispatch();
    let outOfStock = 0;

    if(products.length > 0){
        products.forEach(product => {
            if(product.stock === 0){
                outOfStock =  outOfStock + 1
            }
        })
    }

    let totalAmount = 0;
    if(adminOrders.length > 0){
        adminOrders.forEach(order => {
            totalAmount += order.totalPrice
        })
    }
    totalAmount = totalAmount.toFixed(2);

    useEffect(() => {
        dispatch(getAdminProducts);
        dispatch(getUsers);
        dispatch(adminOrdersAction);
    }, [dispatch]);

    return (
            <div className="row d-flex">
                <div className="col-md-2 col-12">
                    <Sidebar />
                </div>
                <div className="col-md-10 col-12">
                    <h1 className="my-4 px-4">Dashboard</h1>
                    <div className="row px-4">
                        <div className="col-xl-12 col-sm-12 mb-3">
                            <div className="card text-white bg-primary o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">
                                        Total Amount<br />
                                        <b>${totalAmount}</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row px-4">
                        <div className="col-xl-3 col-sm-6 mb-3">
                            <div className="card text-white bg-warning o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">
                                        Products<br />
                                        <b>{products.length}</b>
                                    </div>
                                </div>
                                <Link
                                    className="card-footer text-white text-center clearfix small z-1"
                                    to="/admin/products"
                                >
                                    <span>View Details</span>
                                    <span>
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 mb-3">
                            <div className="card text-white bg-success o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">
                                        Orders<br />
                                        <b>{adminOrders.length}</b>
                                    </div>
                                </div>
                                <Link
                                    className="card-footer text-white text-center clearfix small z-1"
                                    to="/admin/orders"
                                >
                                    <span>View Details</span>
                                    <span>
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 mb-3">
                            <div className="card text-white bg-info o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">
                                        Users<br />
                                        <b>{users.length}</b>
                                    </div>
                                </div>
                                <Link
                                    className="card-footer text-white text-center clearfix small z-1"
                                    to="/admin/users"
                                >
                                    <span>View Details</span>
                                    <span>
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 mb-3">
                            <div className="card text-white bg-danger o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">
                                        Out of Stock<br />
                                        <b>{outOfStock}</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Dashboard;