import { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearError, clearUserDeleted } from "../../slices/userSlices";
import Loader from "../layouts/Loader";
import { getUsers } from "../../actions/userAction";
import { MDBDataTable } from 'mdbreact';
import { toast } from "react-toastify";
import Sidebar from "./Sidebar"
import { deleteUser } from "../../actions/userAction";


function UserList() {
    const { users = [], loading = true, error, isUserDeleted } = useSelector(state => state.userState);
    const dispatch = useDispatch();

    const deleteHandler = (event, id) => {
        event.target.disabled = true;
        dispatch(deleteUser(id));
    }

    const setUsers = () => {
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
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
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

        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                action: (
                    <Fragment>
                        <Link to={`/admin/user/${user._id}`} className="btn btn-primary m-2"> <i className="fa fa-pencil"></i></Link>
                        <Button onClick={event => deleteHandler(event, user._id)} className="btn btn-danger m-2">
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
        if(isUserDeleted){
            toast('User Deleted successfully',{
                type:"success",
                position:toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUserDeleted())
            })
            return;
        }
        dispatch(getUsers);
    }, [dispatch, error, isUserDeleted])


    return (
        <div className="row d-flex">
            <div className="col-md-2 col-12">
                <Sidebar />
            </div>
            <div className="col-md-10 col-12">
                <h1 className="my-4 px-4">User List</h1>
                <Fragment>
                    {loading ? <Loader /> :
                        <MDBDataTable
                           data={setUsers()}
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

export default UserList;