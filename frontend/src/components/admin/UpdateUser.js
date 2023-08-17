import { Fragment, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearError, clearUserUpdated } from "../../slices/userSlices";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { getUser, updateUser } from "../../actions/userAction";


function UpdateUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const { loading, isUserUpdated, error, user } = useSelector(state => state.userState);
    const { user:authUser } = useSelector(state => state.authState);
    const { id : userId } = useParams();

    const dispatch = useDispatch();

    const submitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('role', role);
        dispatch(updateUser(userId, formData))
    }

    useEffect(() => {
        if(isUserUpdated){
            toast('User Updated successfully',{
                type:"success",
                position:toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUserUpdated())
            })
            return;
        }

        if(error){
            toast(error, {
                position : toast.POSITION.BOTTOM_CENTER,
                type : 'error',
                onOpen : () => {
                    dispatch(clearError())
                }
            })
            return;
        }
        dispatch(getUser(userId))
    }, [isUserUpdated, error, dispatch])

    useEffect(() => {
        if(user._id){
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
    }, [user])

    return (
        <div className="row d-flex">
            <div className="col-md-2 col-12">
                <Sidebar />
            </div>
            <div className="col-md-10 col-12">
                <Fragment>
                    <div className="wrapper my-5">
                        <form onSubmit={submitHandler} className="shadow-lg" enctype="multipart/form-data">
                            <h1 className="mb-4">Update User</h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control my-2"
                                    value={name}
                                    onChange={event => setName(event.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email_field">Email</label>
                                <input
                                    type="text"
                                    id="email_field"
                                    className="form-control my-2"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="role_field">Role</label>
                                <select disabled={user._id === authUser._id} value={role} onChange={event => setRole(event.target.value)} class="form-select my-2" id="role_field">
                                    <option value='admin'>Admin</option>
                                    <option value='user'>User</option>
                                </select>
                            </div>

                            <button 
                                id="login_button" 
                                type="submit" 
                                disabled={loading}
                                onClick={submitHandler}
                                className="btn btn-block w-100 btn-warning py-2 my-3"
                            >
                                UPDATE USER
                            </button>
                        </form>
                    </div>
                </Fragment>
            </div>
        </div>

    )
}

export default UpdateUser;