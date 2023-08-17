import { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearError, clearOrderDeleted } from "../../slices/orderSlices";
import Loader from "../layouts/Loader";
import { adminOrders as adminOrdersAction } from "../../actions/orderAction";
import { MDBDataTable } from 'mdbreact';
import { toast } from "react-toastify";
import Sidebar from "./Sidebar"
import { deleteOrder } from "../../actions/orderAction";


function OrderList() {
    const { adminOrders = [], loading = true, error, isOrderDeleted } = useSelector(state => state.orderState);
    const dispatch = useDispatch();

    const deleteHandler = (event, id) => {
        event.target.disabled = true;
        dispatch(deleteOrder(id));
    }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Number of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
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

        adminOrders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: <p style={{color:order.orderStatus.includes('Processing')?'red':'green'}}>
                    {order.orderStatus}</p>,
                action: (
                    <Fragment>
                        <Link to={`/admin/order/${order._id}`} className="btn btn-primary m-2"> <i className="fa fa-pencil"></i></Link>
                        <Button onClick={event => deleteHandler(event, order._id)} className="btn btn-danger m-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                )

            })
        })
        return data;
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
        if(isOrderDeleted){
            toast('Order Deleted successfully',{
                type:"success",
                position:toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearOrderDeleted())
            })
            return;
        }
        dispatch(adminOrdersAction);
    }, [dispatch, error, isOrderDeleted])


    return (
        <div className="row d-flex">
            <div className="col-md-2 col-12">
                <Sidebar />
            </div>
            <div className="col-md-10 col-12">
                <h1 className="my-4 px-4">Order List</h1>
                <Fragment>
                    {loading ? <Loader /> :
                        <MDBDataTable
                           data={setOrders()}
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

export default OrderList;