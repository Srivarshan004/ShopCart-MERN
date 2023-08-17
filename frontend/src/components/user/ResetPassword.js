import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, resetPassword } from "../../actions/userAction";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


function ResetPassword(){

    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const dispatch = useDispatch();
    const { isAuthenticated, error } = useSelector(state => state.authState);
    const navigate = useNavigate();
    const { token } = useParams();

    const submitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        dispatch(resetPassword(formData, token));
    }

    useEffect(() => {
        if(isAuthenticated){
            toast('Password Reset Successfully', {
                type : "success",
                position : toast.POSITION.BOTTOM_CENTER
            })
            navigate('/');
            return;
        }

        if(error){
            toast(error, {
                position : toast.POSITION.BOTTOM_CENTER,
                type : 'error',
                onOpen : () => {
                    dispatch(clearAuthError);
                }
            })
            return
        }
    },[isAuthenticated, error, dispatch,  navigate]);

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                    <h1 className="mb-3">New Password</h1>

                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control my-3"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control my-3"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3">
                        Set Password
                    </button>

                </form>
            </div>
        </div>
    )
}

export default ResetPassword;