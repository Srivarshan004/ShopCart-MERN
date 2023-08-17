import { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearError } from "../../slices/productsSlices";
import { getAdminProducts } from "../../actions/productsAction";
import Loader from "../layouts/Loader";
import { MDBDataTable } from 'mdbreact';
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import { deleteProduct } from "../../actions/productAction";
import { clearProductDeleted } from "../../slices/productSlices";


function ProductsList() {
    const { products = [], loading = true, error } = useSelector(state => state.productsState);
    const { isProductDeleted, error:productError } = useSelector(state => state.productState);
    const dispatch = useDispatch();

    const deleteHandler = (event, id) => {
        event.target.disabled = true;
        dispatch(deleteProduct(id));
    }

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
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
        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `$${product.price}`,
                stock: product.stock,
                action: (
                    <Fragment>
                        <Link to={`/admin/product/${product._id}`} className="btn btn-primary mb-2"> <i className="fa fa-pencil"></i></Link>
                        <Button onClick={event => deleteHandler(event, product._id)} className="btn btn-danger mb-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                )

            })
        })
        return data;
    }

    useEffect(() => {
        if (error || productError) {
            toast(error || productError, {
                type: 'error',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => { dispatch(clearError()) }
            })
            return
        }
        if(isProductDeleted){
            toast('Product Deleted successfully',{
                type:"success",
                position:toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearProductDeleted())
            })
            return;
        }
        dispatch(getAdminProducts);
    }, [dispatch, error, isProductDeleted, productError])


    return (
        <div className="row d-flex">
            <div className="col-md-2 col-12">
                <Sidebar />
            </div>
            <div className="col-md-10 col-12">
                <h1 className="my-4 px-4">Products List</h1>
                <Fragment>
                    {loading ? <Loader /> :
                        <MDBDataTable
                           data={setProducts()}
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

export default ProductsList;