import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, forgotPassword } from "../../actions/userAction";
import { toast } from "react-toastify";


function ForgotPassword() {

    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const { error, message } = useSelector((state) => state.authState);

    const submitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        dispatch(forgotPassword(formData));
    }

    useEffect(() => {
        if(message){
            toast(message, {
                type : "success",
                position : toast.POSITION.BOTTOM_CENTER
            })
            setEmail('');
            return;
        }

        if(error){
            toast(error, {
                position : toast.POSITION.BOTTOM_CENTER,
                type : 'error',
                onOpen : () => {
                    dispatch(clearAuthError)
                }
            })
            return
        }
    },[ message, error, dispatch ]);



    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                    <h1 className="mb-4">Forgot Password</h1>
                    <div className="form-group">
                        <label htmlFor="email_field">Enter Email Id :</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control my-4"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <button
                        id="forgot_password_button"
                        type="submit"
                        className="btn btn-block py-3"
                    >
                        Send Email
                    </button>
                </form>
            </div>
        </div>
    )
}


export default ForgotPassword;